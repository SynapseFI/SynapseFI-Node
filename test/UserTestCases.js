var assert = require('chai').assert;
var Users = require('../lib/Users.js');
var Helpers = require('./Helpers.js');

var createPayload = {
	"logins": [
        {
            "email": "nodeTest@synapsepay.com",
            "password": "test1234",
            "read_only":false
        }
    ],
    "phone_numbers": [
        "901.111.1111"
    ],
    "legal_names": [
        "NODE TEST USER"
    ],
    "extra": {
        "note": "Interesting user",
        "supp_id": "122eddfgbeafrfvbbb",
        "is_business": false
    }
};

var updatePayload = {
	"update":{
		"legal_name":"Some new name"
	}
};

var docPayload = {
	"doc":{
		"birth_day":4,
		"birth_month":2,
		"birth_year":1940,
		"name_first":"John",
		"name_last":"doe",
		"address_street1":"1 Infinate Loop",
		"address_postal_code":"95014",
		"address_country_code":"US",
		"document_value":"2222",
		"document_type":"SSN"
	}
};

var kbaPayload = {

};

var unverifiedUser;

describe('User', function(){

	before(function(done){
		this.timeout(30000);
		Users.create(
				Helpers.client,
				Helpers.fingerprint,
				Helpers.ip_address,
				createPayload,
				function(err, user){
					unverifiedUser = user;
					done();
				}
			);
	});

	describe('update', function(){
		it('should update elements of the user', function(done){
			this.timeout(30000);
			updatePayload['refresh_token'] = unverifiedUser.json.refresh_token;
			unverifiedUser.update(updatePayload, function(err, json){
				assert.isNull(err, 'there was no error');
				assert(unverifiedUser.json['legal_names'].indexOf('Some new name') > -1);
				done();
			});
		});
	});

	describe('addDoc', function(){
		it('should add the virtual doc to the user', function(done){
			this.timeout(30000);
			unverifiedUser.addDoc(docPayload, function(err, json){
				assert.isNull(err, 'there was no error');
				assert(unverifiedUser.json['permission'] != 'UNVERIFIED');
				done();
			});
		});
	});

	// describe('answerKBA', function(){
	// 	it('should answer any knowledge base questions a user receives', function(err, json){
	// 		this.timeout(30000);
	// 		user.answerKBA(DOC_PAYLOAD, function(err, json){
	// 			assert.isNull(err, 'there was no error');
	// 			assert(this.json['_id'] == Helpers.unverified_user_id);
	// 			assert(this.json['permission'] != 'UNVERIFIED');
	// 		});
	// 	});
	// });
});