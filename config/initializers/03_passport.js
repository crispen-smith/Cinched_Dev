var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('../../app/models/account');

passport.use(new LocalStrategy({
	usernameField: 'email'
},
function(email, password, done) {
	//Find the suser by unsername.  If there is no user with the given
	//Username, or the password is not correct, et the user to 'false' to
	//Indicate failure.  Otherwise, return the authenticated 'user'.
	console.log('Passport authenticating email ' + email); 
	Account.authenticate(email, password, done);
}));

//Passport session setup.

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	Account.findById(id, function(err, user) {
		done(err, user);
	})
});
