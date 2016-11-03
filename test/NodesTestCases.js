'use strict';

var assert = require('chai').assert;
var Users = require('../lib/Users.js');
var Nodes = require('../lib/Nodes.js');
var Helpers = require('./Helpers.js');

const CREATE_PAYLOAD = {
  type: 'SYNAPSE-US',
  info: {
    nickname: 'Node Unit Test Synapse Wallet'
  },
  extra: {
    supp_id: '123sa'
  }
};

const CREATE_VIA_BANK_LOGIN_PAYLOAD = {
  type: 'ACH-US',
  info: {
    bank_id: 'synapse_good',
    bank_pw: 'test1234',
    bank_name: 'fake'
  }
};

const CREATE_VIA_ACCT_ROUTING_PAYLOAD = {
  type: 'ACH-US',
  info: {
    nickname: 'Node Library Checking Account',
    name_on_account: 'Node Library',
    account_num: Math.floor(Math.random() * 1000000000),
    routing_num: '051000017',
    type: 'PERSONAL',
    class: 'CHECKING'
  },
  extra: {
    supp_id: '123sa'
  }
};

var nodeUser;

describe('Nodes', function() {
  this.timeout(30000);

  beforeEach(function(done) {
    Users.get(
      Helpers.client,
      {
        ip_address: Helpers.ip_address,
        fingerprint: Helpers.fingerprint,
        _id: Helpers.user_id
      },
      function(err, user) {
        nodeUser = user;
        done();
      });
  });

  describe('create SYNAPSE-US', function() {
    it('should create a Node object array', function(done) {
      Nodes.create(
        nodeUser,
        CREATE_PAYLOAD,
        function(err, nodes) {
          assert.isNull(err, 'there was no error');
          assert(nodes[0].user !== undefined);
          done();
        }
      );
    });
  });

  describe('create ACH-US via bank login', function() {
    it('should create a Node object array', function(done) {
      Nodes.create(
        nodeUser,
        CREATE_VIA_BANK_LOGIN_PAYLOAD,
        function(err, nodes) {
          assert.isNotNull(err, 'there was an error');
          assert.isNotNull(err.body.mfa, 'there is an MFA question');

          var mfa = err.body.mfa;
          var mfaPayload = {
            access_token: mfa.access_token,
            mfa_answer: 'test_answer'
          };

          // verify mfa
          Nodes.create(
            nodeUser,
            mfaPayload,
            function(err, nodes) {
              var node = nodes[0];
              assert.isNull(err, 'there was no error');
              assert(node.user !== undefined);
              done();
            }
          );
        }
      );
    });
  });

  describe('create ACH-US via account/routing', function() {
    it('should create a Node object array', function(done) {
      Nodes.create(
        nodeUser,
        CREATE_VIA_ACCT_ROUTING_PAYLOAD,
        function(err, nodes) {
          var node = nodes[0];
          assert.isNull(err, 'there was no error');
          assert(node.user !== undefined);
          // does not have DEBIT permission
          assert(node.json.allowed === 'CREDIT');

          var microPayload = {
            micro: [0.1, 0.1]
          };

          node.update(
            microPayload,
            function(err, node) {
              assert.isNull(err, 'there was no error');
              assert(node.user !== undefined);
              // has DEBIT permission
              assert(node.json.allowed === 'CREDIT-AND-DEBIT');
              done();
            }
          );
        }
      );
    });
  });

  describe('get nodes', function() {
    it('should get multiple nodes in a JSON format', function(done) {
      Nodes.get(
        nodeUser,
        null,
        function(err, json) {
          assert.isNull(err, 'Error should be null');
          assert(json['nodes'].length > 0);
          done();
        }
      );
    });
  });

  describe('get with node _id', function() {
    it('should get a single Node object', function(done) {
      Nodes.get(
        nodeUser,
        {
          _id: Helpers.node_id
        },
        function(err, node) {
          assert.isNull(err);
          assert(node.user !== undefined);
          done();
        }
      );
    });
  });
});
