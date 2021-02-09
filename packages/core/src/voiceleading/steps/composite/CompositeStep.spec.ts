import { SPNArray } from "../../../chords";
import { SPN } from "../../../pitches";
import { CompositeStep } from "./CompositeStep";

it("cache fromIntervals same", () => {
    let actual = CompositeStep.fromIntervals(0, 1);
    let expected = CompositeStep.fromIntervals(0, 1);

    expect(actual).toBe(expected);
})

it("cache fromIntervals different", () => {
    let actual = CompositeStep.fromIntervals(0, 1);
    let notExpected = CompositeStep.fromIntervals(0, 2);

    expect(actual).not.toBe(notExpected);
})

describe.each([
    [CompositeStep.KEEP_U1, SPN.F5, SPN.C6],
    [CompositeStep.KEEP_U2, SPN.F5, SPN.CC6],
    [CompositeStep.KEEP_D1, SPN.F5, SPN.AA5],
    [CompositeStep.KEEP_D2, SPN.F5, SPN.A5],
    [CompositeStep.KEEP_NULL, SPN.F5, null],
    [CompositeStep.U1_KEEP, SPN.FF5, SPN.B5],
    [CompositeStep.U1_U1, SPN.FF5, SPN.C6],
    [CompositeStep.U1_U2, SPN.FF5, SPN.CC6],
    [CompositeStep.U1_D1, SPN.FF5, SPN.AA5],
    [CompositeStep.U1_D2, SPN.FF5, SPN.A5],
    [CompositeStep.U1_NULL, SPN.FF5, null],
    [CompositeStep.U2_KEEP, SPN.G5, SPN.B5],
    [CompositeStep.U2_U1, SPN.G5, SPN.C6],
    [CompositeStep.U2_U2, SPN.G5, SPN.CC6],
    [CompositeStep.U2_D1, SPN.G5, SPN.AA5],
    [CompositeStep.U2_D2, SPN.G5, SPN.A5],
    [CompositeStep.U2_NULL, SPN.G5, null],
    [CompositeStep.D1_KEEP, SPN.E5, SPN.B5],
    [CompositeStep.D1_U1, SPN.E5, SPN.C6],
    [CompositeStep.D1_U2, SPN.E5, SPN.CC6],
    [CompositeStep.D1_D1, SPN.E5, SPN.AA5],
    [CompositeStep.D1_D2, SPN.E5, SPN.A5],
    [CompositeStep.D1_NULL, SPN.E5, null],
    [CompositeStep.D2_KEEP, SPN.DD5, SPN.B5],
    [CompositeStep.D2_U1, SPN.DD5, SPN.C6],
    [CompositeStep.D2_U2, SPN.DD5, SPN.CC6],
    [CompositeStep.D2_D1, SPN.DD5, SPN.AA5],
    [CompositeStep.D2_D2, SPN.DD5, SPN.A5],
    [CompositeStep.D2_NULL, SPN.DD5, null],
    [CompositeStep.NULL_KEEP, null, SPN.B5],
    [CompositeStep.NULL_U1, null, SPN.C6],
    [CompositeStep.NULL_U2, null, SPN.CC6],
    [CompositeStep.NULL_D1, null, SPN.AA5],
    [CompositeStep.NULL_D2, null, SPN.A5],
])("intervals work fine", (motion, expectedBottom, expectedTop) => {
    it(`${motion.singleSteps.map((sm, i) => (i > 0 ? ", " : "") + sm.toString())}: ${expectedBottom} ${expectedTop}`, () => {
        const source: SPNArray = [SPN.F5, SPN.B5];
        const actual = motion.apply(source);

        const expected = [
            expectedBottom,
            expectedTop
        ];

        expect(actual).toStrictEqual(expected);
    })
})