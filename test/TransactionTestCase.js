var assert = require('chai').assert;
var Users = require('../lib/Users.js');
var Nodes = require('../lib/Nodes.js');
var Transactions = require('../lib/Transactions.js');
var Helpers = require('./Helpers.js');

var updatePayload = {
  "comment":"some comment"
};

var testUser;
var testNode;
var testTransaction;

describe('Transaction', function(){

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
				Nodes.get(
					testUser,
					{
						_id:Helpers.node_id
					},
					function(err, node){
						testNode = node;
						Transactions.get(
							node,
							{
								_id: Helpers.trans_id
							},
							function(err, transaction){
								testTransaction = transaction;
								done();
							}
						);
					}
				);
			});
	});

	describe('update', function(){
		it('should update the comment of the Transaction object', function(done){
			this.timeout(30000);
			testTransaction.update(
				updatePayload,
				function(err, transaction){
					assert.isNull(err);
					assert(transaction.json['recent_status']['note'].indexOf('some comment') > -1);
					done();
				});
		});
	});
});