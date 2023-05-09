async function fetchLunoPrice(url) {
    const response = await fetch(url);
    const data = await response.json();
    const price = parseFloat(data.last_trade);
    return price.toFixed(2);  
  }
  
  fetchLunoPrice('https://api.luno.com/api/1/ticker?pair=XBTMYR')
    .then(price => {
  }).catch(error => {
    console.error(error);
  });
  
  export { fetchLunoPrice }