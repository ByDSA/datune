import ParserBottomUp from "./ParserBottomUp";

export default class ParserNode {
  #objects: unknown[] | undefined;

  delimiters: number[];

  constructor(private parser: ParserBottomUp) {
    this.delimiters = [];
  }

  // eslint-disable-next-line accessor-pairs
  get objects(): unknown[] {
    if (!this.#objects) {
      this.#objects = [];

      for (
        let delimiterNumber = 0;
        delimiterNumber < this.delimiters.length - 1;
        delimiterNumber++
      ) {
        const delimiterLeft = this.delimiters[delimiterNumber];
        const delimiterRight = this.delimiters[delimiterNumber + 1];
        let obj = null;

        try {
          const str = this.parser.expectedTypes[delimiterNumber];

          obj = this.parser.table[str](
            this.parser.fromString.substr(delimiterLeft, delimiterRight - delimiterLeft),
          );
        } catch {
          // ignore
        }

        this.#objects.push(obj);
      }
    }

    return this.#objects;
  }
}
