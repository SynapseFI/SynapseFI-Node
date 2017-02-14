'use strict';

var Clients = require('../lib/Clients.js');

const Helpers = {
  client: new Clients(process.env.CLIENT_ID, process.env.CLIENT_SECRET, false),
  ip_address: '127.0.0.1',
  fingerprint: process.env.FINGERPRINT,
  // fill these in with values associated with your own keys
  user_id: '57f9421186c2737c5820d29e',
  // Make sure node_id provided is allowed: "CREDIT-AND-DEBIT" permissions
  node_id: '57fae3cf86c273223be199a3',
  // Make sure to_node_id provided has type: 'SYNAPSE-US' 
  to_node_id: '57fb13b686c27351ae7bd8c1',
  trans_id: '588aaf4486c2730bf932dd54'
};

module.exports = Helpers;
