
## Client

```javascript
var SynapsePay = require('synapsepay');
var Clients = SynapsePay.Clients;

var client = Clients(
	'YOUR_CLIENT_ID',
	'YOUR_CLIENT_SECRET',
	IS_PRODUCTION # boolean
);

```

## Function Callbacks

```javascript

# Unless specifically stated the res is a JSON object.

var callback = function(err, res){
	# DO SOMETHING
};

```


## User API Calls

```javascript


# Imports

var Users = SynapsePay.Users;


#Create a User

var createPayload = {
	"logins" :  [
		{
			"email" :  "javascriptTest@synapsepay.com",
			"password" :  "test1234",
			"read_only" : false
		}
	],
	"phone_numbers" :  [
		"901.111.1111"
	],
	"legal_names" :  [
		"NODE TEST USER"
	],
	"extra" :  {
		"note" :  "Interesting user",
		"supp_id" :  "122eddfgbeafrfvbbb",
		"is_business" :  false
	}
};

Users.create(
	client,
	fingerprint,
	ip_address,
	createPayload,
	function(err, user){
		# THE RESPONSE IS A USER OBJECT
	}
);



# Get User

var options = {
	page: '',
	per_page: '',
	query: '',
	user_id: ''
};

var user_response = client.Users.get(options, callback);

# Get All Users

Users.get(
	client,
	null,
	function(err, json){
		# A JSON OBJECT CONTAINING ALL THE USERS
	}
);


# Add KYC Information

var docPayload = {
		"doc" : {
		"birth_day" : 4,
		"birth_month" : 2,
		"birth_year" : 1940,
		"name_first" : "John",
		"name_last" : "doe",
		"address_street1" : "1 Infinite Loop",
		"address_postal_code" : "95014",
		"address_country_code" : "US",
		"document_value" : "3333",
		"document_type" : "SSN"
	}
};

user.addDoc(
	docPayload,
	function(err, json){
		# RESPONSE IS A JSON OBJECT BUT THE USER OBJECT HAS BEEN UPDATED
	}
);

# Answer KBA Questions

var kbaPayload = {
	"doc" : {
		"question_set_id" : "557520ad343463000300005a",
		"answers" : [
			{ "question_id" :  1, "answer_id" :  1 },
			{ "question_id" :  2, "answer_id" :  1 },
			{ "question_id" :  3, "answer_id" :  1 },
			{ "question_id" :  4, "answer_id" :  1 },
			{ "question_id" :  5, "answer_id" :  1 }
		]
	}
};

user.answerKBA(
	kbaPayload,
	function(err, json){
		# RESPONSE IS A JSON OBJECT BUT THE USER OBJECT HAS BEEN UPDATED
	}
);


# Attach File

# Check "Helpers" section for filePayload example. 

user.update(
	filePayload,
	function(err, json){
		# RESPONSE IS A JSON OBJECT BUT THE USER OBJECT HAS BEEN UPDATED
	}
);

```


## Node API Calls

```javascript


# Imports

var Nodes = SynapsePay.Nodes;


# Get All Nodes

Nodes.get(
	user,
	null,
	function(err, nodes){
		# RESPONSE IS AN ARRAY OF NODE OBJECTS
	}
);


# Get a Specific Node

Nodes.get(
	user,
	{
		_id: 'NODE_ID'
	},
	function(err, node){
		# RESPONSE IS A NODE OBJECT
	}
);


# Add SYNAPSE-US Node

var synapseNodePayload = {
	"type" : "SYNAPSE-US",
	"info" : {
		"nickname" : "My Synapse Wallet"
	},
	"extra" : {
		"supp_id" : "123sa"
	}
};

Nodes.create(
	user,
	synapseNodePayload,
	function(err, node){
		# RESPONSE IS A NODE OBJECT
	}
);


# Add ACH-US Node through Account and Routing Number Details

var achPayload = {
	"type" : "ACH-US",
	"info" : {
		"nickname" : "Ruby Library Savings Account",
		"name_on_account" : "Ruby Library",
		"account_num" : "72347235423",
		"routing_num" : "051000017",
		"type" : "PERSONAL",
		"class" : "CHECKING"
	},
	"extra" : {
		"supp_id" : "123sa"
	}
};

Nodes.create(
	user,
	achPayload,
	function(err, res){
		# RESPONSE SHOULD BE A NODE OBJECT, BUT CREATE CAN RETURN JSON AS WELL
	}
);

var acct_rout_response = client.Nodes.add(acct_rout_payload, callback);


# Verify ACH-US via Micro-Deposits

var microPayload = {
	"micro" : [0.1,0.1]
};

node.update(
	microPayload,
	function(err, json){
		# RESPONSE IS A JSON OBJECT BUT THE NODE OBJECT IS UPDATED
	}
);


# Add ACH-US node through account login

var loginPayload = {
	"type" : "ACH-US",
	"info" : {
		"bank_id" : "synapse_good",
		"bank_pw" : "test1234",
		"bank_name" : "fake"
	}
};

Nodes.create(
	user,
	loginPayload,
	function(err, res){
		# RESPONSE WILL BE JSON IF MFA REQUIRED OTHERWISE A NODE OBJECT IS RETURNED
	}
);


# Verify ACH-US via MFA

var mfaPayload = {
	"access_token" : ACCESS_TOKEN_IN_LOGIN_RESPONSE,
	"mfa_answer" : "test_answer"
};

Nodes.create(
	user,
	mfaPayload,
	function(err, res){
		# RESPONSE WILL BE JSON IF MFA REQUIRED OTHERWISE A NODE OBJECT IS RETURNED
	}
);


# Delete a Node

node.delete(
	function(err, json){
		# RESPONSE IS A JSON OBJECT BUT THE NODE OBJECT IS UPDATED
	}
);


```

## Transaction API Calls

```javascript


# Imports

var Transactions = SynapsePay.Transactions;


#Create a Transaction

var createPayload = {
	"to" : {
		"type" : "SYNAPSE-US",
		"id" : "560adb4e86c27331bb5ac86e"
	},
	"amount" : {
		"amount" : 1.10,
		"currency" : "USD"
	},
	"extra" : {
		"supp_id" : "1283764wqwsdd34wd13212",
		"note" : "Deposit to bank account",
		"webhook" : "http : //requestb.in/q94kxtq9",
		"process_on" : 1,
		"ip" : "192.168.0.1"
	},
	"fees" : [{
		"fee" : 1.00,
		"note" : "Facilitator Fee",
		"to" : {
			"id" : "55d9287486c27365fe3776fb"
		}
	}]
};

Transactions.create(
	node,
	createPayload,
	function(err, transaction){
		# RESPONSE IS A TRANSACTION OBJECT
	}
);


# Get a Transaction

Transactions.get(
	node,
	{
		_id: 'TRANSACTION_ID'
	},
	function(err, transaction){
		# RESPONSE IS A TRANSACTION OBJECT
	}
);

# Get All Transactions

Transactions.get(
	node,
	function(err, json){
		# RESPONSE IS A JSON OBJECT CONTAINING ALL THE TRANSACTIONS
	}
);


# Update Transaction

var updatePayload = {
	"comment" :  "hi"
};

transaction.update(
	updatePayload,
	function(err, json){
		# RETURNS A JSON OBJECT BUT THE TRANSACTION OBJECT IS UPDATED
	}
);


# Delete Transaction

transaction.delete(callback);


```