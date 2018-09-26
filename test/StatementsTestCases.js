'use strict';

const assert = require('chai').assert;
const Users = require('../lib/Users.js');
const Statements = require('../lib/Statements.js');
const Helpers = require('./Helpers.js');

const bothParams = {
  page: 2,
  per_page: 5
}

const pageParam = {
  page: 3
}

const perPageParam = {
  per_page: 10
}

let statementsUser;

describe('Statements', function() {
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
        statementsUser = user;
        done();
      }
    )
  });

  describe('user statements', function() {
    it('should retrive statements by user', function(done) {
      Statements.get(
        statementsUser,
        {},
        function(err, statements) {
          assert(Array.isArray(statements.statements));
          done();
        }
      )
    });

    it('should filter user statements by page', function(done) {
      Statements.get(
        statementsUser,
        pageParam,
        function(err, statements) {
          assert.equal(statements.page, pageParam.page);
          done();
        }
      )
    });

    it('should filter user statements by limit', function(done) {
      Statements.get(
        statementsUser,
        perPageParam,
        function(err, statements) {
          assert.equal(statements.limit, perPageParam.per_page);
          done();
        }
      )
    });

    it('should filter user statements by both params', function(done) {
      Statements.get(
        statementsUser,
        bothParams,
        function(err, statements) {
          assert.equal(statements.page, bothParams.page);
          assert.equal(statements.limit, bothParams.per_page);
          done();
        }
      )
    });
  });

  describe('node statements', function() {
    it('should retrieve statements by node', function(done) {
      Statements.get(
        statementsUser,
        {
          _id: '5a84d4040a6ac8004ca3f6b1'
        },
        function(err, statements) {
          assert(Array.isArray(statements.statements));
          done();
        }
      )
    });

    it('should filter node statements by page', function(done) {
      Statements.get(
        statementsUser,
        {
          _id: '5a84d4040a6ac8004ca3f6b1',
          page: 3
        },
        function(err, statements) {
          assert.equal(statements.page, pageParam.page);
          done();
        }
      )
    });

    it('should filter node statements by limit', function(done) {
      Statements.get(
        statementsUser,
        {
          _id: '5a84d4040a6ac8004ca3f6b1',
          per_page: 15
        },
        function(err, statements) {
          assert.equal(statements.limit, perPageParam.per_page);
          done();
        }
      )
    });

    it('should filter node statements by both params', function(done) {
      Statements.get(
        statementsUser,
        {
          _id: '5a84d4040a6ac8004ca3f6b1',
          page: 2,
          per_page: 12
        },
        function(err, statements) {
          assert.equal(statements.page, bothParams.page);
          assert.equal(statements.limit, bothParams.per_page);
          done();
        }
      )
    });
  });
});
