const request = require('superagent');
const mime = require('mime');
const CryptoJS = require('crypto-js');
const _ = require('underscore')._;
const os = require('os');

const Helpers = {

  urlToBase64: function(url, callback) {
    request
      .get(url)
      .buffer()
      .end(function(err, res) {
        if (err) {
          callback(new Error('Could not download file.'));
        } else {
          const fileType = res.headers['content-type'];
          const base64 = new Buffer(res.body, 'binary').toString('base64');
          const dataURI = 'data:' + fileType + ';base64,' + base64;
          callback(null, dataURI);
        }
      });
  },

  fileToBase64: function(filePath, callback) {
    const fs = require('fs');
    fs.statSync(filePath);
    fs.readFile(filePath, function(err, original_data) {
      if (err) {
        callback(err);
      } else {
        const fileType = mime.lookup(filePath);
        const base64 = new Buffer(original_data, 'binary').toString('base64');
        const dataURI = 'data:' + fileType + ';base64,' + base64;
        callback(null, dataURI);
      }
    });
  },

  verifyHMAC: function(client, givenHMAC, object_id) {
    const raw = String(object_id) + '+' + String(client.client_id);
    const hashed = CryptoJS.HmacSHA1(raw, client.client_secret);
    return (hashed === given_hmac);
  },

  getUserIP: function() {
    return _.chain(os.networkInterfaces())
        .values()
        .flatten()
        .find({family: 'IPv4', internal: false})
        .value()
        .address;
  }
};

module.exports = Helpers;
