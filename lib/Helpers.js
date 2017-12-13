'use strict';

const request = require('superagent');
const mime = require('mime');
const CryptoJS = require('crypto-js');
const _ = require('underscore')._;
const os = require('os');

const Helpers = {

  urlToBase64(url, callback) {
    request
      .get(url)
      .buffer()
      .end((err, res) => {
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

  fileToBase64(filePath, callback) {
    const fs = require('fs');
    fs.statSync(filePath);
    fs.readFile(filePath, (err, original_data) => {
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

  verifyHMAC(client, givenHMAC, object_id) {
    const raw = String(object_id) + '+' + String(client.client_id);
    const hashed = CryptoJS.HmacSHA1(raw, client.client_secret);
    return (hashed === given_hmac);
  },

  getUserIP() {
    return _.chain(os.networkInterfaces())
        .values()
        .flatten()
        .find({family: 'IPv4', internal: false})
        .value()
        .address;
  }
};

module.exports = Helpers;
