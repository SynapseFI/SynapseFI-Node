var APIClient = require('./APIClient.js');
var User = require('./User.js');

var Users = {
	
	get: function(client, options, callback){
		var config = {
			'client': client
		};
		var url = client.baseUrl + '/users';
		if(options){
			if(options._id){
				if(!options.fingerprint){
					callback(new Error('Missing options "fingerprint" when getting specific user.'));
				}else if(!options.ip_address){
					callback(new Error('Missing options "ip_address" when getting specific user.'));
				}else{
					config.ip_address = options.ip_address;
					config.fingerprint = options.fingerprint;
					url += '/' + String(options._id);
					APIClient.get(url, config, function(err, json){
						if(err){
							callback(err);
						}else{
							new User(client, json, options.ip_address, options.fingerprint, callback);
						}
					});
				}
			}else{
				APIClient.get(url, config, callback);
			}
		}
		else{
			APIClient.get(url, config, function(err, json){
				callback(err, json);
			});
		}
	},

	create: function(client, fingerprint, ip_address, payload, callback){
		var config = {
			client: client,
			fingerprint: fingerprint,
			ip_address: ip_address
		};
		var url = client.baseUrl + '/users';
		APIClient.post(url, config, payload, function(err, json){
			if(err){
				callback(err);
			}else{
				new User(client, json, ip_address, fingerprint, callback);
			}
		});
	}
}

module.exports = Users;