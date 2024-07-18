import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/oderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
//import '../data/car.js';
//import '../data/backend-practice.js';


async function loadPage() {
  try {
    await Promise.all([loadProductsFetch(), loadCartFetch()]);
    // await loadProductsFetch();
    // loadCartFetch();

    // const value = await new Promise((resolve) => {
    //   loadCart(() => {
    //     resolve('va');
    //   });
    // });
  }

  catch (error) {
    console.log('Unexpected error, try again later!');
  }


  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}
loadPage();


/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value);
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/


/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  });
});
*/


