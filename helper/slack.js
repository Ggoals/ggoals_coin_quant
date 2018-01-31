/**
 * Created by 1002720 on 2018. 1. 18..
 */
const _ = require('lodash');
const request = require('request');


class Slack {
  alert(message) {
    return new Promise((resolve) => {
      if (_.isNil(message) || message.length === 0) resolve('no message');

      try {
        request(
          {
            method: 'POST',
            uri: '{{your_url}}',
            headers: {
              'Content-Type': 'application/json'
            },
            form: JSON.stringify({
              "channel": "#{{your_channel}}",
              "text": message.toString('utf8')
            })
          }
          , function (error, response, body) {
            if (error)
              resolve('sending salck error');
            // body is the decompressed response body
            console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
            console.log('the decoded data is: ' + body);
            resolve('success');
          }
        );
      } catch(e) {
        console.log(e);
        resolve('error');
      }


    });
  }
}


module.exports = exports = new Slack();
