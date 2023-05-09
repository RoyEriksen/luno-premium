import { fetchLunoPrice } from './lib/luno.js';
import { convertCurrency } from './exchange-rate.js';
import { getBinanceBTCPriceInUSD } from './lib/binance.js';

async function main() {
    const lunoPrice = await fetchLunoPrice('https://api.luno.com/api/1/ticker?pair=XBTMYR');
    console.log(`BTCMYR price on Luno: MYR ${lunoPrice}`);
    
    const exchangeRate = await convertCurrency();
    console.log(`USDMYR: ${exchangeRate}`);

    const lunoUSD = lunoPrice / exchangeRate;
    console.log(`BTCUSD price on Luno: USD ${lunoUSD}`);

    const binancePrice = await getBinanceBTCPriceInUSD();
    console.log(`BTCUSD price on Binance: USD ${binancePrice}`);

    const priceDifference = lunoUSD - binancePrice;
    console.log(`Price difference: USD ${priceDifference}`);

    const premium = priceDifference / binancePrice;
    const percentage = premium * 100 + "%"
    console.log(`Luno premium: ${percentage}`);
}

main();






// async function main() {
//     await getBinanceBTCPriceInUSD();
// }

