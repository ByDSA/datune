import { IntervalDiatonicAlt } from "../../../../../../../intervals";
import { ScaleAlt } from "../../../ScaleAlt";
import { ScaleAltGeneratorByInterval } from "./ScaleAltGeneratorByInterval";

describe.each([
    [IntervalDiatonicAlt.PERFECT_FIFTH, 7, 0, ScaleAlt.LYDIAN],
    [IntervalDiatonicAlt.PERFECT_FIFTH, 7, -1, ScaleAlt.MAJOR],
    [IntervalDiatonicAlt.PERFECT_FIFTH, 7, 1, ScaleAlt.LOCRIAN],
    [IntervalDiatonicAlt.PERFECT_FOURTH, 7, 0, ScaleAlt.LOCRIAN],
    [IntervalDiatonicAlt.PERFECT_FOURTH, 7, -1, ScaleAlt.PHRYGIAN],
    [IntervalDiatonicAlt.PERFECT_FIFTH, 12, -1, ScaleAlt.CHROMATIC]
])("tests", (interval, length: number, startIndex: number, expected: ScaleAlt) => {
    it(`${interval}, length=${length}, startIndex=${startIndex} => ${expected}`, () => {
        const generator = ScaleAltGeneratorByInterval.from(interval, length, startIndex);
        const actual = generator.generate();

        expect(actual).toBe(expected);
    })
})