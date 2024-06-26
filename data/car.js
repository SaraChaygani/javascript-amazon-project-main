class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo() {

    const trunkStatus = this.isTrunkOpen ? 'Open' : 'Closed';
    console.log(`${this.#brand} - ${this.#model}, Speed: ${this.speed} km/h, Trunk: ${trunkStatus}`);
  }

  go() {
    if (this.isTrunkOpen === false && this.speed < 200) {
      this.speed += 5;
    }
  }

  brake() {
    if (this.speed > 0) {
      this.speed -= 5;
    }
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

const myCar = new Car({ brand: 'Jeep', model: '2025' });
const tesla = new Car({ brand: 'Tesla', model: 'Model 3' });
const toyota = new Car({ brand: 'Toyota', model: 'Corolla' });

myCar.go();
myCar.go();
myCar.go();
myCar.go();
myCar.go();
myCar.displayInfo(); //speed: 25
tesla.go();
tesla.brake();
tesla.go();
tesla.go();
tesla.brake();
tesla.go();
tesla.displayInfo();//speed: 10
toyota.go();
toyota.brake();
toyota.go();
toyota.openTrunk();
console.log(toyota.isTrunkOpen === false ? 'Can\'t open trunk, car is moving!' : 'Trunk is opened');
toyota.displayInfo(); //speed: 0

// console.log(myCar);
// console.log(tesla);
// console.log(toyota);

class RaceCar extends Car {
  acceleration;
  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    if (this.speed < 300) {
      this.speed += this.acceleration;
    }
  }

  openTrunk() {
    console.log('Race cars do not have a trunk')
  }
  closeTrunk() {
    console.log('Race cars do not have a trunk')
  }

  displayInfo() {
    console.log(`${this.brand} - ${this.model}, Speed: ${this.speed} km/h.`);
  }
}

const raceCar2 = new RaceCar({
  brand: 'Formula',
  model: 'model4',
  acceleration: 30
})

raceCar2.go();
raceCar2.go();
raceCar2.displayInfo();