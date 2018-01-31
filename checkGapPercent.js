/**
 * Created by 1002720 on 2018. 1. 18..
 */

//const request = require('request');
const _ = require('lodash');
const slack = require('./helper/slack');
const CONSTANT = require('./const/constant');

const THRESH_HOLD = CONSTANT.THRESH_HOLD;

// (async function () {
//   //환율 받아오기
//   console.log('gagef');
//   const result = await getExchangeData();
//   const usdkrw = JSON.parse(result).usdkrw;
//
//   console.log(usdkrw);
//
//   //coin 가격 받아오기
//   const coinResult = await getCoinData();
//   const coinData = JSON.parse(coinResult);
//
//   // BTC 25% 이상이면 alert 보내기
//   const krwPerBtc = coinData['RAW']['BTC']['KRW']['PRICE'];
//   const usdPerBtc = coinData['RAW']['BTC']['USD']['PRICE'];
//   const krwPerBtcInUSA = usdPerBtc * usdkrw;
//   const gapPercent = (krwPerBtc / krwPerBtcInUSA) * 100 - 100;
//
//   console.log('coin gap is : ');
//   console.log(gapPercent);
//
//   if(gapPercent > THRESH_HOLD) {
//     let message = '';
//
//     //key is coin Name
//     for ( let key of Object.keys(coinData['RAW']) ) {
//       const krwPerCoin = coinData['RAW'][key]['KRW']['PRICE'];
//       const usdPerCoin = coinData['RAW'][key]['USD']['PRICE'];
//       const krwPerCoinInUSA = Math.round(usdPerCoin * usdkrw * 100) / 100;
//       const gapPercent = Math.round( ((krwPerCoin / krwPerCoinInUSA) * 100 - 100) * 100) / 100;
//
//       const krwPerCoinStr = krwPerCoin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//       const usdPerCoinStr = usdPerCoin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//       const krwPerCoinInUSAStr = krwPerCoinInUSA.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//
//       let coinMsg = `${key} : 한국 : ${krwPerCoinStr}원 , 미국 : ${krwPerCoinInUSAStr}원 = $${usdPerCoinStr}달러  프리미엄 : ${gapPercent}% \n`;
//       message += coinMsg;
//     }
//
//     const success = await slack.alert(`\n\`\`\`${message}\`\`\``);
//     console.log(success);
//   }
//
// })();

function CheckGapPercent() {
  this.execute = async function (usdkrw, coinData) {
    // BTC 25% 이상이면 alert 보내기
    const krwPerBtc = coinData['RAW']['BTC']['KRW']['PRICE'];
    const usdPerBtc = coinData['RAW']['BTC']['USD']['PRICE'];
    const krwPerBtcInUSA = usdPerBtc * usdkrw;
    const gapPercent = (krwPerBtc / krwPerBtcInUSA) * 100 - 100;

    console.log('coin gap is : ');
    console.log(gapPercent);

    if(gapPercent > THRESH_HOLD) {
      let message = '';

      //key is coin Name
      for ( let key of Object.keys(coinData['RAW']) ) {
        const krwPerCoin = coinData['RAW'][key]['KRW']['PRICE'];
        const usdPerCoin = coinData['RAW'][key]['USD']['PRICE'];
        const krwPerCoinInUSA = Math.round(usdPerCoin * usdkrw * 100) / 100;
        const gapPercent = Math.round( ((krwPerCoin / krwPerCoinInUSA) * 100 - 100) * 100) / 100;

        const krwPerCoinStr = krwPerCoin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const usdPerCoinStr = usdPerCoin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const krwPerCoinInUSAStr = krwPerCoinInUSA.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        let coinMsg = `${key} : 한국 : ${krwPerCoinStr}원 , 미국 : ${krwPerCoinInUSAStr}원 = $${usdPerCoinStr}달러  프리미엄 : ${gapPercent}% \n`;
        message += coinMsg;
      }

      const success = await slack.alert(`\n\`\`\`${message}\`\`\``);
      console.log(success);
    }
  }
}

module.exports = exports = new CheckGapPercent();