import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
export function convertCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}

export function dateToString(dateString) {
  const date = new Date(dateString);

  const month = date.toLocaleString('default', { month: 'long' });

  const day = date.getDate();

  const formattedDate = `${month} ${day}`;

  return formattedDate;
}