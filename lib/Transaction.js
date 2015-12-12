var APIClient = require('./APIClient.js');

var Transaction = function (node, json) {
	this.node = node;
	this.json = json;
};

Transaction.prototype.updateJSON = function (err, json, callback) {
	if (err) {
		callback(err);
	} else {
		this.json = json['trans'];
		callback(null, this);
	}
};

Transaction.prototype.generateConfig = function () {
	return {
		oauth_key: this.node.user.oauth_key,
		fingerprint: this.node.user.fingerprint,
		client: this.node.user.client,
		ip_address: this.node.user.ip_address
	};
}

Transaction.prototype.update = function (payload, callback) {
	var url = this.json['_links']['self']['href'];
	var config = this.generateConfig();
	var self = this;
	APIClient.patch(url, config, payload, function(err, json){
		self.updateJSON(err, json, callback);
	});
};

Transaction.prototype.delete = function (callback) {
	var url = this.json['_links']['self']['href'];
	var config = {
		oauth_key: this.node.user.oauth_key,
		fingerprint: this.node.user.fingerprint,
		client: this.node.user.client,
		ip_address: this.node.user.ip_address
	};
	var self = this;
	APIClient.delete(url, config, function(err, json){
		self.updateJSON(err, json, callback);
	});
};

module.exports = Transaction;