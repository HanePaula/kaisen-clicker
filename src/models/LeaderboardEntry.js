class LeaderboardEntry {
  #id;
  #playerId;
  #score;
  #efficiency;
  #updatedAt;

  constructor(id, playerId, score, efficiency, updatedAt = new Date()) {
    this.#id = id;
    this.#playerId = playerId;
    this.#score = score;
    this.#efficiency = efficiency;
    this.#updatedAt = updatedAt;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
  }

  get playerId() {
    return this.#playerId;
  }

  set playerId(value) {
    this.#playerId = value;
  }

  get score() {
    return this.#score;
  }

  set score(value) {
    this.#score = value;
  }

  get efficiency() {
    return this.#efficiency;
  }

  set efficiency(value) {
    this.#efficiency = value;
  }

  get updatedAt() {
    return this.#updatedAt;
  }

  set updatedAt(value) {
    this.#updatedAt = value;
  }
}

module.exports = LeaderboardEntry;
