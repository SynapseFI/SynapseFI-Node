var APIClient = require('./APIClient.js');

var Node = function(user, json){
	this.user = user;
	this.json = json;
};

Node.prototype.updateJSON = function(err, json, callback){
	if(err){
		callback(err);
	}else{
		this.json = json;
		callback(null, this);
	}
};

Node.prototype.update = function(payload, callback){
	var url = this.json['_links']['self']['href'];
	var self = this;
	var config = this.getAPIConfig();
	APIClient.patch(url, config, payload, function(err, json){
		self.updateJSON(err, json, callback);
	});
};

Node.prototype.delete = function(callback){
	var url = this.json['_links']['self']['href'];
	var self = this;
	var config = this.getAPIConfig();
	APIClient.delete(url, config, function(err, json){
		self.updateJSON(err, json, callback);
	});
};

Node.prototype.getAPIConfig = function(){
	return {
		client: this.user.client,
		ip_address: this.user.ip_address,
		fingerprint: this.user.fingerprint,
		oauth_key: this.user.oauth_key
	}
}

module.exports = Node;
