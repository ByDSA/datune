import * as init from "../initializer";
import { SPN } from "../pitches/symbolic/SPN";
import { SymbolicPitch } from "../pitches/symbolic/SymbolicPitch";
import { ConcertPitch } from "./ConcertPitch";
import { Tuning } from "./Tuning";
init.chromatics.default();
init.diatonicAlts.default();
init.spns.default();
init.concertPitches.default();
init.temperaments.default();
init.settings.default();
init.tunings.default();

describe.each([
    [Tuning.EQUAL_440, SPN.A4, 440],
    [Tuning.EQUAL_440, SPN.C0, 16.35],
    [Tuning.EQUAL_440, SPN.AA4, 466.16],
    [Tuning.EQUAL_440, SPN.GG4, 415.30],
    [Tuning.LIMIT_5_SYMMETRIC_N1_440, SPN.A4, 440],
    [Tuning.LIMIT_5_SYMMETRIC_N1_440, SPN.E4, 330],
])("Tuning + SPN = frequency", (tuning: Tuning, symbolicPitch: SymbolicPitch, frequency: number) => {
    it(`${tuning} ${symbolicPitch} = ${frequency}`, () => {

        let actual: number = tuning.getFrequency(symbolicPitch);

        expect(actual).toBeCloseTo(frequency);
    });
})