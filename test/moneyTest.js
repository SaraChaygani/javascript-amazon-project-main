import { convertCurrency } from '../scripts/utils/utility.js';
console.log('Test suite: formatCurrency');
console.log('Converts cents into dollars');

if (convertCurrency(2095) === '20.95') {
  console.log('passed');
}
else {
  console.log('failed');
}

console.log('works with 0');
console.log(convertCurrency(0) === '0.00' ? 'passed' : 'failed');

console.log('rounds up to the nearest cent')
console.log(convertCurrency(2000.5) === '20.01' ? 'passed' : 'failed');