(function (root) {
  var Asteroids;
  if (typeof(window) === 'undefined') {
    Asteroids = global.Asteroids = (global.Asteroids || {});
  } else {
    Asteroids = window.Asteroids = (window.Asteroids || {});
  }

  var Game = Asteroids.Game = function (ctx) {
		this.ctx = ctx
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
		this.level = 0;
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 32;
  Game.BLACK = "#000";

  Game.MOVES = {
    "up": [ 0, -1],
    "down": [ 0,  1],
    "left": [-1,  0],
    "right": [ 1,  0]
  };

  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
			var unfair = true;
			while (unfair) {
				this.asteroids[i] = Asteroids.Asteroid.randomAsteroid(this)
				if (!this.asteroids[i].isCollidedWith(this.ships[0])) {
					unfair = false
				} 
			}
    }
  };


  Game.prototype.allObjects = function () {
    return []
      .concat(this.ships)
      .concat(this.asteroids)
      .concat(this.bullets);
  };

  Game.prototype.bindKeyHandlers = function () {
    var ship = this.ships[0];

    Object.keys(Game.MOVES).forEach(function (k) {
      var move = Game.MOVES[k];
      key(k, function () { ship.power(move); });
    });

		key("return", function () {ship.teleport() });
    key("space", function () { ship.fireBullet() });
  };

	Game.prototype.centerShip = function () {
		var game = this;
		this.ships = [(new Asteroids.Ship({ 
			pos: [Game.DIM_X / 2, Game.DIM_Y / 2],
			game: game
		}))];
	}

	Game.prototype.checkAsteroidsRemaining = function () {
		if (this.asteroids.length == 0) {
			this.level += 1;
			this.addAsteroids(this.level + 4);
		}
	}

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };

  Game.prototype.draw = function (ctx) {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ctx.fillStyle = Game.BLACK;
    this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(this.ctx);
    });
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0)
      || (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.move = function () {
    this.allObjects().forEach(function (object) {
      object.move(1);
    });
  };

  Game.prototype.randomPosition = function () {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  }

  Game.prototype.remove = function (object) {
    if (object.constructor == Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object.constructor == Asteroids.Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(object), 1);

    } else if (object.constructor == Asteroids.Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else {
      throw "wtf?";
    }
  }

  Game.prototype.start = function () {
		this.centerShip();
		this.addAsteroids(this.level + 4);
		
    var game = this;
		this.interval = setInterval(
      function () {
        game.step();
      }, 1000 / Asteroids.Game.FPS
    );
    
		this.bindKeyHandlers();
  };

  Game.prototype.step = function () {
    this.move();
		this.draw();
		this.checkAsteroidsRemaining();
		this.checkCollisions();
  };

	Game.prototype.stop = function () {
		clearInterval(this.interval);
	}
})(this);