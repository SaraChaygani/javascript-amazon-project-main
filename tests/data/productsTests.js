import { Product, Clothing, Appliance } from '../../data/products.js';

//Suite test: Parent class --> product class
describe('Test suite: Product class', () => {
  it('Generates new product', () => {
    const product = new Product({
      id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ]
    });
    expect(product instanceof Product).toEqual(true);
    expect(product.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(product.getStarsUrl()).toEqual(`images/ratings/rating-${product.rating.stars * 10}.png`);
    expect(product.getPrice()).toEqual('$10.90');
    expect(product.extraInfoHTML()).toEqual('');
  });
});

//Suite test : child class --> Clothing class
describe('Test suite: Clothing class', () => {
  it('Generates new product class of type Clothing.', () => {
    const clothing = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      keywords: [
        "tshirts",
        "apparel",
        "mens"
      ]
    });

    expect(clothing instanceof Product).toEqual(true);
    expect(clothing.extraInfoHTML()).toContain(
      'Size Chart');
  });
});

//Suite test: child class ---> Appliance class.
describe('Test suite: Appliance class', () => {
  it('Generates new product class of type Appliance.', () => {
    const appliance = new Appliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899,
      keywords: [
        "toaster",
        "kitchen",
        "appliances"
      ]
    });

    expect(appliance instanceof Product).toEqual(true);
    expect(appliance.extraInfoHTML()).toContain('Warranty');
    expect(appliance.extraInfoHTML()).toContain('Instructions');
  });

});

