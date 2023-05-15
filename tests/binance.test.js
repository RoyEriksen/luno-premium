beforeEach(() => {
  jest.resetModules(); // reset module mocks before each test to not affect other tests in this file
});

test("Returns price if Binance request succeeds", async () => {

  const getBinanceBTCPriceInUSD = require('../lib/binance.js').getBinanceBTCPriceInUSD // your function name could be different
  

  // mocking the entire node-binance-api module
  jest.mock('node-binance-api', () => {
    return class Binance {
      // we use only the prices method for this particular test, so we'll mock just this method
      prices() {
        return new Promise(res => {
          res({
            BTCBUSD: 9
          })
        })
      }
    }
  })

  expect(await getBinanceBTCPriceInUSD("XBT")).toBe(9);
});