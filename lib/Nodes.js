'use strict';

const APIClient = require('./APIClient.js');
const Node = require('./Node.js');

const Nodes = {

  /** Get all nodes or get info on single node (if node_id provided)
    * @param user [Object]
    * @param options [Object] : can be null (if getting all nodes) or
                                (if getting info on single node)
                                { _id: node_id,
                                full_dehydrate: 'yes' //optional }
    * @param callback [function(error, nodeResponseObject)]
  **/
  get(user, options, callback) {
    const config = {
      client: user.client,
      ip_address: user.ip_address,
      fingerprint: user.fingerprint,
      oauth_key: user.oauth_key
    }
    let url = user.json._links.self.href + '/nodes';

    if (options) {
      // if node_id provided
      if (options._id) {
        url += '/' + options._id;
        const idParams = [];

        if (options.force_refresh) {
          idParams.push(`force_refresh=${options.force_refresh}`);
        }
        if (options.full_dehydrate) {
          idParams.push(`full_dehydrate=${options.full_dehydrate}`);
        }
        if (idParams.length > 0) {
          url += `?${idParams.join('&')}`;
        }

        APIClient.get(url, config, (err, json) => {
          if (err) {
            callback(err);
          } else {
            callback(null, new Node(user, json));
          }
        });
      } else {
        const params = [];

        if (options.page) {
          params.push(`page=${options.page}`);
        }
        if (options.per_page) {
          params.push(`per_page=${options.per_page}`);
        }
        if (options.type) {
          params.push(`type=${options.type}`);
        }
        if (params.length > 0) {
          url += `?${params.join('&')}`;
        }

        APIClient.get(url, config, (err, json) => {
          if (err) {
            callback(err);
          } else {
            callback(null, json);
          }
        });
      }
    } else {
      APIClient.get(url, config, (err, json) => {
        if (err) {
          callback(err);
        } else {
          callback(null, json);
        }
      });
    }
  },

  /** Create a node associated w/ a user
    * @param user [Object]
    * @param payload [Object] : different depending on node type
        Look at docs for details on format (https://docs.synapsepay.com/docs/add-ach-us-node)
      @param callback -> function(error, nodeResponseObject)
  **/
  create(user, payload, callback) {
    const config = {
      client: user.client,
      ip_address: user.ip_address,
      fingerprint: user.fingerprint,
      oauth_key: user.oauth_key
    };

    if (payload.idempotency_key) {
      config.idempotency_key = payload.idempotency_key;
      delete payload.idempotency_key;
    }

    const url = user.json._links.self.href + '/nodes';
    
    APIClient.post(url, config, payload, (err, json) => {
      if (err) {
        callback(err);
      } else {
        if (json.nodes) {
          const nodes = [];
          for (let i = 0; i < json.nodes.length; i++) {
            nodes.push(new Node(user, json.nodes[i]));
          }
          callback(null, nodes);
        } else {
          callback(null, json);
        }
      }
    });
  }
};

module.exports = Nodes;
