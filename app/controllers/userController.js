var locomotive 	= require('locomotive')
  , Controller 	= locomotive.Controller
  ,passport  	= require('passport');

var userController = new Controller();

var Account = require('../models/account');

userController.login = function() {
  this.render('login', {info: this.req.flash('info'), warning: this.req.flash('error')});
}

userController.verify = function() {
	
	this.user = this.param('user');
	this.password = this.param('password');
	
	this.userMessageFlag = 1;
	this.userMessageMode = this.user.length == 0 ? "missing" : "wrong";
	
	
	this.passwordMessageFlag = 1;
	this.passwordMessageMode = this.password.length == 0 ? "missing" : "wrong"; 
	this.render();
}


userController.show = function () {
	console.log("Account#show called");
	if(!this.req.isAuthenticated()) {
		console.log("is authenticated returned false, redirecting...");
		this.req.flash('info', 'Please login or register first. ');
		return this.res.redirect(this.urlFor({action: 'login'}));
	}
	console.log("User is authenticated");
	this.user  = this.req.user;
	this.render();
};


userController.new = function() {
	this.render();
	
};


userController.create = function() {
	var account = new Account();
	console.log("Trying to create account for " + this.param('email'));
	
	account.email = this.param('email');
	account.password = this.param('password');
	account.name.first = this.param('name.first');
	account.name.last = this.param('name.last');
	account.access = this.param('access');
	
	account.save(function(err) {
		if(err) {
			throw err;
		}
		console.log("Successfully created account for " + account.email);
	});
	
	this.redirect('/login');
};

userController.logout = function() {}

module.exports = userController;
