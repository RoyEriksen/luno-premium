import * as dotenv from 'dotenv';
dotenv.config(); //{ path:'../../luno-premium/.env' }


const toCurrency = "MYR";
const fromCurrency= "USD";
const amount = 1;

var myHeaders = new Headers();
myHeaders.append("apikey",process.env.EX_KEY); 


var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, requestOptions)
.then(response => response.json())
// .then(result => console.log(result.result)) // took this out as impacting output in index.js file
.catch(error => console.log('error',error))

const convertCurrency = async () => {
  try {
    const response = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, requestOptions) 
    const result = await response.json();
    return result.result; 
  } catch (error) {
    console.log('error', error);
  }
}

// convertCurrency().then((result) => {
//   console.log(result);
// });

  export { convertCurrency };