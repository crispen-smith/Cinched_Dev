var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var loginController = new Controller();

loginController.present = function() {
  this.render();
}

loginController.attempt = function() {
	
	this.user = this.param('user');
	this.password = this.param('password');
	
	this.render();
}

module.exports = loginController;
