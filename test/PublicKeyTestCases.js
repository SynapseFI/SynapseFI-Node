'use strict';

var assert = require('chai').assert;
var PublicKey = require('../lib/PublicKey.js');
var Helpers = require('./Helpers.js');

const CREATE_PAYLOAD = {
  scope: 'CLIENT|CONTROLS'
};

describe('PublicKey', function() {
  this.timeout(30000);

  describe('get publickey with scope', function() {
    it('should get public key object with the correct scope', function(done) {
      PublicKey.get(
        Helpers.client,
        CREATE_PAYLOAD,
        function(err, json) {
          assert.equal(json['public_key_obj']['scope'], 'CLIENT|CONTROLS', 'equal');
          done();
        }
      );
    });
  });

  describe('get without scope', function() {
    it('should get public key object with the default scope', function(done) {
      PublicKey.get(
        Helpers.client,
        null,
        function(err, json) {
          assert.equal(json['public_key_obj']['scope'], 'OAUTH|POST,USERS|POST,USERS|GET,USER|GET,USER|PATCH,SUBSCRIPTIONS|GET,SUBSCRIPTIONS|POST,SUBSCRIPTION|GET,SUBSCRIPTION|PATCH,CLIENT|REPORTS,CLIENT|CONTROLS', 'equal');
          done();
        }
      );
    });
  });

});
