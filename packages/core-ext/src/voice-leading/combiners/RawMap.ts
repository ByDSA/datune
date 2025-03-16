export abstract class RawMap<T, RAW, K> {
  #map: Map<K, RAW[]> = new Map();

  protected abstract getObjId(obj: T): K;

  add(obj: T, raw: RAW) {
    const id = this.getObjId(obj);
    let array = this.#map.get(id);

    if (!array) {
      array = [];
      this.#map.set(id, array);
    }

    array.push(raw);
  }

  get(obj: T): RAW[] | undefined {
    const id = this.getObjId(obj);

    return this.#map.get(id);
  }

  has(obj: T): boolean {
    const id = this.getObjId(obj);

    return this.#map.has(id);
  }

  entries() {
    return [...this.#map.entries()];
  }
}
