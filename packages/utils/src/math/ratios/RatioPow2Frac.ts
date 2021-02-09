import { Fraction, fraction, sum } from 'mathjs';
import { Ratio } from './Ratio';
import { RatioNumber } from './RatioNumber';

export class RatioPow2Frac extends Ratio {
    protected fraction: Fraction;

    get value(): number {
        return Math.pow(2, this.fraction.n / this.fraction.d);
    }

    private constructor(numerator: number, denominator: number) {
        super();
        this.fraction = <Fraction>fraction(numerator, denominator);
    }

    static from(numerator: number, denominator: number): RatioPow2Frac {
        return new RatioPow2Frac(numerator, denominator);
    }

    static fromCents(cents: number): RatioPow2Frac {
        return new RatioPow2Frac(cents, 1200);
    }

    get cents() {
        return 1200 * this.fraction.n / this.fraction.d;
    }

    getMult(ratio: Ratio): Ratio {
        if (ratio instanceof RatioPow2Frac) {
            let fractionResult = sum(this.fraction, ratio.fraction);

            return RatioPow2Frac.from(fractionResult.n, fractionResult.d);
        }

        return RatioNumber.from(this.value * ratio.value);
    }
}