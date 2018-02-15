'use strict';

var Clients = require('../lib/Clients.js');

const Helpers = {
  client: new Clients(process.env.CLIENT_ID, process.env.CLIENT_SECRET, false),
  ip_address: '127.0.0.1',
  fingerprint: 'fingerprint',
  // fill these in with values associated with your own keys
  user_id: 'userID',
  // Make sure node_id provided is allowed: "CREDIT-AND-DEBIT" permissions
  node_id: 'nodeID',
  // Make sure to_node_id provided has type: 'SYNAPSE-US' 
  to_node_id: 'toNodeID',
  trans_id: 'transID',
  subnet_id: 'subnet_id'

};

module.exports = Helpers;
