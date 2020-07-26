import { Chromatic } from "../../degrees/Chromatic";
import { DiatonicAlt } from "../../degrees/DiatonicAlt";
import { ChromaticPattern } from "../../patterns/ChromaticPattern";
import { DiatonicAltPattern } from "../../patterns/DiatonicAltPattern";
import * as precalc from "../../precalc";
import { ChromaticChord } from "../chromatic/ChromaticChord";
import { DiatonicAltChord } from "../diatonicalt/DiatonicAltChord";
import { RootPatternChord } from "./RootPatternChord";
precalc.chromatics();
precalc.chromaticChords();
precalc.chromaticPatterns();
precalc.diatonicAlts();
precalc.diatonicAltPatterns();
precalc.diatonicAltChords();
precalc.settings();

describe.each([
    [DiatonicAlt.C, DiatonicAltPattern.TRIAD_MAJOR, DiatonicAltChord.C],
    [DiatonicAlt.C, DiatonicAltPattern.SEVENTH, DiatonicAltChord.C7],
    [DiatonicAlt.A, DiatonicAltPattern.TRIAD_MINOR, DiatonicAltChord.Am],
    [DiatonicAlt.C, DiatonicAltPattern.SEVENTH_MAJ7, DiatonicAltChord.CMaj7],
])("from DiatonicAlt", (degree, pattern, expected) => {
    it(`(${degree}, ${pattern}) => ${expected}`, async () => {
        const rootPatternChord = RootPatternChord.from(degree, pattern);
        expect(rootPatternChord.degree).toBe(degree);
        expect(rootPatternChord.pattern).toBe(pattern);

        const diatonicAltChord = rootPatternChord.chord;
        expect(diatonicAltChord).toBe(expected);
    })
})

describe.each([
    [Chromatic.C, ChromaticPattern.TRIAD_MAJOR, ChromaticChord.C],
])("from Chromatic", (degree, pattern, expected) => {
    it(`(${degree}, ${pattern}) => ${expected}`, async () => {
        const rootPatternChord = RootPatternChord.from(degree, pattern);
        expect(rootPatternChord.degree).toBe(degree);
        expect(rootPatternChord.pattern).toBe(pattern);

        const diatonicAltChord = rootPatternChord.chord;
        expect(diatonicAltChord).toBe(expected);
    })
})