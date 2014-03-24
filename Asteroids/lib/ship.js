(function () {
  var Asteroids;
  if (typeof(window) === 'undefined') {
    Asteroids = global.Asteroids = (global.Asteroids || {});
  } else {
    Asteroids = window.Asteroids = (window.Asteroids || {});
  }

  var Ship = Asteroids.Ship = function (options) {
    options.radius = Ship.RADIUS;
    options.color = Ship.BLUE
    options.vel = options.vel || [0, 0];

    Asteroids.MovingObject.call(this, options)
  };

	Ship.BLUE = "#00F"
  Ship.RADIUS = 25

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.collideWith = function (otherObject) {
    if (otherObject.constructor !== Asteroids.Asteroid) {
      return;
    }
		
		this.game.stop();
    alert("Game Over! Refresh page to try again.")
  }

	Ship.prototype.fireBullet = function () {
		if (this.vel == [0, 0]) {
			return;
		}
		var speed = Asteroids.Util.abs(this.vel[0], this.vel[1]);
		var dir = [this.vel[0] / speed, this.vel[1] / speed]; 
		var relVel = [
			dir[0] * Asteroids.Bullet.SPEED, dir[1] * Asteroids.Bullet.SPEED
		];
		
		var bulletVel = [relVel[0] + this.vel[0], relVel[1] + this.vel[1]];
		
		var bullet = new Asteroids.Bullet({
      pos: this.pos,
      vel: bulletVel,
      color: this.color,
      game: this.game
    });
    this.game.bullets.push(bullet);
	}

	Ship.prototype.power = function (impulse) {
		this.vel[0] += impulse[0];
		this.vel[1] += impulse[1];
	}
	
	Ship.prototype.teleport = function () {
		this.pos = this.game.randomPosition();
		console.log("Attempting to teleport");
	}
})();