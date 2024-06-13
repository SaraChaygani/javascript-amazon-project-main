import { convertCurrency } from '../../scripts/utils/utility.js';

describe('Test suite: formatCurrency', () => {
  it('Converts cents into dollars', () => {
    expect(convertCurrency(2095)).toEqual('20.95');
  });

  it('Works with 0', () => {
    expect(convertCurrency(0)).toEqual('0.00');
  });

  it('Rounds up to the nearest cents', () => {
    expect(convertCurrency(2000.5)).toEqual('20.01');
  });
});