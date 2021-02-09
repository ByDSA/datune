import { ChordAlt } from "chords";
import { DiatonicAlt } from "pitches";
import { DiatonicAltPattern } from "voicings";
import { TonalityAlt } from "../alt/TonalityAlt";
import { FunctionsFacade } from "./FunctionsFacade";

describe.each([
    [FunctionsFacade.i, TonalityAlt.Am, ChordAlt.Am],
    [FunctionsFacade.V_II, TonalityAlt.C, ChordAlt.A],
    [FunctionsFacade.V_III, TonalityAlt.C, ChordAlt.B],
    [FunctionsFacade.V_IV, TonalityAlt.C, ChordAlt.C],
    [FunctionsFacade.V_V, TonalityAlt.C, ChordAlt.D],
    [FunctionsFacade.V_VI, TonalityAlt.C, ChordAlt.E],
    [FunctionsFacade.V7_II, TonalityAlt.C, ChordAlt.A7],
    [FunctionsFacade.V7_III, TonalityAlt.C, ChordAlt.B7],
    [FunctionsFacade.V7_IV, TonalityAlt.C, ChordAlt.C7],
    [FunctionsFacade.V7_V, TonalityAlt.C, ChordAlt.D7],
    [FunctionsFacade.V7_VI, TonalityAlt.C, ChordAlt.E7],
    [FunctionsFacade.SUBV7, TonalityAlt.C, ChordAlt.fromRootPattern(DiatonicAlt.Db, DiatonicAltPattern.SEVENTH)],
    [FunctionsFacade.SUBV7_II, TonalityAlt.C, ChordAlt.fromRootPattern(DiatonicAlt.Eb, DiatonicAltPattern.SEVENTH)],
    [FunctionsFacade.SUBV7_III, TonalityAlt.C, ChordAlt.fromRootPattern(DiatonicAlt.F, DiatonicAltPattern.SEVENTH)],
    [FunctionsFacade.SUBV7_IV, TonalityAlt.C, ChordAlt.fromRootPattern(DiatonicAlt.Gb, DiatonicAltPattern.SEVENTH)],
    [FunctionsFacade.SUBV7_V, TonalityAlt.C, ChordAlt.fromRootPattern(DiatonicAlt.Ab, DiatonicAltPattern.SEVENTH)],
    [FunctionsFacade.SUBV7_VI, TonalityAlt.C, ChordAlt.fromRootPattern(DiatonicAlt.Bb, DiatonicAltPattern.SEVENTH)],
    [FunctionsFacade.V7Alt, TonalityAlt.C, ChordAlt.fromNotes(DiatonicAlt.G, DiatonicAlt.B, DiatonicAlt.Db, DiatonicAlt.F)],
])("precalc Dominant", (func, tonality, expected) => {
    it(`${func} of ${tonality} = ${expected}`, () => {
        let actual = func.getChordAlt(tonality);

        expect(actual).toBe(expected);
    })
})