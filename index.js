import * as readline from 'readline';

import { fetchLunoPrice } from './lib/luno.js';
import { convertCurrency } from './exchange-rate.js';
import { getBinanceBTCPriceInUSD } from './lib/binance.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getUserInput = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};

let currencyChosen;

const askForCurrency = async() => {
    while(true) {
    currencyChosen = await getUserInput("Please input what crypto currency do you want to check? (XBT, ETH, LTC, XRP). Hit 'e' to exit. ");
    currencyChosen = currencyChosen.toUpperCase(); // convert input to uppercase 

    if (currencyChosen === "E") {
        console.log("Goodbye")
            process.exit();
            }    
    else if (!['XBT', 'ETH', 'LTC', 'XRP'].includes(currencyChosen)) {
        console.log('Invaid input. Please enter one of XBT, ETH, LTC, XRP, or "e" to exit. ');
        }
    
    else {
        return currencyChosen;
        }
    }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MAX_REQUESTS_PER_SECOND = 15;
const delayTime = 1000 / MAX_REQUESTS_PER_SECOND;

async function main() {
    const currencySelected = await askForCurrency();
    const delayTime = 1000 / MAX_REQUESTS_PER_SECOND;
    const lunoPrice = await fetchLunoPrice(`https://api.luno.com/api/1/ticker?pair=${currencySelected}MYR`);
    await delay(delayTime);
    const lunoPriceNum = parseFloat(lunoPrice)
    const lunoPriceStr = `MYR ${lunoPriceNum.toFixed(2)}`;
    const usdMYR = (await convertCurrency()).toFixed(6);
    await delay(delayTime);
    const lunoUSD = lunoPrice / await convertCurrency();
    const lunoUSDStr = lunoUSD.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    await delay(delayTime)
    const binancePrice = await getBinanceBTCPriceInUSD();
    const binancePriceStr = binancePrice.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const priceDifference = (lunoUSD - binancePrice).toFixed(2);
    const premium = ((lunoUSD / binancePrice - 1) * 100).toFixed(2);

    
    const lunoPriceStrLength = (`BTCMYR price on Luno: ${lunoPriceStr}`).length;
    const usdMYRLength = (`USDMYR: ${usdMYR}`).length;
    const lunoUSDStrLength = (`BTCUSD price on Luno: USD ${lunoUSDStr}`).length;
    const binancePriceStrLength = (`BTCUSD price on Binance: USD ${binancePriceStr}`).length;
    const priceDifferenceLength = (`Price difference: USD ${priceDifference}`).length;
    const premiumLength = (`Luno premium: ${premium}`).length;

    const maxLength = Math.max(
        lunoPriceStrLength,
        usdMYRLength,
        lunoUSDStrLength,
        binancePriceStrLength,
        priceDifferenceLength,
        premiumLength
    );
    

    console.log((`${currencyChosen}MYR price on Luno: `).padEnd(maxLength) + `${lunoPriceStr}`);
    console.log(('USDMYR: ').padEnd(maxLength) + `${usdMYR}`);
    console.log((`${currencyChosen}USD price on Luno: `).padEnd(maxLength) + `USD ${lunoUSDStr}`);
    console.log((`${currencyChosen}USD price on Binance: `).padEnd(maxLength) + `USD ${binancePriceStr}`);
    console.log(('Price difference: ').padEnd(maxLength) + `USD ${priceDifference}`);
    console.log(('Luno premium: ').padEnd(maxLength) + `${premium}%`);

    process.exit();
}

main();

export { currencyChosen };


