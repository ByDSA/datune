import type { Key } from "./building/id";

export class Quality {
  private shortName: string;

  private constructor(key: Key) {
    this.shortName = key;
  }

  toString() {
    return this.shortName;
  }
}
