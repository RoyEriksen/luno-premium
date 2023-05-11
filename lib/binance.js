import Binance from 'node-binance-api';

import { currencyChosen } from '../index.js';


async function getBinanceBTCPriceInUSD() {
  let binanceCurrency = currencyChosen;
  if (binanceCurrency === "XBT")  {
    binanceCurrency = "BTC";
  }
  const binance = new Binance()
  const binanceTicker = await binance.prices();
  return +binanceTicker[`${binanceCurrency}BUSD`];
}

export { getBinanceBTCPriceInUSD }