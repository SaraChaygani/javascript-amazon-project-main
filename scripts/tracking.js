import { getProduct, loadProductsFetch } from "../data/products.js";
import { orders } from "../data/orders.js";
import { dateToString } from "./utils/utility.js";
import { updateCartQuantityHTML } from "../data/cart.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function generateTrackingHTML() {

  await loadProductsFetch();
  const currentUrl = new URL(window.location.href);
  const productId = currentUrl.searchParams.get('productId');
  const orderId = currentUrl.searchParams.get('orderId');

  const matchingProduct = getProduct(productId);
  let orderedProduct;
  let progress;

  orders.forEach(order => {
    if (order.id === orderId) {
      order.products.forEach(Product => {
        if (Product.productId === productId) {
          orderedProduct = Product;
          progress = deliveryProgress(order.orderTime, Product.estimatedDeliveryTime);
          return;
        }
      });
    }
  });
  const html = `<div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dateToString(orderedProduct.estimatedDeliveryTime)}
        </div>

        <div class="product-info">
        ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${orderedProduct.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style = "width:${setProgressBar(progress)}% "></div>
        </div>
      </div>`;
  console.log(progress);
  document.querySelector('.main').innerHTML = html;
  updateCartQuantityHTML();
}
generateTrackingHTML();

function deliveryProgress(orderTime, deliveryTime) {
  const currentDate = dayjs();
  const orderDate = dayjs(orderTime);
  const deliveryDate = dayjs(deliveryTime);
  return ((currentDate - orderDate) / (deliveryDate - orderDate)).toFixed(2) * 100;
}

function setProgressBar(percentage) {
  let progressBar = 1;
  switch (true) {
    case (percentage >= 0 && percentage <= 49):
      progressBar = 20;
      break;
    case (percentage >= 50 && percentage <= 99):
      progressBar = 60;
      break;
    case percentage > 99:
      progressBar = 100;
      break;
  }
  return progressBar;
}


