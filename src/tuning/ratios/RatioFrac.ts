import { fraction, multiply } from 'mathjs';
import { Ratio } from './Ratio';
import { RatioNumber } from './RatioNumber';

export class RatioFrac extends Ratio {
    protected fraction;

    get value(): number {
        return this.numerator / this.denominator;
    }

    protected constructor(private numerator: number, private denominator: number) {
        super();
        this.fraction = fraction(numerator, denominator);
    }

    static from(numerator: number, denominator: number): RatioFrac {
        return new RatioFrac(numerator, denominator);
    }

    getMult(ratio: Ratio): Ratio {
        if (ratio instanceof RatioFrac) {
            let fractionResult = multiply(this.fraction, ratio.fraction);

            return RatioFrac.from(fractionResult.n, fractionResult.d);
        }

        return RatioNumber.from(this.value * ratio.value);
    }
}