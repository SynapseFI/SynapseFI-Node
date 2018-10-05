'use strict';

var assert = require('chai').assert;
var Institutions = require('../lib/Institutions.js');
var Helpers = require('./Helpers.js');

describe('Institutions', function() {
  this.timeout(30000);

  describe('get institutions', function() {
    it('should create an institution object array', function(done) {
      Institutions.get(
        Helpers.client,
        function(err, json) {
          assert(Array.isArray(json.banks));
          assert(json.banks.length > 0);
          done();
        }
      );
    });
  });
});
