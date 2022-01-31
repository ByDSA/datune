import ParserBottomUp from "./ParserBottomUp";

export default class ParserNode {
  private _objects: any[] | undefined;

  delimiters: number[];

  constructor(private parser: ParserBottomUp) {
    this.delimiters = [];
  }

  // eslint-disable-next-line accessor-pairs
  get objects(): any[] {
    if (!this._objects) {
      this._objects = [];

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
        } catch (e) {
          // ignore
        }

        this._objects.push(obj);
      }
    }

    return this._objects;
  }
}
