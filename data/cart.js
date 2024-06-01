
export let cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
},
{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];
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

//Deleting items from the cart and generating updated HTML with updated Cart.
export function removeFromCart(productId) {
  let newCart = [];
  cart.forEach(cartItem => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  //console.log(cart);
  // //Finding the items to delete based on dataset product id peovided by the delete clicked link.
  // console.log(cart);
  // let matchingItemIndex = -1;
  // cart.forEach((cartItem, index) => {
  //   //console.log('inside cart.foreach')
  //   if (cartItem.productId === productId) {
  //     //console.log('inside if product id == productId')
  //     matchingItemIndex = index;
  //   }
  // });
  // //console.log(matchingItemIndex);
  // //If a matching item has been found, get it's index and delete it from the cart then generate the updated cart again.
  // if (matchingItemIndex >= 0) {
  //   cart.splice(matchingItemIndex, 1);
  //   console.log('deleted');
  //   console.log(cart);
  // }
}