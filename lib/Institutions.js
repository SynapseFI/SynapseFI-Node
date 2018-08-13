const APIClient = require('./APIClient.js');

const Institutions = {
    get(client, callback) {
        const config = {
            client: client
          };    
        path = '/institutions';
        APIClient.get(client.baseUrl + path, config, (err, json) => {
            if (err) {
                callback(err);
            } else {
                callback(null, json);
            }
        });
    } 
}

module.exports = Institutions;
