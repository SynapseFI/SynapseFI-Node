'use strict';

var assert = require('chai').assert;
var Subscriptions = require('../lib/Subscriptions.js');
var Helpers = require('./Helpers.js');

const CREATE_PAYLOAD = {
  scope: [
    'USERS|POST',
    'USER|PATCH',
    'NODES|POST',
    'NODE|PATCH',
    'TRANS|POST',
    'TRAN|PATCH'
  ],
  url: 'https://requestb.in/zp216zzp'
};

describe('Subscriptions', function() {
  this.timeout(30000);

  describe('create', function() {
    it('should create a subscription object', function(done) {
      Subscriptions.create(
        Helpers.client,
        CREATE_PAYLOAD,
        function(err, subscription) {
          assert.equal(subscription.json.is_active, true );
          done();
        }
      );
    });
  });

  describe('get multiple subscriptions', function() {
    it('should get multiple subscriptions in a JSON format', function(done) {
      Subscriptions.get(
        Helpers.client,
        null,
        function(err, json) {
          assert.isNull(err, 'Error should be null');
          assert(json['subscriptions'].length > 0);
          done();
        }
      );
    });
  });

  describe('get with subscription _id', function() {
    it('should get a single Subscription object', function(done) {
      Subscriptions.get(
        Helpers.client,
        {
          _id: Helpers.subscription_id
        },
        function(err, subscription) {
          assert(subscription.json['_id'] === Helpers.subscription_id);
          done();
        }
      );
    });
  });

});
