// Config/Initializers/02_mongoose.js
// Wire in the mongoose connecter and connect.
//While there is a lot to be said of the practice of pushing the URI from the config/all.js file
//my testing to date has demonstrated a problem passing the connection string back into the connect call.
//To resolve that issue I have moved the fetch for the string into this private space.
//I feel this is justifiable as this is an implementation detail specific to the mongoose connection and 
//it is probably cleaner semantically to keep that detail here.
//Note that as I am hosting via the PaaS provider appfog.com that I use the presence of their vcap_services environment variable to test 
//whether we are live or in dev.  Details of this can be found at https://docs.appfog.com/services/mongodb.


var mongoURL = (function mongoURL() {
	
	if(process.env.VCAP_SERVICES){
		env = JSON.parse(process.env.VCAP_SERVICES);
		mongo = env['mongodb-1.8'][0]['credentials'];
	}
	else
	{
		mongo = {
				"hostname":"localhost",
				"port":27017,
				"username":"",
				"password":"",
				"name":"",
				"db":"db"
		}
	}
	
	if(mongo.username && mongo.password){
		return "mongodb://" + mongo.username + ":" + mongo.password + "@" + mongo.hostname + ":" + mongo.port + "/" + mongo.db;
	}
	else{
		return "mongodb://" + mongo.hostname + ":" + mongo.port + "/" + mongo.db;
	}
	
})();


//It's also worth noting that as per the examples found at https://github.com/jeanfw/locomotive-example I am using the mongoose-types plugin to support 
//Smarter emails, it is called and injected into mongoose here, and again in the models to ensure that they are as portable as possible.
//I have yet to find a hook to  test if they've already been injected but if I can find that hook I'll be adding that conditional load to the models.
//Mongoose-Types can be found here: https://github.com/bnoguchi/mongoose-types
module.exports = function () {
	    
	this.mongoose = require('mongoose');
	this.mongooseTypes = require("mongoose-types");
	this.mongooseTypes.loadTypes(this.mongoose);
	this.mongoose.connect(mongoURL);
	
}


