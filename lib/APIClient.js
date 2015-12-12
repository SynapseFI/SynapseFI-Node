var request = require('superagent');


var APIClient = {

	delete: function(url, config, callback){
		var headers = generateHeaders(config);
		request
			.delete(url)
			.set(headers)
			.end(function(err, res){
				if(err){
					callback(err);
				}else{
					callback(err, res.body);
				}
			});
	},

	get: function(url, config, callback){
		var headers = generateHeaders(config);
		request
			.get(url)
			.set(headers)
			.query(config.query)
			.end(function(err, res){
				if(err){
					callback(err);
				}else{
					callback(err, res.body);
				}
			});
	},

	patch: function(url, config, payload, callback){
		var headers = generateHeaders(config);
		request
			.patch(url)
			.set(headers)
			.send(JSON.stringify(payload))
			.end(function(err, res){
				if(err){
					callback(err);
				}else{
					if(res.status != 200){
						var acceptedError = {
							status: res.status,
							body: res.body
						};
						callback(acceptedError);
					}else{
						callback(err, res.body);
					}
				}
			});
	},

	post: function(url, config, payload, callback){
		var headers = generateHeaders(config);
		request
			.post(url)
			.set(headers)
			.send(JSON.stringify(payload))
			.end(function(err, res){
				if(err){
					callback(err);
				}else{
					if(res.status != 200){
						var acceptedError = {
							status: res.status,
							body: res.body
						};
						callback(acceptedError);
					}else{
						callback(err, res.body);
					}
				}
			});
	}
};


/*
	config -> {
		client: client instance,
		oauth_key: string,
		fingerprint: string,
		ip_address: string
	}
 */
var generateHeaders = function(config){
	var oauth_key = '';
	var ip_address = '';
	var fingerprint = '';
	if(config.oauth_key){
		oauth_key = config.oauth_key;
	}
	if(config.ip_address){
		ip_address = config.ip_address;
	}
	if(config.fingerprint){
		fingerprint = config.fingerprint;
	}
	var headers = {
		'X-SP-GATEWAY':config.client.client_id + '|' + config.client.client_secret,
		'X-SP-USER':oauth_key + '|' + fingerprint,
		'X-SP-USER-IP': ip_address,
		'X-SP-LANG': 'en',
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	};
	return headers;
};

module.exports = APIClient;