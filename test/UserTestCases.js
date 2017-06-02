'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;
var Users = require('../lib/Users.js');
var Helpers = require('./Helpers.js');

chai.use(chaiHttp);

var createPayload = {
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

var updatePayload = {
  update: {
    legal_name: 'Some new name'
  }
};

var docPayload = {
  doc: {
    birth_day: 4,
    birth_month: 2,
    birth_year: 1940,
    name_first: 'John',
    name_last: 'doe',
    address_street1: '1 Infinate Loop',
    address_postal_code: '95014',
    address_country_code: 'US',
    document_value: '2222',
    document_type: 'SSN'
  }
};

var addDocsPayload = {
  documents: [
    {
      email: 'test@test.com',
      phone_number: '901-942-8167',
      ip: '12134323',
      name: 'Charlie Brown',
      alias: 'Woof Woof',
      entity_type: 'M',
      entity_scope: 'Arts & Entertainment',
      day: 2,
      month: 5,
      year: 1987,
      address_street: 'Some Farm',
      address_city: 'SF',
      address_subdivision: 'CA',
      address_postal_code: '94114',
      address_country_code: 'US',
      virtual_docs: [{
        document_value: '111-111-2222',
        document_type: 'SSN'
      }],
      physical_docs: [
        {
          document_value: 'data:text/csv;base64,SUQs==',
          document_type: 'GOVT_ID'
        },
        {
          document_value: 'data:text/csv;base64,SUQs==',
          document_type: 'SELFIE'
        }
      ],
      social_docs: [{
        document_value: 'https://www.facebook.com/sankaet',
        document_type: 'FACEBOOK'
      }]
    }
  ]
};

var unverifiedUser;
var baseUrl = 'https://uat-api.synapsefi.com/v3.1';

describe('User', function() {
  this.timeout(30000);

  before(function(done) {

    Users.create(
        Helpers.client,
        Helpers.fingerprint,
        Helpers.ip_address,
        createPayload,
        function(err, user) {
          unverifiedUser = user;
          done();
        }
      );
  });

  describe('update', function() {
    it('should update elements of the user', function(done) {
      updatePayload['refresh_token'] = unverifiedUser.json.refresh_token;
      unverifiedUser.update(updatePayload, function(err, json) {
        assert.isNull(err, 'there was no error');
        assert(unverifiedUser.json['legal_names'].indexOf('Some new name') > -1);
        done();
      });
    });
  });

  describe('addDocuments', function() {
    it('should add the documents to the user', function(done) {
      unverifiedUser.addDocuments(addDocsPayload, function(err, res) {
        var userId = res.json._id;

        chai.request(baseUrl)
        .get(`/users/${userId}`)
        .end(function(err, res) {
          assert.notEqual(res['permission'], 'UNVERIFIED');
          done();                               // <= Call done to signal callback end
        });
      });
    });
  });

  /***** DEPRECATED *********
  describe('answerKBA', function() {
    it('should answer any knowledge-based questions a user receives', function(done) {

      // triggers SUBMITTED|MFA_PENDING
      var addDocsPayload = {
        documents: [
          {
            email: 'test@test.com',
            phone_number: '901-942-8167',
            ip: '12134323',
            name: 'Charlie Brown',
            alias: 'Woof Woof',
            entity_type: 'M',
            entity_scope: 'Arts & Entertainment',
            day: 2,
            month: 5,
            year: 2009,
            address_street: 'Some Farm',
            address_city: 'SF',
            address_subdivision: 'CA',
            address_postal_code: '94114',
            address_country_code: 'US',
            virtual_docs: [{
              document_value: '111-111-3333',
              document_type: 'SSN'
            }],
            physical_docs: [
              {
                document_value: 'data:text/csv;base64,SUQs==',
                document_type: 'GOVT_ID'
              }
            ],
            social_docs: [{
              document_value: 'https://www.facebook.com/sankaet',
              document_type: 'FACEBOOK'
            }]
          }
        ]
      };

      // add documents with flagged SSN
      unverifiedUser.addDocuments(addDocsPayload, function(err, json) {
        assert.isNull(err, 'there was no error');
        assert(unverifiedUser.json['permission'] === 'UNVERIFIED');

        var kbaPayload = {
          documents: [{
            id: json.json.documents[0].id,
            virtual_docs: [{
              id: json.json.documents[0].virtual_docs.find((doc) => doc.status === 'SUBMITTED|MFA_PENDING').id,
              meta: {
                question_set: {
                  answers: [
                    { question_id: 1, answer_id: 1 },
                    { question_id: 2, answer_id: 1 },
                    { question_id: 3, answer_id: 1 },
                    { question_id: 4, answer_id: 1 },
                    { question_id: 5, answer_id: 1 }
                  ]
                }
              }
            }]
          }]
        };

        // verify MFA questions
        unverifiedUser.answerKBA(kbaPayload, function(err, json) {
          assert.isNull(err, 'there was no error');
          assert(json.json['permission'] !== 'UNVERIFIED');
          done();
        });
      });
    });
  });
  ****************************/
});
