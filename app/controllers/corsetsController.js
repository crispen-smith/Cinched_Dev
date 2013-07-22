var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var CorsetsController = new Controller();

CorsetsController.overBust = function() {
  this.render();
}

CorsetsController.underBust = function() {
	product = this.param("item");
	mode = this.param("mode");
	
	this.product = product;
	this.mode = mode;
	
	this.render();
}

module.exports = CorsetsController;
