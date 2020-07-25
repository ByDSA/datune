import { RatioFrac } from "./RatioFrac";
import { fraction, multiply } from 'mathjs';
import { RatioPow2Frac } from "./RatioPow2Frac";

test('RatioFrac - from', async () => {
    let actual: RatioFrac = RatioFrac.from(4, 2);

    expect(actual.value).toEqual(2);
});

test('RatioFrac - value', async () => {
    let actual: RatioFrac = RatioFrac.from(2, 4);

    expect(actual.value).toEqual(0.5);
});

test('RatioFrac - getMult', async () => {
    let a: RatioFrac = RatioFrac.from(3, 2);
    let b: RatioFrac = RatioFrac.from(3, 2);
    let actual: RatioFrac = <RatioFrac>a.getMult(b);

    expect(actual.value).toEqual(9 / 4);
});

test('mathjs - fraction - multiply', async () => {
    let a = fraction(3, 2);
    let b = fraction(3, 2);
    let actual = multiply(a, b);

    expect(actual).toEqual(fraction(9, 4));
    expect(actual.n).toEqual(9);
    expect(actual.d).toEqual(4);
});

test('RatioPow2Frac - from', async () => {
    let actual: RatioPow2Frac = RatioPow2Frac.from(1, 12);

    expect(actual.value).toEqual(Math.pow(2, 1/12));
});