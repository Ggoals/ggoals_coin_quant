/**
 * Created by 1002720 on 2018. 1. 28..
 */
const request = require('request');

class Coin {
  getData() {
    return new Promise((resolve) => {
      try {
        request(
          {
            method: 'GET',
            uri: 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,ETC,XRP,LTC,DASH,BCH,XMR,QTUM,ZEC,BTG&tsyms=BTC,KRW,BTC,USD',
            headers: {
              'Accept': 'application/json, text/javascript, */*; q=0.01'
            }
          }
          , function (error, response, body) {
            if (error)
              resolve('sending salck error');
            // body is the decompressed response body
            console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
            console.log('the decoded data is: ' + body);
            resolve(body);
          }
        );
      } catch(e) {
        console.log(e);
        resolve('error');
      }


    });
  }
}

module.exports = exports = new Coin();