var APIClient = require('./APIClient.js');
var Transaction = require('./Transaction.js');

var Transactions = {
	
	get: function(node, options, callback){
		var config = {
			client: node.user.client,
			fingerprint: node.user.fingerprint,
			ip_address: node.user.ip_address,
			oauth_key: node.user.oauth_key
		};
		var url = node.json['_links']['self']['href'] + '/trans';
		if(options){
			if(options._id){
				url += '/' + options._id;
				APIClient.get(url, config, function(err, json){
					if(err){
						callback(err);
					}else{
						callback(null, new Transaction(node, json));
					}
				});
			}else{
				APIClient.get(url, config, function(err, json){
					if(err){
						callback(err);
					}else{
						callback(null, json);
					}
				});
			}
		}else{
			APIClient.get(url, config, function(err, json){
				if(err){
					callback(err);
				}else{
					callback(null, json);
				}
			});
		}
	},

	create: function(node, payload, callback){
		var config = {
			client: node.user.client,
			fingerprint: node.user.fingerprint,
			oauth_key: node.user.oauth_key,
			ip_address: node.user.ip_address
		};
		var url = node.json['_links']['self']['href'] + '/trans';
		APIClient.post(url, config, payload, function(err, json){
			if(err){
				callback(err);
			}else{
				callback(null, new Transaction(node, json));
			}
		});
	}
};

module.exports = Transactions;