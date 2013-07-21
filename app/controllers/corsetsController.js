var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var CorsetsController = new Controller();

CorsetsController.overBust = function() {
  this.render();
}

CorsetsController.underBust = function() {
	this.render();
}

module.exports = CorsetsController;
