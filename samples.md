
## Client

```javascript
const SynapsePay = require('synapsepay');
const Clients = SynapsePay.Clients;
const Helpers = SynapsePay.Helpers;

const client = new Clients(
  // client id should be stored as an environment variable
  process.env.CLIENT_ID,
  // client secret should be stored as an environment variable
  process.env.CLIENT_SECRET,
  // is_production boolean determines sandbox or production endpoints used
  false
);
```

## Function Callbacks

```javascript
// resp is normally the resource (user/node/transaction). err may be an HTTP
//   error message or a 202 (virtual doc KBA or bank login MFA questions)

const callback = function(err, resp) {
  // DO SOMETHING
};
```


## User API Calls

```javascript
// Imports

const Users = SynapsePay.Users;


// Create a User

const createPayload = {
  logins: [
    {
      email: 'javascriptTest@synapsepay.com',
      password: 'test1234',
      read_only: false
    }
  ],
  phone_numbers: [
    '901.111.1111'
  ],
  legal_names: [
    'Node TestUser'
  ],
  extra: {
    note: 'Interesting user',
    supp_id: '122eddfgbeafrfvbbb',
    is_business: false
  }
};

let user;

Users.create(
  client,
  // fingerprint (specific to user or static for application)
  process.env.FINGERPRINT,
  Helpers.getUserIP(),
  createPayload,
  function(err, userResponse) {
    // error or user object
    user = userResponse;
  }
);


// Get User

let options = {
  _id: USER_ID,
  fingerprint: USER_FINGERPRINT,
  ip_address: Helpers.getUserIP(),
  full_dehydrate: 'yes' //optional
};

Users.get(
  client,
  options,
  function(errResp, userResponse) {
    // error or user object
    user = userResponse;
  }
);


// Get All Users

let options = {
  ip_address: Helpers.getUserIP(),
  page: '', //optional
  per_page: '', //optional
  query: '' //optional
};

let users;

Users.get(
  client,
  options,
  function(err, usersResponse) {
    // error or array of user objects
    users = usersResponse;
  }
);


// Add Base Document(s) and Physical/Social/Virtual Documents

const addDocsPayload = {
  documents: [
    {
      email: 'test@test.com',
      phone_number: '901-942-8167',
      ip: Helpers.getUserIP(),
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
          // use url to base64 helper
          document_value: Helpers.urlToBase64('http://my.url.com'),
          document_type: 'GOVT_ID'
        },
        {
          // or file to base64 helper
          document_value: Helpers.fileToBase64('/path/to/file'),
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

user.addDocuments(
  addDocsPayload,
  function(err, userResponse) {
    // error or user object
    user = userResponse;
  }
);

// Update Existing Base Document

const userUpdatePayload = {
  documents: [{
    id: BASE_DOCUMENT_ID,
    entity_scope: 'Lawyer',
    birth_day: 22
  }]
};

user.update(
  userUpdatePayload,
  function(err, userResponse) {
    // error or user object
    user = userResponse;
  }
);
```


## Node API Calls

```javascript
// Imports

const Nodes = SynapsePay.Nodes;


// Get All Nodes

let nodes;

Nodes.get(
  user,
  null,
  function(err, nodesResponse) {
    // error or array of node objects
    nodes = nodesResponse;
  }
);


// Get a Specific Node

Nodes.get(
  user,
  {
    _id: NODE_ID,
    full_dehydrate: 'yes' //optional
  },
  function(err, nodeResponse) {
    // error or node object
    node = nodeResponse;
  }
);


// Add SYNAPSE-US Node

const synapseNodePayload = {
  type: 'SYNAPSE-US',
  info: {
    nickname: 'My Synapse Wallet'
  },
  extra: {
    supp_id: '123sa'
  }
};

Nodes.create(
  user,
  synapseNodePayload,
  function(err, nodeResponse) {
    // error or node object
    node = nodeResponse;
  }
);


// Add ACH-US Node via Bank Login

const loginPayload = {
  type: 'ACH-US',
  info: {
    bank_id: 'synapse_good',
    bank_pw: 'test1234',
    bank_name: 'fake'
  }
};

let mfa;

Nodes.create(
  user,
  loginPayload,
  function(err, nodeResponse) {
    // error with MFA questions or node object
    mfa = err.body.mfa;
  }
);


// Verify ACH-US Node via MFA

const mfaPayload = {
  access_token: mfa.access_token,
  // the user's answer
  mfa_answer: 'test_answer'
};

Nodes.create(
  user,
  mfaPayload,
  function(err, nodesResponse) {
    // error or array of node objects
    nodes = nodesResponse;
  }
);


// Add ACH-US Node through Account and Routing Number Details

const achPayload = {
  type: 'ACH-US',
  info: {
    nickname: 'Node Library Checking Account',
    name_on_account: 'Node Library',
    account_num: '72347235423',
    routing_num: '051000017',
    type: 'PERSONAL',
    class: 'CHECKING'
  },
  extra: {
    supp_id: '123sa'
  }
};


Nodes.create(
  user,
  achPayload,
  function(err, nodesResponse) {
    // error or node object
    // node will only have RECEIVE permission until verified with micro-deposits
    nodes = nodesResponse;
  }
);


// Verify ACH-US via Micro-Deposits (for those added via Account/Routing)

const microPayload = {
  micro: [0.1, 0.1]
};

node = nodes[0];

node.update(
  microPayload,
  function(err, nodeResponse) {
    // error or node object
    node = nodeResponse;
  }
);

// Resend Microdeposits (for those added via Account/Routing)

node = nodes[0];

node.resendMicro(
  function(err, nodeResponse) {
    // error or node object
    node = nodeResponse;
  }
);


// Delete a Node

node.delete(
  function(err, resp) {
    // error or response object
  }
);
```

## Transaction API Calls

```javascript
// Imports

const Transactions = SynapsePay.Transactions;


// Create a Transaction

const createPayload = {
  to: {
    type: 'SYNAPSE-US',
    id: TO_NODE_ID
  },
  amount: {
    amount: 1.10,
    currency: 'USD'
  },
  extra: {
    supp_id: '1283764wqwsdd34wd13212',
    note: 'Deposit to bank account',
    webhook: 'http://requestb.in/q94kxtq9',
    process_on: 1,
    ip: Helpers.getUserIP()
  }
  fees: [{
    fee: 1.00,
    note: 'Facilitator Fee',
    to: {
      id: FEE_TO_NODE_ID
    }
  }]
};

let transaction;

Transactions.create(
  node,
  createPayload,
  function(err, transactionResp) {
    // error or transaction object
    transaction = transactionResp;
  }
);


// Get a Transaction

Transactions.get(
  node,
  {
    _id: TRANSACTION_ID
  },
  function(err, transactionResp) {
    // error or transaction object
    transaction = transactionResp;
  }
);


// Get All Transactions

let transactions;

Transactions.get(
  node,
  null,
  function(err, transactionsResp) {
    // error or transaction object
    transactions = transactionsResp;
  }
);


// Update Transaction

const updatePayload = {
  comment: 'hi'
};

transaction.update(
  updatePayload,
  function(err, transactionResp) {
    // error or transaction object
    transaction = transactionResp;
  }
);


// Delete Transaction

transaction.delete(function(err, transactionResp) {
    // error or transaction object
    transaction = transactionResp;
  }
);
```
