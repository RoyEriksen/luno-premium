// import Binance from 'node-binance-api';

// export async function getBinanceBTCPriceInUSD() { // notice export keyword here. this is called a NAMED export
//   const binance = new Binance()
//   const binanceTicker = await binance.prices();
//   return +binanceTicker.BTCBUSD
// }

import Binance from 'node-binance-api';

async function getBinanceBTCPriceInUSD() {
  const binance = new Binance()
  const binanceTicker = await binance.prices();
  // console.log(binanceTicker.BTCUSD);
  return +binanceTicker.BTCBUSD;
}


// getBinanceBTCPriceInUSD()
//   .then(price => {
//   }).catch(error => {
//     console.error(error);
//   });
  

export { getBinanceBTCPriceInUSD }