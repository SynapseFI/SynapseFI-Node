'use strict';

var assert = require('chai').assert;
var Users = require('../lib/Users.js');
var Nodes = require('../lib/Nodes.js');
var Subnets = require('../lib/Subnets.js');
var Helpers = require('./Helpers.js');

var createPayload = {
  nickname: "Test AC/RT"
};

var testUser;
var testNode;

describe('Subnets', function() {
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
            _id: Helpers.to_node_id
          },
          function(err, node) {
            testNode = node;
            done();
          }
        );
      });
  });

  describe('create', function() {
    it('should create a Subnet object', function(done) {
      Subnets.create(
        testNode,
        createPayload,
        function(err, subnet) {
          assert.equal(subnet.json.nickname, createPayload['nickname']);
          done();
        }
      );
    });
  });


  describe('get subnets', function() {
    it('should get multiplesubnets in a JSON format', function(done) {
     Subnets.get(
        testNode,
        null,
        function(err, json) {
          assert(json['subnets'].length > 0);
          done();
        }
      );
    });
  });

  describe('get with subnets _id', function() {
    it('should get a single Subnet object', function(done) {
      Subnets.get(
        testNode,
        {
          _id: Helpers.subnets_id
        },
        function(err, subnet) {
          assert(subnet.json['_id'] === Helpers.subnets_id);
          done();
        }
      );
    });
  });
});
