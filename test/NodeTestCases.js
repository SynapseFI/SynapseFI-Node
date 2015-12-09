var assert = require('chai').assert;
var Users = require('../lib/Users.js');
var Nodes = require('../lib/Nodes.js');
var Helpers = require('./Helpers.js');

var createPayload = {
	"type":"ACH-US",
	"info":{
		"nickname":"Savings Account",
		"account_num":"123567444",
		"routing_num":"051000017",
		"type":"PERSONAL",
		"class":"CHECKING"
	},
	"extra":{
		"supp_id":"123sa"
	}
};

var verifyPayload = {
	'micro': [0.1, 0.1]
};

var testUser;
var testNode;

describe('Node', function(){

	before(function(done){
		this.timeout(30000);
		Users.get(
			Helpers.client,
			{
				ip_address: Helpers.ip_address,
				fingerprint: Helpers.fingerprint,
				_id: Helpers.verified_user_id
			},
			function(err, user){
				testUser = user;
				Nodes.create(
					testUser,
					createPayload,
					function(err, nodes){
						testNode = nodes[0];
						done();
					}
				);
			});
	});

	describe('update', function(){
		it('should verify a Node object through micro-deposits', function(done){
			this.timeout(30000);
			testNode.update(
				verifyPayload,
				function(err, node){
					assert.isNull(err, 'there was no error');
					assert(node.user != undefined);
					done();
				}
			);
		});
	});
});