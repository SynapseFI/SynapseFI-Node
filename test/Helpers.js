'use strict';

<<<<<<< HEAD

=======
>>>>>>> 387f5b1a7b3a233ecc39669c27a7e1507991ccd9
var Clients = require('../lib/Clients.js');

const Helpers = {
  client: new Clients(process.env.CLIENT_ID, process.env.CLIENT_SECRET, false),
  ip_address: '127.0.0.1',
<<<<<<< HEAD
  fingerprint: 'c7e516361e6e5453de96223616d73a7b',
  // fill these in with values associated with your own keys
  user_id: '5a29b636baabfc00319bea27',
  // Make sure node_id provided is allowed: "CREDIT-AND-DEBIT" permissions
  node_id: '5a29cbc0f87333003ac3faf8',
  // Make sure to_node_id provided has type: 'SYNAPSE-US' 
  to_node_id: '5a2771782676e7003a574eca',
  trans_id: '5a29d9b4c9ab5b00371241a4',
  subscription_id: '5a2727481d569f51aa32eaf0',
  subnets_id: '5a29d6b6dcfde000221dbf4e'
=======
  fingerprint: 'fingerprint',
  // fill these in with values associated with your own keys
  user_id: 'userID',
  // Make sure node_id provided is allowed: "CREDIT-AND-DEBIT" permissions
  node_id: 'nodeID',
  // Make sure to_node_id provided has type: 'SYNAPSE-US' 
  to_node_id: 'toNodeID',
  trans_id: 'transID'
>>>>>>> 387f5b1a7b3a233ecc39669c27a7e1507991ccd9
};

module.exports = Helpers;
