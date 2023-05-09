import dotenv from 'dotenv';
dotenv.config();

const toCurrency = "USD";
const fromCurrency= "MYR";
const amount = 1;

var myHeaders = new Headers();
myHeaders.append("apikey","WVQq14uKVBelFPJWbnxkw7uqM17PcMjX"); 

console.log(process.env.API_KEY);

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));