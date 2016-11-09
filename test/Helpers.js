'use strict';

var Clients = require('../lib/Clients.js');

const Helpers = {
  client: new Clients(process.env.CLIENT_ID, process.env.CLIENT_SECRET, false),
  ip_address: '127.0.0.1',
  fingerprint: process.env.FINGERPRINT,
  // fill these in with values associated with your own keys
  user_id: '57f9a1a786c27334da6a48b6',
  // Make sure node_id provided is allowed: "CREDIT-AND-DEBIT" permissions
  node_id: '581d174686c2736ec26a497a',
  // Make sure to_node_id provided has type: 'SYNAPSE-US' 
  to_node_id: '581d17dc86c2736d032906d6',
  trans_id: '5820db7986c273586b9f228a'
};

module.exports = Helpers;
