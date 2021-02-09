import { Ratio } from '@datune/utils/math/ratios/Ratio';
import { RatioFrac } from '@datune/utils/math/ratios/RatioFrac';
import { ScaleGenerator } from '../../../../ScaleGenerator';

test('from', () => {
    let generator = ScaleGenerator.from(7, 7);
    expect(generator.interval).toBe(7);
    expect(generator.length).toBe(7);
});

test('generate - unordered intervals', () => {
    let generator = ScaleGenerator.from(7, 7);
    let scale = generator.generate();
    let unordered = (<any>generator)._unorderedIntervals;

    let expected = [0, 7, 14 % 12, 21 % 12, 28 % 12, 35 % 12, 42 % 12];
    expect(unordered).toStrictEqual(expected);
});

test('generate - ordered intervals', () => {
    let generator = ScaleGenerator.from(7, 7);
    let scale = generator.generate();
    let ordered = (<any>generator)._orderedIntervals;

    let r: Ratio = RatioFrac.from(3, 2);
    let expected = [0, 2, 4, 6, 7, 9, 11];
    expect(ordered).toStrictEqual(expected);
});