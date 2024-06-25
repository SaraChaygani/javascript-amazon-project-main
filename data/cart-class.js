class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromLocalStorage();
  }

  #loadFromLocalStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    if (!this.cartItems) {
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;
    this.cartItems.forEach(cartItem => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    }
    else {
      this.cartItems.push({
        productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    let newCart = [];
    this.cartItems.forEach(cartItem => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    cart = newCart;
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0
    this.cartItems.forEach(item => {
      cartQuantity += item.quantity;
    });
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    let checkoutQuantityElement = document.querySelector('.js-checkout-quantity');
    this.cartItems.forEach(cartItem => {
      if (cartItem.productId == productId) {
        cartItem.quantity = newQuantity;
      }
    });
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
    checkoutQuantityElement.innerHTML = `Checkout (${calculateCartQuantity()} items)`;
    document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
    saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach(cartItem => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }
}

