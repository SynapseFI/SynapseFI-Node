'use strict';

var assert = require('chai').assert;
var LocateATMs = require('../lib/LocateATMs.js');
var Helpers = require('./Helpers.js');

var CREATE_PAYLOAD = {
  page: 1,
  per_page: 20,
  radius: '5',
  zip: '94103'
};

describe('LocateATMs', function() {
  this.timeout(30000);

  describe('get atms with passed in parameters', function() {
    it('should create an ATM object array', function(done) {
      LocateATMs.get(
        Helpers.client,
        CREATE_PAYLOAD,
        function(err, json) {
          assert(Array.isArray(json.atms));;
          done();
        }
      );
    });

    it('should find ATMs within the correct radius', function(done) {
      LocateATMs.get(
        Helpers.client,
        CREATE_PAYLOAD,
        function(err, json) {
          assert(json.atms[json.atms.length - 1].distance < CREATE_PAYLOAD.radius);
          done();
        }
      );
    });
  });

  it('should find ATMs within the correct zipcode', function(done) {
    LocateATMs.get(
      Helpers.client,
      CREATE_PAYLOAD,
      function(err, json) {
        assert(json.atms[0].atmLocation.address.postalCode.slice(0, 3) === CREATE_PAYLOAD.zip.slice(0, 3));
        done();
      }
    );
  });

  describe('get atms with no passed in parameters', function() {
    it('should return an empty array with default parameters', function(done) {
      LocateATMs.get(
        Helpers.client,
        {},
        function(err, json) {
          assert(json.atms.length === 0);
          assert(json.page === 1);
          assert(json.limit === 20);
          done();
        }
      );
    });
  });

  describe('get atms with lat and lon', function() {
    it('should return atms by lat and lon', function(done) {
      LocateATMs.get(
        Helpers.client,
        {
          lat: '37.7749',
          lon: '-122.4194'
        },
        function(err, json) {
          var latitude = json.atms[0].atmLocation.coordinates.latitude.toString();
          var longitude = json.atms[0].atmLocation.coordinates.longitude.toString();
          assert(Array.isArray(json.atms));
          assert.include(latitude, '37');
          assert.include(longitude, '-122');
          done();
        }
      )
    });
  });
});
