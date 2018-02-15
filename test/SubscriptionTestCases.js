'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;
var Subscriptions = require('../lib/Subscriptions.js');
var Helpers = require('./Helpers.js');

chai.use(chaiHttp);

var createPayload = {
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

var updatePayload = {
    'scope' : 'USERS|POST'
};

var Newsubscription;
var baseUrl = 'https://uat-api.synapsefi.com/v3.1';

describe('Subscription', function() {
  this.timeout(30000);

  before(function(done) {

    Subscriptions.create(
        Helpers.client,
        createPayload,
        function(err, subscription) {
          Newsubscription = subscription;
          done();
        }
      );
  });

  describe('update', function() {
    it('should update elements of the subscription', function(done) {
      Newsubscription.update(updatePayload, function(err, json) {
        assert(Newsubscription.json['scope'].indexOf('USERS|POST') > -1);
        done();
      });
    });
  });

});
