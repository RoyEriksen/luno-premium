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

const askForCurrency = async() => {
    while(true) {
    let currencyChosen = await getUserInput("Please input what crypto currency do you want to check? (XBT, ETH, LTC, XRP). Hit 'e' to exit. ");
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


async function main() {
    const currencySelected = await askForCurrency();
    const lunoPrice = await fetchLunoPrice(`https://api.luno.com/api/1/ticker?pair=${currencySelected}MYR`);
    const lunoPriceNum = parseFloat(lunoPrice)
    const lunoPriceStr = `MYR ${lunoPriceNum.toFixed(2)}`;
    const usdMYR = (await convertCurrency()).toFixed(6);
    const lunoUSD = lunoPrice / await convertCurrency();
    const lunoUSDStr = lunoUSD.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
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
    

    console.log((`BTCMYR price on Luno: ${lunoPriceStr}`).padStart(maxLength));
    console.log((`USDMYR: ${usdMYR}`).padStart(maxLength));
    console.log((`BTCUSD price on Luno: USD ${lunoUSDStr}`).padStart(maxLength));
    console.log((`BTCUSD price on Binance: USD ${binancePriceStr}`).padStart(maxLength));
    console.log((`Price difference: USD ${priceDifference}`).padStart(maxLength));
    console.log((`Luno premium: ${premium}%`).padStart(maxLength));

    process.exit();
}


main();


