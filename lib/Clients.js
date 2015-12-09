
var Clients = function(clientId, clientSecret, isProduction){
	this.client_id = clientId;
	this.client_secret = clientSecret;
	this.isProduction = isProduction;
	this.baseUrl = 'https://synapsepay.com/api/3';
	if(!this.isProduction){
		this.baseUrl = 'https://sandbox.synapsepay.com/api/3';
	}
}

module.exports = Clients;