class Key {
  private signature: number;

  constructor() {
    this.signature = Math.random();
  }

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  private key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door: boolean = false;
  protected key: Key;
  protected tenants: Person[] = [];

  constructor(key: Key) {
    this.key = key;
  }

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      console.log('came into the house');
    } else {
      console.log('door is closed');
    }
  }

  abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log('Door open');
    } else {
      console.log('Wrong key');
    }
  }
}

const key = new Key();
const house = new MyHouse(key);
const person = new Person(key);

const strangerKey = new Key();
const stranger = new Person(strangerKey);

house.openDoor(person.getKey()); // Door open
house.comeIn(person);            // came into the house

house.openDoor(stranger.getKey()); // Wrong key
house.comeIn(stranger);            // door is closed


export {};
