var mongoose = require('mongoose')
	, mongooseTypes = require('mongoose-types')
	, pass = require('pwd')
	, crypto = require('crypto')
	, Schema = mongoose.Schema
	, Email = mongoose.SchemaTypes.Email
 
var AccountSchema = new Schema({
	email: {type: Email, unique: true, required: true},
	
	//Password, defined and saved with safety in mind.
	salt: {type: String, required: true},
	hash: {type: String, required: true},
	
	//Name
	name: {
		first: {type: String, required: true },
		last: {type: String, required: true }
	},
	access: { type: String, required: true}
	
});

function md5(string) {
	  return crypto.createHash('md5').update(string).digest('hex');
}


AccountSchema.virtual('password').set(
	function (password) {
	//Setting the creation of the salt right inside the password setter as this is the only
	//Time it will be needed.
		var Saltlength = 9 
		, set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ'
		,	setLen = set.length
		,	salt = '';
	  for (var i = 0; i < setLen; i++) {
	    var p = Math.floor(Math.random() * setLen);
	    salt += set[p];
	  }

	  hash = md5(password + salt);

	  this.salt = salt;
	  this.hash = hash;
});

AccountSchema.virtual('fullName').get(function(){
	return this.name.first + " " + this.name.last;
});

AccountSchema.method('checkPassword', function (password, callback) {
	console.log("Inside checkPassword proper.");
	console.log("Result of password test is: " + (this.hash === (md5(password + this.salt))));
	callback(null, this.hash === (md5(password + this.salt)));
});

AccountSchema.static('authenticate', function(email, password, callback) {
	console.log('Authenticate called for ' + email);
	this.findOne({email: email}, function(err, user) {
		if(err) {
			console.log('Not found with error: ' + err);
			return callback(err);
		}
		console.log("passed the user check without error.");
		if(!user) {
				console.log('no user returned');
				return callback(null, false, {message: 'Incorrect email'});
			}
		
		console.log("passed the user check with a valid user.")
			
			user.checkPassword(password, function(err, passwordCorrect) {
				console.log("Inside the checkPassword Callback");
				if(err) {
					console.log('Error: ' + err);
					return callback(err);
				}
			
			if(!passwordCorrect) {
				console.log('Password match failed');
				return callback(null, false, {message: 'Incorrect Password'});
			}
			
			console.log('Successfully authenticated as ' + email);
			return callback(null, user);
		});
	});
});


module.exports = mongoose.model('Account', AccountSchema);