'use strict';

var assert = require('chai').assert;
var Users = require('../lib/Users.js');
var Nodes = require('../lib/Nodes.js');
var Helpers = require('./Helpers.js');

var createPayload = {
  type: 'ACH-US',
  info: {
    nickname: 'Savings Account',
    account_num: '123567444',
    routing_num: '051000017',
    type: 'PERSONAL',
    class: 'CHECKING'
  },
  extra: {
    supp_id: '123sa'
  }
};

var verifyPayload = {
  'micro': [0.1, 0.1]
};

var testUser;
var testNode;
var cardNum;

describe('Node', function() {
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
        testUser = user;
        Nodes.create(
          testUser,
          createPayload,
          function(err, nodes) {
            testNode = nodes[0];
            done();
          }
        );
      });
  });

  // Already being tested in NodesTestCases.js
  // describe('update', function() {
  //   it('should verify a Node object through micro-deposits', function(done) {
  //     testNode.update(
  //       verifyPayload,
  //       function(err, node) {
  //         // assert.isNull(err, 'there was no error');
  //         assert(node.user !== undefined);
  //         done();
  //       }
  //     );
  //   });
  // });

  describe('delete', function() {
    it('should delete a node', function(done) {
      testNode.delete(
        function(err, node) {
          assert.strictEqual(node.json.is_active, false);
          done();
        }
      );
    });
  });
});

describe('Node - card related', function() {
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
        testUser = user;
        Nodes.get(
          testUser,
          {
            _id: Helpers.debit_card_id
          },
          function(err, cardNode) {
            cardNum = cardNode.json.info.card_number;
            testNode = cardNode;
            done();
          }
        );
      });
  });

  describe('debit card', function() {
    it('should reset card information', function(done) {
      testNode.resetDebitCard(
        {
          reset: 'YES'
        },
        function(err, json) {
          if (err) {
            done(err);
          } else {
            assert.notEqual(cardNum, json.info.card_number);
            done();
          }
        }
      )
    });

    it('should ship physical card', function(done) {
      testNode.shipDebitCard(
        {
          ship: 'YES',
          fee_node_id: Helpers.to_node_id
        },
        function(err, json) {
          if (err) {
            done(err);
          } else {
            assert(json.timeline[json.timeline.length - 1].note.includes('Card sent for printing.'));
            done();
          }
        }
      )
    });
  });

  describe('dummy transactions', function() {
    it('should trigger dummy transaction', function(done) {
      testNode.triggerDummyTransaction(
        {
          is_credit: 'YES'
        },
        function(err, json) {
          if (err) {
            done(err);
          } else {
            assert.isTrue(json.success);
            done();
          }
        }
      )
    });
  });
});
