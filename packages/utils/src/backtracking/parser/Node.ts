import { ParserBottomUp } from "./ParserBottomUp";

export class ParserNode {
    private _objects: any[] | undefined;

    delimiters: number[];

    constructor(private parser: ParserBottomUp) {
        this.delimiters = [];
    }

    get objects(): any[] {
        if (!this._objects) {
            this._objects = [];
            for (let delimiterNumber = 0; delimiterNumber < this.delimiters.length - 1; delimiterNumber++) {
                let delimiterLeft = this.delimiters[delimiterNumber];
                let delimiterRight = this.delimiters[delimiterNumber + 1];

                let obj = null;
                try {
                    const str = this.parser.expectedTypes[delimiterNumber];
                    obj = this.parser.table[str](this.parser.fromString.substr(delimiterLeft, delimiterRight - delimiterLeft));
                } catch (e) {
                }

                this._objects.push(obj);
            }
        }

        return this._objects;
    }
}