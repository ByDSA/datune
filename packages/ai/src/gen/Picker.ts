import { random } from "@datune/utils";

export class Picker<T> {
    constructor(private _possibilities: T[] = []) {
    }

    pickAndRemove(): T | null {
        if (this._possibilities.length == 0)
            return null;
        else if (this._possibilities.length == 1) {
            let ret = this._possibilities[0];
            this._possibilities.splice(0);
            return ret;
        }

        let index = random(this._possibilities.length);
        let ret = this._possibilities[index];

        this._possibilities.splice(index, 1);

        return ret;
    }

    get possibilities(): T[] {
        return this._possibilities;
    }
}