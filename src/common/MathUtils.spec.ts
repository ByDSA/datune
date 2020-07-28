import { rotativeTrim } from './MathUtils';

test('rotativeTrim: does nothing', () => {
    let n = 7;
    let limit = 12;

    expect(rotativeTrim(n, limit)).toBe(7);
});

test('rotativeTrim: over limit', () => {
    let n = 14;
    let limit = 12;

    expect(rotativeTrim(n, limit)).toBe(2);
});

test('rotativeTrim: below 0', () => {
    let n = -1;
    let limit = 12;

    expect(rotativeTrim(n, limit)).toBe(11);
});