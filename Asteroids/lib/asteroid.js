(function () {
  var Asteroids;
  if (typeof(window) === 'undefined') {
    Asteroids = global.Asteroids = (global.Asteroids || {});
  } else {
    Asteroids = window.Asteroids = (window.Asteroids || {});
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    options.radius = Asteroid.RADIUS;
    options.color = Asteroid.BROWN

    Asteroids.MovingObject.call(this, options);
  };

  Asteroid.BROWN = "#A52A2A";
  Asteroid.RADIUS = 40;

  Asteroid.randomAsteroid = function (game) {
    return new Asteroid({
      pos: game.randomPosition(),
      vel: Asteroids.Util.randomVec(4 * Math.random()),
      game: game
    });
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);
})();