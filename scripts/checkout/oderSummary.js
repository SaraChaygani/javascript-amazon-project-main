import { calculateCartQuantity, cart, removeFromCart, updateQuantity, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { convertCurrency } from '../utils/utility.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';



// const today = dayjs();
// const deliveryDate = today.add(7, 'day');
// console.log(deliveryDate.format('dddd, MMMM D'));

//Generate the HTML FOR THE CHECKOUT PAGE
export function renderOrderSummary() {

  let cartSummaryHTML = '';
  cart.forEach(cartItem => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateDelivery = dayjs().add(deliveryOption.deliveryDays, 'day');
    const dateString = dateDelivery.format('dddd, MMMM D');

    cartSummaryHTML += ` <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>
    
        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">
    
          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${convertCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id= ${matchingProduct.id}>
                Update
              </span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id= ${matchingProduct.id}>Save</span>
              <span class="delete-quantity-link link-primary js-delete-link"  data-product-id= ${matchingProduct.id}>
                Delete
              </span>
            </div>
          </div>
    
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
      `;
  });


  //DELIVERY OPTIONS
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach(deliveryOption => {
      //Getting the delvery date for each option
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
      const deliveryDateString = deliveryDate.format('dddd, MMMM D');

      //Getting the price for each option
      const shippingFee = deliveryOption.priceCents === 0 ? 'FREE' : `$${convertCurrency(deliveryOption.priceCents)} - `;

      //Retreiving the checked option
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += `<div class="delivery-option js-delivery-option"
      data-product-id ="${matchingProduct.id}" data-delivery-option-id ="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}  
          class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${deliveryDateString}
            </div>
            <div class="delivery-option-price">
              ${shippingFee} Shipping
            </div>
          </div>
        </div>`;
    });
    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
  // let checkoutQuantityElement = document.querySelector('.js-checkout-quantity');
  // checkoutQuantityElement.innerHTML = `Checkout (${calculateCartQuantity()} items)`;

  document.querySelectorAll('.js-delete-link')
    .forEach(link => {
      link.addEventListener('click', () => {
        const { productId } = link.dataset;
        removeFromCart(productId);
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        // checkoutQuantityElement.innerHTML = `Checkout (${calculateCartQuantity()} items)`;
      });
    });

  document.querySelectorAll('.js-delivery-option').
    forEach(deliveryOption => {
      deliveryOption.addEventListener('click', () => {
        const { productId, deliveryOptionId } = deliveryOption.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });

  // checkoutQuantityElement.innerHTML = `Checkout (${calculateCartQuantity()} items)`;

  //Retrieve the product that's being edited when clicking on update
  document.querySelectorAll('.js-update-quantity-link')
    .forEach(link => {
      const { productId } = link.dataset;
      link.addEventListener('click', () => {
        document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
      });
    });


  //ADD EVENT LISTENER TO ALL SAVE LINKS
  document.querySelectorAll('.js-save-quantity-link')
    .forEach(saveLink => {
      const { productId } = saveLink.dataset;
      saveLink.addEventListener('click', () => {
        const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
        if (newQuantity > 0 && newQuantity < 1000) {
          updateQuantity(productId, newQuantity);
        }
        else {
          document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
        }
      });
    });

  //WHEN THE USERS ENTERS A QUANTITY <=0 OR >1000 AN ALERT MESSAGE DISPLAYS BELOW.

  document.querySelectorAll('.js-update-quantity-link')
    .forEach(updateLink => {
      const { productId } = updateLink.dataset;
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      const alertElement = document.createElement('p');
      const parentElement = document.querySelector(`.js-product-quantity-${productId}`);

      const quantityInputElement = document.querySelector(`.js-quantity-input-${productId}`);
      quantityInputElement.addEventListener('keyup', (event) => {
        const quantityInputValue = parseInt(quantityInput.value);

        if (quantityInputValue <= 0 || quantityInputValue > 1000) {
          alertElement.textContent = 'The quantity can not be less than 0 or greater than 1000!';
          alertElement.classList.add('alert-message');
          parentElement.appendChild(alertElement);
        }
        else {
          if (parentElement.contains(alertElement)) {
            parentElement.removeChild(alertElement);
          }
          if (event.key === 'Enter') {
            if (!isNaN(quantityInputValue)) {
              updateQuantity(productId, quantityInputValue);
            } else {
              document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
            }
          }
        }
      });
    });
}
