var locomotive 	= require('locomotive')
  , Controller 	= locomotive.Controller
  ,passport  	= require('passport');

var loginController = new Controller();

var Account = require('../models/account');

loginController.present = function() {
  this.render();
}

loginController.attempt = function() {
	
	this.user = this.param('user');
	this.password = this.param('password');
	
	this.userMessageFlag = 1;
	this.userMessageMode = this.user.length == 0 ? "missing" : "wrong";
	
	
	this.passwordMessageFlag = 1;
	this.passwordMessageMode = this.password.length == 0 ? "missing" : "wrong"; 
	this.render();
}

module.exports = loginController;
