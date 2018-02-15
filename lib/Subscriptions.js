'use strict';

const APIClient = require('./APIClient.js');
const Subscription = require('./Subscription.js');

const Subscriptions = {
  /** Gets all subscriptions or one subscription (if given subscriptionId)
    * @param client [object] : contains client_id, client_secret, is_production
    * @param options [object] e.g. (if getting one subscription) 
                                const options = {
                                  _id: SUBSCRIPTION_ID
                                };
                              e.g. (if getting all subscriptionss)
                                const options = {
                                  page: '', //optional
                                  per_page: '', //optional
                                  query: '' //optional
                                };
    * @param callback [function] 
        e.g. function(error, subscriptionObj) {
          // do something 
        }
  **/

  get(client, options, callback) {
    const config = {
      client: client
    };
    let url = `${client.baseUrl}/subscriptions`;
    if (options) {
      // if subscription_id provided
      if (options._id) {
        url += '/' + options._id;
      }
    }
    APIClient.get(url, config, (err, json) => {
      if (err) {
        callback(err);
      } else {
        if (json.subscriptions) {
          callback(null, json);
        } else {
          callback(null, new Subscription(client, json));
        }
      }
    });
  },

  /** Create a subscription
    * @param client [Object]
    * @param payload [Object] : Look at docs for format (https://docs.synapsepay.com/docs/create-subscription)
    * @param callback [function(error, subscriptionResponseObj)]
  **/
  create(client, payload, callback) {
    const config = {
      client: client
    };
    let url = `${client.baseUrl}/subscriptions`;
    APIClient.post(url, config, payload, (err, json) => {
      if (err) {
        callback(err);
      } else {
        callback(null, new Subscription(client, json));
      }
    });
  }
};

module.exports = Subscriptions;