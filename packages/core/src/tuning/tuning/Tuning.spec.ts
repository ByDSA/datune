import { AbsolutePitchAny, SPN } from "pitches";
import { Tuning } from "./Tuning";

describe.each([
    [Tuning.EQUAL_440, SPN.A4, 440],
    [Tuning.EQUAL_440, SPN.C0, 16.35],
    [Tuning.EQUAL_440, SPN.AA4, 466.16],
    [Tuning.EQUAL_440, SPN.GG4, 415.30],
    [Tuning.LIMIT_5_SYMMETRIC_N1_440, SPN.A4, 440],
    [Tuning.LIMIT_5_SYMMETRIC_N1_440, SPN.E4, 330],
])("Tuning + SPN = frequency", (tuning: Tuning, absolutePitch: AbsolutePitchAny, frequency: number) => {
    it(`${tuning} ${absolutePitch} = ${frequency}`, () => {

        let actual: number = tuning.getFrequency(absolutePitch);

        expect(actual).toBeCloseTo(frequency);
    });
})