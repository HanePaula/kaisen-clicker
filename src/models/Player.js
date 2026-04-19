class Player {
  #id;
  #username;
  #createdAt;

  constructor(id, username, createdAt = new Date()) {
    this.#id = id;
    this.#username = username;
    this.#createdAt = createdAt;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
  }

  get username() {
    return this.#username;
  }

  set username(value) {
    this.#username = value;
  }

  get createdAt() {
    return this.#createdAt;
  }

  set createdAt(value) {
    this.#createdAt = value;
  }
}

module.exports = Player;
