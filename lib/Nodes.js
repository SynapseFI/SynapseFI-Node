var APIClient = require('./APIClient.js');
var Node = require('./Node.js');

var Nodes = {
	
	get: function(user, options, callback){
		var config = {
			client: user.client,
			ip_address: user.ip_address,
			fingerprint: user.fingerprint,
			oauth_key: user.oauth_key
		}
		var url = user.json['_links']['self']['href'] + '/nodes';
		if(options){
			if(options._id){
				url += '/' + options._id;
			}
		}
		APIClient.get(url, config, function(err, json){
			if(err){
				callback(err);
			}else{
				if(json['nodes']){
					callback(null, json);
				}else{
					callback(null, new Node(user, json));
				}
			}
		});
	},

	create: function(user, payload, callback){
		var config = {
			client: user.client,
			ip_address: user.ip_address,
			fingerprint: user.fingerprint,
			oauth_key: user.oauth_key
		};
		var url = user.json['_links']['self']['href'] + '/nodes';
		APIClient.post(url, config, payload, function(err, json){
			if(err){
				callback(err);
			}else{
				var nodes = [];
				for(var i = 0; i < json['nodes'].length; i++){
					nodes.push(new Node(user, json['nodes'][i]));
				}
				callback(null, nodes);
			}
		});
	}
}

module.exports = Nodes;