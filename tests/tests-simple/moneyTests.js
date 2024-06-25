import { convertCurrency } from "../../scripts/utils/utility.js";

//16a
describe('test suite: ConvertCurrency', () => {

  //Test case: round down to the nearest cent.
  it('Rounds down to the nearest cent.', () => {
    expect(convertCurrency(2000.4)).toEqual('20.00');
  });

  //Test case: Test negative numbers
  it('Works with negative numbers.', () => {
    expect(convertCurrency(-1292.8)).toEqual('-12.93');
  });
});