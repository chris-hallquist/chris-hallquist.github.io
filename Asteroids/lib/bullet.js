(function (root) {
  var Asteroids;
  if (typeof(window) === 'undefined') {
    Asteroids = global.Asteroids = (global.Asteroids || {});
  } else {
    Asteroids = window.Asteroids = (window.Asteroids || {});
  }

  var Bullet =  Asteroids.Bullet = function (options) {
    options.radius = Bullet.RADIUS;
    options.color = Bullet.BLUE;
		this.life = 30;

    Asteroids.MovingObject.call(this, options);
  };

  Bullet.RADIUS = 2;
	Bullet.BLUE = "#00F"
  Bullet.SPEED = 15;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject.constructor !== Asteroids.Asteroid) {
      return;
    }

    this.remove();
    otherObject.remove();
  };

	Bullet.prototype.move = function (numTicks) {
		this.pos = [
		  this.pos[0] + numTicks * this.vel[0],
		  this.pos[1] + numTicks * this.vel[1]
		];

		if (this.game.isOutOfBounds(this.pos)) {
		  this.wrap();
		}
		
		this.life = this.life - 1;
		console.log(this.life)
		if (this.life < 0) {
			this.remove();
		}
	};
})(this);