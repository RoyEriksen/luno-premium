const MOCK_PRICE = "99.00"
const MOCK_JSON_RESP = { last_trade: MOCK_PRICE }

// we're modifying the fetch method to return these values
global.fetch = jest.fn(() => Promise.resolve({
  status: 200,
  json: () => Promise.resolve(MOCK_JSON_RESP)
}));

import { fetchLunoPrice } from '../lib/luno.js'

test("Returns the BTC Price if successful", async () => {
  expect(await fetchLunoPrice()).toBe(MOCK_PRICE);
});

