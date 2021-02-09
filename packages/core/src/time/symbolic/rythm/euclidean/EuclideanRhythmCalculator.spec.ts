import { NumberArray } from "@datune/utils";
import { RhythmArray } from "../pattern/RhythmArray";
import { RhythmPattern } from "../pattern/RhythmPattern";
import { EuclideanRhythmCalculator } from "./EuclideanRhythmCalculator";

describe.each([
    [[4, 8], RhythmArray.from(1, 0, 1, 0, 1, 0, 1, 0)],
    /* paper: Euclidean strings */
    [[2, 5], RhythmArray.from(1, 0, 1, 0, 0)],
    [[3, 7], RhythmArray.from(1, 0, 1, 0, 1, 0, 0)],
    [[4, 9], RhythmArray.from(1, 0, 1, 0, 1, 0, 1, 0, 0)],
    [[5, 11], RhythmArray.from(1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0)],
    [[5, 16], RhythmArray.from(1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0)],
    /* paper: reverse Euclidean strings */
    [[7, 16], RhythmArray.from(1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0)],
    // paper: neither Euclidean nor reverse Euclidean strings    
    [[9, 16], RhythmArray.from(1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0)],
])('array', (params: number[], expectedArray: RhythmArray) => {
    expect(params.length > 0).toBeTruthy();
    it(`calculate ${params[0]}_${params[1]}`, () => {
        const rhythm = EuclideanRhythmCalculator.calculate(params[0], params[1]);
        const expected = RhythmPattern.fromArray(...expectedArray);
        expect(expected).toEqual(rhythm);
    })
})

describe.each([
    /* paper: reverse Euclidean strings */
    [[2, 3], [2, 1]],
    [[3, 4], [2, 1, 1]],
    [[3, 5], [2, 2, 1]],
    [[3, 8], [3, 3, 2]],
    [[4, 7], [2, 2, 2, 1]],
    [[4, 11], [3, 3, 3, 2]],
    [[5, 6], [2, 1, 1, 1, 1]],
    [[5, 7], [2, 1, 2, 1, 1]],
    [[5, 9], [2, 2, 2, 2, 1]],
    [[5, 12], [3, 2, 3, 2, 2]],
    [[7, 8], [2, 1, 1, 1, 1, 1, 1]],
    [[11, 24], [3, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2]],
    // paper: neither Euclidean nor reverse Euclidean strings
    [[5, 8], [2, 1, 2, 1, 2]],
    [[7, 12], [2, 1, 2, 2, 1, 2, 2]],
    [[13, 24], [2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2]],

])('pattern', (params: number[], expectedPattern: number[]) => {
    expect(expectedPattern.length > 0).toBeTruthy();
    expect(params.length > 0).toBeTruthy();
    it(`calculate ${params[0]}_${params[1]}`, () => {
        const rhythm = EuclideanRhythmCalculator.calculate(params[0], params[1]);
        const expected = RhythmPattern.from(...<NumberArray>expectedPattern);
        expect(expected).toEqual(rhythm);
    })
})