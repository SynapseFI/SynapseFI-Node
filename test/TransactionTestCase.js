'use strict';

var assert = require('chai').assert;
var Users = require('../lib/Users.js');
var Nodes = require('../lib/Nodes.js');
var Transactions = require('../lib/Transactions.js');
var Helpers = require('./Helpers.js');

var transPayload = {
  to: {
    type: 'SYNAPSE-US',
    id: Helpers.to_node_id
  },
  amount: {
    amount: 3.50,
    currency: 'USD'
  },
  extra: {
    supp_id: '1283764wqwsdd34wd13212',
    note: 'Pay someone',
    webhook: 'http://requestb.in/q94kxtq9',
    process_on: 1,
    ip: '192.168.0.1'
  }
};

var updatePayload = {
  "comment":"some comment"
};

var testUser;
var testNode;
var testTransaction;

describe('Transaction', function() {
  this.timeout(30000);
  
  before(function(done) {
    Users.get(
      Helpers.client,
      {
        ip_address: Helpers.ip_address,
        fingerprint: Helpers.fingerprint,
        _id: Helpers.user_id
      },
      function(err, user) {
        testUser = user;
        Nodes.get(
          testUser,
          {
            _id:Helpers.node_id
          },
          function(err, node) {
            testNode = node;
            Transactions.create(
              node,
              transPayload,
              function(err, transaction) {
                testTransaction = transaction;
                done();
              }
            );
          } 
        )  
      }  
    )
  });

  describe('update', function() {
    it('should update the comment of the Transaction object', function(done) {
      testTransaction.update(
        updatePayload,
        function(err, transaction) {
          assert.equal(
            transaction.json.recent_status.note, 
            testTransaction.json.recent_status.note
          );
          done();
        });
    });
  });

  describe('delete', function() {
    it('should delete a transaction', function(done) {
      testTransaction.delete(
        function(err, transaction) {
          assert.equal(transaction.json.recent_status.status_id, '5');
          done();
        });
    });
  });
});
