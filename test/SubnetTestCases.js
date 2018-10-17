'use strict';

var assert = require('chai').assert;
var Users = require('../lib/Users.js');
var Nodes = require('../lib/Nodes.js');
var Subnets = require('../lib/Subnets.js');
var Helpers = require('./Helpers.js');

var subnetsPayload = {
  nickname: "Test AC/RT"
};

var updatePayload = {
  "allowed":"LOCKED"
};

var testUser;
var testNode;
var testSubnet;

describe('Subnet', function() {
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
            _id:Helpers.to_node_id
          },
          function(err, node) {
            testNode = node;
            Subnets.create(
              node,
              subnetsPayload,
              function(err, subnet) {
                testSubnet = subnet;
                done();
              }
            );
          }
        )
      }
    )
  });

  describe('update', function() {
    it('should update the allowed key to LOCKED', function(done) {
      testSubnet.update(
        updatePayload,
        function(err, subnet) {
          assert.equal(
            subnet.json.allowed,
            testSubnet.json.allowed
          );
          done();
        });
    });
  });
});
