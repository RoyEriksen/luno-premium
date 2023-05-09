fetch('https://api.binance.com/api/v3/ticker/bookTicker')
  .then(response => response.json())
  .then(data => {
    for (let ticker of data) {
      console.log(ticker.symbol);
    }
  })
  .catch(error => console.error(error));


