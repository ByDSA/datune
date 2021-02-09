import { Fraction, fraction, multiply } from 'mathjs';
import { Ratio } from './Ratio';
import { RatioNumber } from './RatioNumber';

export class RatioFrac extends Ratio {
    protected fraction: Fraction;

    get value(): number {
        return this.numerator / this.denominator;
    }

    protected constructor(private numerator: number, private denominator: number) {
        super();
        this.fraction = <Fraction>fraction(numerator, denominator);
    }

    static from(numerator: number, denominator: number): RatioFrac {
        return new RatioFrac(numerator, denominator);
    }

    getMult(ratio: Ratio): Ratio {
        if (ratio instanceof RatioFrac) {
            let fractionResult = <Fraction>multiply(this.fraction, ratio.fraction);

            return RatioFrac.from(fractionResult.n, fractionResult.d);
        }

        return RatioNumber.from(this.value * ratio.value);
    }
}