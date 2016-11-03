'use strict';

var Clients = require('../lib/Clients.js');

const Helpers = {
  client: new Clients(process.env.CLIENT_ID, process.env.CLIENT_SECRET, false),
  ip_address: '127.0.0.1',
  fingerprint: process.env.FINGERPRINT,
  // fill these in with values associated with your own keys
  user_id: '57f9a1a786c27334da6a48b6',
  node_id: '57ec57be86c27345b3f8a159',
  to_node_id: '57f4241d86c27331523e2f26',
  trans_id: '57fc1a6886c2732e64a94c25'
};

module.exports = Helpers;
