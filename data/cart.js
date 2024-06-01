export const cart = [];
//Adding items to cart id the items doesn't exist, otherwise, increase the quantity of the item if it already exists.
export function addToCart(productId) {
  let matchingItem;
  const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
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
      quantity
    });
  }
}