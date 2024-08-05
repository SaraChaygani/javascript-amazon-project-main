import { cart, addToCart, calculateCartQuantity, updateCartQuantityHTML } from '../data/cart.js';
import { products, loadProducts, loadProductsFetch } from '../data/products.js';
import { convertCurrency } from './utils/utility.js';

//Loarding products into the main page

loadProducts(renderProductsGrid);

function renderProductsGrid() {
  let productsHTML = '';
  products.forEach(product => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>
        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container}">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id ="${product.id}">
          Add to Cart
        </button>
      </div>`;
  });

  updateCartQuantityHTML();

  //Make the add to cart button interactive
  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  document.querySelectorAll('.js-add-to-cart-button')
    .forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        addToCart(productId);
        // cartQuantityElement.innerHTML = calculateCartQuantity();
        updateCartQuantityHTML();
      });
    });
}

//Make search button interactive and get the value from the search bar.

let paramsSearch;
document.querySelector('.js-search-button').addEventListener('click', () => {
  const searchValue = document.querySelector('.js-search-bar').value;
  const url = new URL(window.location);
  paramsSearch = new URLSearchParams(url.search);
  paramsSearch.set('search', searchValue);
  url.search = paramsSearch.toString();
  window.history.pushState({}, '', url);
  const products = searchProducts();
  generateHTMLFilteredProducts(products);
});

function searchProducts() {
  let searchValue = paramsSearch.get('search');
  let filteredProducts;
  if (searchValue) {
    filteredProducts = products.filter(
      product => product.name.toLowerCase()
        .includes(searchValue.toLowerCase() || product.keywords.includes(searchValue.toLowerCase()))
    );
  }
  return filteredProducts;
}


function generateHTMLFilteredProducts(productsList) {
  let productsHTML = '';
  productsList.forEach(product => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>
        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container}">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id ="${product.id}">
          Add to Cart
        </button>
      </div>`;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;
}





