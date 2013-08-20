var locomotive 	= require('locomotive')
  , Controller 	= locomotive.Controller
  , passport  	= require('passport')
  , flash		= require('connect-flash');

var AccountController = new Controller();

var Account = require('../models/account');

AccountController.loginForm = function() {
  this.render('login', {info: this.req.flash('info'), warning: this.req.flash('error')});
}

AccountController.loginAttempt = function() {
	
	passport.authenticate('local', {
		  successRedirect: '/account',
		  failureRedirect: '/login',
		  failureFlash: true	
	  })(this.req, this.res, this.next);
}


AccountController.show = function () {
	console.log("Account#show called");
	if(!this.req.isAuthenticated()) {
		console.log("is authenticated returned false, redirecting...");
		this.req.flash('info', 'Please login or register first. ');
		return this.res.redirect(this.urlFor({action: 'loginForm'}));
	}
	console.log("User is authenticated");
	this.user  = this.req.user;
	console.log("\n\n\n User is: " + this.user.fullName +  "\n\n\n")
	this.render();
};


AccountController.new = function() {
	this.render('new', {info: this.req.flash('info'), warning: this.req.flash('warning')});
	
};


AccountController.create = function() { //Optional doc arguement in case the function needs to be called recursively
	//New Version:  Save all data into document and then validate document.
	//Return a validity flag and repsond according to that flag. 
	
	var password = this.param('password')
	, confirmPassword = this.param('confirmPassword');
	
	if(password !== confirmPassword) {
		this.req.flash('warning', 'passwords do not match');
		return this.redirect(this.urlFor({action: 'new'}));
	}


	var account = new Account();
	account.email = this.param('email');
	account.set('password',  password);

	account.name.first = this.param('name.first');
	account.name.last = this.param('name.last');
	account.access = this.param('access');
	
	console.log("\n\n\n After calling password.set()");
	console.log("\t account.salt = " + account.salt);
	console.log("\t account.hash = " + account.hash);
	console.log("\n\n");

	var self = this;


	account.save(function(err, account, numberAffected) {
		if(err) {
			var errorMessage = "";
			var errors = err.errors;
			for (p in errors) {
				errorMessage += errors[p].message + " ";
			}
			self.req.flash('warning', errorMessage);
			return self.redirect(self.urlFor({action: 'new'}));
		}
		
		return self.redirect(self.urlFor({action: 'loginForm'}));
		
	}); 
};

AccountController.logout = function() {
	this.req.logout();
	this.req.flash('info', 'you have successfully logged out.');
	this.redirect('/login');
	
}

module.exports = AccountController;
