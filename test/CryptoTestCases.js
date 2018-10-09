'use strict';

var assert = require('chai').assert;
var Crypto = require('../lib/Crypto.js');
var Helpers = require('./Helpers.js');

describe('crypto', function() {
  this.timeout(30000);

  describe('get crypto quotes', function() {
    it('should return USD price of btc and eth', function(done) {
      Crypto.getQuotes(
        Helpers.client,
        function(err, json) {
          assert.isNotNaN(json.USDBTC);
          assert.isNotNaN(json.USDETH);
          done();
        }
      );
    });


    it('should return equivalent of $1 of btc and eth', function(done) {
      Crypto.getQuotes(
        Helpers.client,
        function(err, json) {
          assert.isNotNaN(json.BTCUSD);
          assert.isNotNaN(json.ETHUSD);
          done();
        }
      );
    });
  });

  describe('get crypto market data', function() {
    it('should return market data', function(done) {
      Crypto.getMarketData(
        Helpers.client,
        {},
        function(err, json) {
          assert.exists(json.BTC.data);
          done();
        }
      );
    });

    it('should return market news', function(done) {
      Crypto.getMarketData(
        Helpers.client,
        {},
        function(err, json) {
          assert.exists(json.BTC.news);
          done();
        }
      );
    });

    it('should return requested crypto asset market data', function(done) {
      Crypto.getMarketData(
        Helpers.client,
        {
          currency: 'ETH'
        },
        function(err, json) {
          assert.exists(json.ETH);
          done();
        }
      );
    });
  });
});
