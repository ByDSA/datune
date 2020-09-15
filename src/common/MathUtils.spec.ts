import { rotativeTrim } from './MathUtils';

describe("rotativeTrim", () => {
    test('lower than limit', () => {
        let n = 7;
        let limit = 12;

        expect(rotativeTrim(n, limit)).toBe(7);
    });

    test('over limit', () => {
        let n = 14;
        let limit = 12;

        expect(rotativeTrim(n, limit)).toBe(2);
    });

    test('below 0', () => {
        let n = -1;
        let limit = 12;

        expect(rotativeTrim(n, limit)).toBe(11);
    });
});