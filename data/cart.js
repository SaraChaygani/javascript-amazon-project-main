export let cart = JSON.parse(localStorage.getItem('cart')) || [];

// loadFromLocalStorage();

// export function loadFromLocalStorage() {
//   cart = JSON.parse(localStorage.getItem('cart'));
//   if (!cart) {
//     cart = [{
//       productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//       quantity: 2,
//       deliveryOptionId: '1'
//     },
//     {
//       productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
//       quantity: 1,
//       deliveryOptionId: '2'
//     }];
//   }
// }
export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
//Adding items to cart id the items doesn't exist, otherwise, increase the quantity of the item if it already exists.
export function addToCart(productId) {
  let matchingItem;
  let quantity = 1;
  let selectedQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
  // quantity = !selectedQuantity ? Number(selectedQuantity.value) : 1;

  if (selectedQuantity !== null) {
    quantity = Number(selectedQuantity.value);
  }

  cart.forEach(cartItem => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  }
  else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
  console.log(cart);
}

//Deleting items from the cart and generating updated HTML with updated Cart.
export function removeFromCart(productId) {
  let newCart = [];
  cart.forEach(cartItem => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

//Calculate cart quantity
export function calculateCartQuantity() {
  let cartQuantity = 0
  cart.forEach(item => {
    cartQuantity += item.quantity;
  });
  return cartQuantity;
}

//update quantity function
export function updateQuantity(productId, newQuantity) {
  let checkoutQuantityElement = document.querySelector('.js-checkout-quantity');
  cart.forEach(cartItem => {
    if (cartItem.productId == productId) {
      cartItem.quantity = newQuantity;
    }
  });
  document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
  checkoutQuantityElement.innerHTML = `Checkout (${calculateCartQuantity()} items)`;
  document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
  saveToStorage();
}

//Update the delivery options
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach(cartItem => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

//Using fetch to load CART
export async function loadCartFetch() {
  const response = await fetch('https://supersimplebackend.dev/cart');
  const fetchedCart = await response.text();
  console.log(fetchedCart);
}

//update cart quantity html when a new item is added
export function updateCartQuantityHTML() {
  let cartQuantityElement = document.querySelector('.js-cart-quantity');
  cartQuantityElement.innerHTML = calculateCartQuantity();
}