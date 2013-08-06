var levels = 'user admin'.split('');


var mongoose = require('mongoose')
	, mongooseTypes = require('mongoose-types')
	, pass = require('pwd')
	, Schema = mongoose.Schema;

var Email = mongoose.SchemaTypes.Email
	
var AccountSchema = new Schema({
	email: {type: Email, unique: true},
	
	//Password, defined and saved with safety in mind.
	salt: {type: String, required: true},
	hash: {type: String, required: true},
	
	//Name
	name: {
		first: {type: String, required: true },
		last: {type: String, required: true}
	},
	access: { type: String, required: true, enum: levels }
	
});

AccountSchema.virtual('password').get(function() {
	return this._passowrd;
}).set(function (password) {
	try {
		pass= require('pwd');
		vals = 	pass.hash(password, function(err, salt,hash) {
					return {salt: salt, hash: hash};
				});
		this.salt = vals.salt;
		this.hash = vals.hash;
		} catch (e) {};
});

AccountSchema.virtual('fullname').get(function(){
	return this.name.first + " " + this.name.last;
});

AccountSchema.method('checkPassword', function (password, callback) {
	var pass = require('pwd');
	var salt = this.salt;
	var hash = this.hash;
	debugger;
	return pass.hash(password, salt, function(err, testHash) {
		if (hash === testHash) return true;
		return false;
	});
	
});

AccountSchema.static('authenticate', function(email, password, callback) {
	console.log('Authenticate called for ' + email);
	this.findOne({email: email}, function(err, user) {
		if(err) {
			console.log('Not found with error: ' + err);
			return callback(err);
		}
		if(!user) {
				console.log('no user returned');
				return callback(null, false, {message: 'Incorrect email'});
			}
			
			user.checkPassword(password, function(err, passwordCorrect) {
				if(err) {
					console.log('Error: ' + err);
					return callback(err);
				}
			
			if(!passwordCorrect) {
				console.log('Password match failed');
				return callback(null, flase, {message: 'Incorrect Password'});
			}
			
			console.log('Successfully authenticated as ' + email);
			return callback(null, user);
		});
	});
});


module.exports = mongoose.model('Account', AccountSchema);