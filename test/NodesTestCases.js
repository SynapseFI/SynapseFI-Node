var assert = require('chai').assert;
var Users = require('../lib/Users.js');
var Nodes = require('../lib/Nodes.js');
var Helpers = require('./Helpers.js');

const CREATE_PAYLOAD = {
	"type":"SYNAPSE-US",
	"info":{
		"nickname":"Node Unit Test Synapse Wallet"
	},
	"extra":{
		"supp_id":"123sa"
	}
};

var nodeUser;

describe('Nodes', function(){

	before(function(done){
		Users.get(
			Helpers.client,
			{
				ip_address: Helpers.ip_address,
				fingerprint: Helpers.fingerprint,
				_id: Helpers.verified_user_id
			},
			function(err, user){
				nodeUser = user;
				done();
			});
	});

	describe('create', function(){
		it('should create a Node object array', function(done){
			this.timeout(30000);
			Nodes.create(
				nodeUser,
				CREATE_PAYLOAD,
				function(err, nodes){
					assert.isNull(err, 'there was no error');
					assert(nodes[0].user != undefined);
					done();
				}
			);
		});
	});

	describe('get nodes', function(){
		it('should get multiple nodes in a JSON format', function(done){
			this.timeout(30000);
			Nodes.get(
				nodeUser,
				null,
				function(err, json){
					assert.isNull(err, 'Error should be null');
					assert(json['nodes'].length > 0);
					done();
				}
			);
		});
	});

	describe('get with node _id', function(){
		it('should get a single Node object', function(done){
			this.timeout(30000);
			Nodes.get(
				nodeUser,
				{
					_id: Helpers.node_id
				},
				function(err, node){
					assert.isNull(err);
					assert(node.user != undefined)
					done();
				}
			)
		})
	})
});