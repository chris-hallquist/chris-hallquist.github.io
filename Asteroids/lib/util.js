(function (root) {
  var Asteroids;
  if (typeof(window) === 'undefined') {
    Asteroids = global.Asteroids = (global.Asteroids || {});
  } else {
    Asteroids = window.Asteroids = (window.Asteroids || {});
  }

	var Util = Asteroids.Util = {};

	var abs = Util.abs = function(x, y) {
		return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
	}

  var inherits = Util.inherits = function (SubClass, SuperClass) {
    function Surrogate () { this.constructor = SubClass };
    Surrogate.prototype = SuperClass.prototype;
    SubClass.prototype = new Surrogate();
  };

	var randomVec = Util.randomVec = function (length) {
		var radians = 2 * Math.PI * Math.random();
		return [Math.sin(radians) * length, Math.cos(radians) * length];
	}
})(this);