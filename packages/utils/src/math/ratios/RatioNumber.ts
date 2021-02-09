import { Ratio } from './Ratio';

export class RatioNumber extends Ratio {
    constructor(private num: number) {
        super();
    }

    static from(n: number) {
        return new RatioNumber(n);
    }

    get value(): number {
        return this.num;
    }

    getMult(ratio: Ratio): Ratio {
        return RatioNumber.from(this.value * ratio.value);
    }
}