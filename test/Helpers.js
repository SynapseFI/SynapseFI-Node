var Clients = require('../lib/Clients.js');

var Helpers = {
	client: new Clients(process.env.CLIENT_ID, process.env.CLIENT_SECRET, false),
	ip_address: '127.0.0.1',
	fingerprint: 'test_fp',
	unverified_user_id: '',
	verified_user_id: '',
	user_id: '',
	node_id: '',
	to_node_id: '',
	trans_id: ''
};

module.exports = Helpers;
