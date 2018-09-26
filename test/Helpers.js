// 'use strict';
//
// var Clients = require('../lib/Clients.js');
//
// const Helpers = {
//   client: new Clients(process.env.CLIENT_ID, process.env.CLIENT_SECRET, false),
//   ip_address: '127.0.0.1',
//   fingerprint: 'fingerprint',
//   // fill these in with values associated with your own keys
//   user_id: 'userID',
//   // Make sure node_id provided is allowed: "CREDIT-AND-DEBIT" permissions
//   node_id: 'nodeID',
//   // Make sure to_node_id provided has type: 'SYNAPSE-US'
//   to_node_id: 'toNodeID',
//   trans_id: 'transID',
//   subnet_id: 'subnet_id'
// };
//
// module.exports = Helpers;

'use strict';

var Clients = require('../lib/Clients.js');

const Helpers = {
  client: new Clients('client_id_IyzV529B7CUpxZ8bA4Y0Dqj6RKw0muhaLHMcrOJX', 'client_secret_64bxnca0oSOKfNk3QZACVITpvDEMdsJ5R02m1zLW', false),
  ip_address: '127.0.0.1',
  fingerprint: 'c7e516361e6e5453de96223616d73a7b',
  // fill these in with values associated with your own keys
  user_id: '5a84ce8877c19b0064ab2d29',
  // Make sure node_id provided is allowed: "CREDIT-AND-DEBIT" permissions
  node_id: '5a84d4040a6ac8004ca3f6b1',
  // Make sure to_node_id provided has type: 'SYNAPSE-US'
  to_node_id: '5a84ced521bb4900494701b2',
  trans_id: '5a84d547e1ebe8004aa60660',
  subscription_id: '5a8322806da898002266cdc5',
  subnets_id: '5a84d4099b6cb500281120ad'
};

module.exports = Helpers;
