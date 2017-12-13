'use strict';

var assert = require('chai').assert;
var Users = require('../lib/Users.js');
var Helpers = require('./Helpers.js');

const CREATE_PAYLOAD = {
  logins: [
    {
      email: 'nodeTest@synapsepay.com',
      password: 'test1234',
      read_only: false
    }
  ],
  phone_numbers: [
    '901.111.1111'
  ],
  legal_names: [
    'NODE TEST USER'
  ],
  extra: {
    note: 'Interesting user',
    supp_id: '122eddfgbeafrfvbbb',
    is_business: false
  }
};

describe('Users', function() {
  this.timeout(30000);

  describe('create', function() {
    it('should create a user object', function(done) {
      Users.create(
        Helpers.client,
        Helpers.fingerprint,
        Helpers.ip_address,
        CREATE_PAYLOAD,
        function(err, user) {
          assert.isNull(err, 'there was no error');
          assert(user.oauth_key !== undefined);
          done();
        }
      );
    });
  });

  describe('get multiple users', function() {
    it('should get multiple users in a JSON format', function(done) {
      Users.get(
        Helpers.client,
        {
          ip_address: Helpers.ip_address
        },
        function(err, json) {
          assert.isNull(err, 'Error should be null');
          assert.isTrue(json['users'].length > 0, 'More than one user should be returned');
          done();
        }
      );
    });
  });

  describe('get with user _id', function() {
    it('should get a single User object', function(done) {
      Users.get(
        Helpers.client,
        {
          _id: Helpers.user_id,
          fingerprint: Helpers.fingerprint,
          ip_address: Helpers.ip_address
        },
        function(err, user) {
          assert(user.oauth_key !== undefined);
          done();
        }
      );
    });
  });

});
