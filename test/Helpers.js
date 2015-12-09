var Clients = require('../lib/Clients.js');

var Helpers = {
	client: new Clients('', '', false),
	ip_address: '',
	fingerprint: '',
	unverified_user_id: '',
	verified_user_id: '',
	user_id: '',
	node_id: '',
	to_node_id: '',
	trans_id: ''
};

module.exports = Helpers;