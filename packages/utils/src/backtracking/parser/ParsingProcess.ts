import { Backtracking } from '../Backtracking';
import { ParserNode } from './Node';
import { ParserBottomUp } from './ParserBottomUp';

export class ParsingProcess extends Backtracking<ParserBottomUp, ParserNode> {
    protected root(P: ParserBottomUp): ParserNode {
        let node = new ParserNode(P);
        node.delimiters = [0];
        return node;
    }

    protected reject(P: ParserBottomUp, c: ParserNode): boolean {
        if (this._result)
            return true;

        if (c.delimiters.length <= P.expectedTypes.length)
            return false;

        for (let obj of c.objects)
            if (!obj)
                return true;

        return false;
    }

    protected accept(P: ParserBottomUp, c: ParserNode): boolean {
        if (c.delimiters.length - 1 == P.expectedTypes.length && c.objects.length == P.expectedTypes.length)
            return true;

        return false;
    }

    protected first(P: ParserBottomUp, c: ParserNode): ParserNode | null {
        let newNode = new ParserNode(P);

        newNode.delimiters = Array.from(c.delimiters);

        if (newNode.delimiters.length - 1 > P.expectedTypes.length)
            return null;

        newNode.delimiters.push(P.fromString.length);

        return newNode;
    }

    protected next(P: ParserBottomUp, c: ParserNode): ParserNode | null {
        let newNode = new ParserNode(P);

        newNode.delimiters = Array.from(c.delimiters);
        newNode.delimiters[newNode.delimiters.length - 1]--;

        if (newNode.delimiters[newNode.delimiters.length - 1] < newNode.delimiters[newNode.delimiters.length - 2])
            return null;

        return newNode;
    }

    protected output(P: ParserBottomUp, c: ParserNode): void {
        this._result = c;
    }


    private _result: ParserNode | null = null;

    get result(): ParserNode | null {
        return this._result;
    }
}