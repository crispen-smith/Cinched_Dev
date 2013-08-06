//Code taken from AppFogs mongo example, resolves a mongourl based on the presence of process.env.VCAP_SERVICES
//This env variable in injected into the appfog server instances and provides instance specific binding data. 



var mongoURL = function() {
	this.generate_mongo_url = function(obj){

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

	    if(obj.username && obj.password){
	        return "mongodb://" + mongo.username + ":" + mongo.password + "@" + mongo.hostname + ":" + mongo.port + "/" + mongo.db;
	    }
	    else{
	        return "mongodb://" + mongo.hostname + ":" + mongo.port + "/" + mongo.db;
	    }
	}
}

module.exports = mongoURL.generate_mongo_url();
