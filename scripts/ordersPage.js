import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { dateToString, convertCurrency } from "./utils/utility.js";
import { cart } from "../data/cart.js";


async function generateOrdersHTML() {

  await loadProductsFetch();

  let html = '';

  orders.forEach(order => {
    html += `<div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dateToString(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${convertCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
            <div class="order-details-grid">`;

    order.products.forEach(orderedProduct => {
      const matchingProduct = getProduct(orderedProduct.productId);

      html += ` 
              <div class="product-image-container">
                <img src="${matchingProduct.image}">
              </div>

              <div class="product-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-delivery-date">
                  Arriving on: ${dateToString(orderedProduct.estimatedDeliveryTime)}
                </div>
                <div class="product-quantity">
                  Quantity: ${orderedProduct.quantity}
                </div>
                <button class="buy-again-button button-primary">
                  <img class="buy-again-icon" src="images/icons/buy-again.png">
                  <span class="buy-again-message">Buy it again</span>
                </button>
              </div>

              <div class="product-actions">
                <a href="tracking.html">
                  <button class="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>

          `;
    });
    html += `</div></div>`;
    document.querySelector('.js-orders-grid').innerHTML = html;
  });
}

generateOrdersHTML();


