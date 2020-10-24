import { Backtracking } from './Backtracking';

export class ParserBottomUp {
    table: ((str: string) => any)[] = [];
    expectedTypes: string[] = [];
    fromString: string;

    add(name, f: (str: string) => any): ParserBottomUp {
        this.table[name] = f;

        return this;
    }

    expected(expectedTypes: string[]): ParserBottomUp {
        this.expectedTypes = expectedTypes;

        return this;
    }

    from(str: string): ParserBottomUp {
        this.fromString = str;

        return this;
    }

    parse(): any[] {
        let process = new ParsingProcess();
        process.start(this);

        if (!process.result)
            return null;

        return process.result.objects;
    }
}

class Node {
    private _objects: any[];

    delimiters: number[];

    constructor(private parser: ParserBottomUp) {
    }

    get objects(): any[] {
        if (!this._objects) {
            this._objects = [];
            for (let delimiterNumber = 0; delimiterNumber < this.delimiters.length - 1; delimiterNumber++) {
                let delimiterLeft = this.delimiters[delimiterNumber];
                let delimiterRight = this.delimiters[delimiterNumber + 1];

                let obj = null;
                try {
                    obj = this.parser.table[this.parser.expectedTypes[delimiterNumber]](this.parser.fromString.substr(delimiterLeft, delimiterRight - delimiterLeft));
                } catch (e) {
                }

                this._objects.push(obj);
            }
        }

        return this._objects;
    }
}

class ParsingProcess extends Backtracking<ParserBottomUp, Node> {
    protected root(P: ParserBottomUp): Node {
        let node = new Node(P);
        node.delimiters = [0];
        return node;
    }

    protected reject(P: ParserBottomUp, c: Node): boolean {
        if (this._result)
            return true;

        if (c.delimiters.length <= P.expectedTypes.length)
            return false;

        for (let obj of c.objects)
            if (!obj)
                return true;

        return false;
    }

    protected accept(P: ParserBottomUp, c: Node): boolean {
        if (c.delimiters.length - 1 == P.expectedTypes.length && c.objects.length == P.expectedTypes.length)
            return true;
    }

    protected first(P: ParserBottomUp, c: Node): Node {
        let newNode = new Node(P);

        newNode.delimiters = Array.from(c.delimiters);

        if (newNode.delimiters.length - 1 > P.expectedTypes.length)
            return null;

        newNode.delimiters.push(P.fromString.length);

        return newNode;
    }

    protected next(P: ParserBottomUp, c: Node): Node {
        let newNode = new Node(P);

        newNode.delimiters = Array.from(c.delimiters);
        newNode.delimiters[newNode.delimiters.length - 1]--;

        if (newNode.delimiters[newNode.delimiters.length - 1] < newNode.delimiters[newNode.delimiters.length - 2])
            return null;

        return newNode;
    }

    protected output(P: ParserBottomUp, c: Node): void {
        this._result = c;
    }


    private _result: Node = null;

    get result(): Node {
        return this._result;
    }
}