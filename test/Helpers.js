'use strict';

var Clients = require('../lib/Clients.js');

const Helpers = {
  client: new Clients('client_id_2bb1e412edd311e6bd04e285d6015267', 'client_secret_2bb1e714edd311e6bd04e285d6015267', false),
  ip_address: '127.0.0.1',
  fingerprint: 'e83cf6ddcf778e37bfe3d48fc78a6502062fc1030449628c699ef3c4ffa6f9a2000b8acc3c4c0addd8013285bb52c89e5267b628ca02fa84a6d71fe186b7cd5d',
  // fill these in with values associated with your own keys
  user_id: '592f1dfa8384540026e39a95',
  // Make sure node_id provided is allowed: "CREDIT-AND-DEBIT" permissions
  node_id: '592f1e2d603964002f1b07f7',
  // Make sure to_node_id provided has type: 'SYNAPSE-US' 
  to_node_id: '592f1e5c4d1d62002fe19347',
  trans_id: '5930b3ee7658de0026e8cf23'
};

module.exports = Helpers;
