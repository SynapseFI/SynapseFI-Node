var request = require('superagent');
var mime = require('mime');
var CryptoJS = require('crypto-js');

var Helpers = {
	
	urlToBase64: function(url, callback){
		request
			.get(url)
			.buffer()
			.end(function(err, res){
				if(err){
					callback(new Error('Could not download file.'));
				}else{
					var fileType = res.headers['content-type'];
					var base64 = new Buffer(res.body, 'binary').toString('base64');
					var dataURI = 'data:' + fileType + ';base64,' + base64;
					callback(null, dataURI);
				}
			});
	},

	fileToBase64: function(filePath, callback){
		var fs = require('fs');
		fs.statSync(filePath);
		fs.readFile(filePath, function(err, original_data){
			if(err){
				callback(err);
			}else{
				var fileType = mime.lookup(filePath);
				var base64 = new Buffer(original_data, 'binary').toString('base64');
				var dataURI = 'data:' + fileType + ';base64,' + base64;
				callback(null, dataURI);
			}
		});
	},

	verifyHMAC: function(client, givenHMAC, object_id){
		var raw = String(object_id) + '+' + String(client.client_id);
		var hashed = CryptoJS.HmacSHA1(raw, client.client_secret);
		return (hashed === given_hmac);
	}
};

module.exports = Helpers;