import { loadFromLocalStorage, cart } from "../../data/cart.js";
import { renderOrderSummary } from "../../scripts/checkout/oderSummary.js";
import { loadProducts } from "../../data/products.js";

describe('test suite: RenderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  //USING HOOKS

  beforeAll((done) => {
    loadProducts(done);
  });
  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `<div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="js-checkout-header-middle-section"></div>`;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadFromLocalStorage();
    renderOrderSummary();
  });

  //after each hook
  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('displays the cart', () => {
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');

    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');
  });

  it('removes a product', () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

    //Check: deleted product is no longer displayed on the page.
    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);

    //Check that the second product is still on the page.
    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);

    //Check if the mocked cart is updated correctly.
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });

  it('updates delivery options.', () => {
    document.querySelector(`.js-delivery-option-${cart[0].productId}-3`).click();

    expect(document.querySelector(`.js-delivery-option-input-${cart[0].productId}-3`).checked).toEqual(true);

    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual('3');
  });
});