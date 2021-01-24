import { DiatonicAlt } from "pitches";
import { DiatonicAltPattern } from "voicings";
import { ChordAlt } from "../../../ChordAlt";
import { RootPatternAltBuilder } from "./RootPatternAltBuilder";

describe.each([
    [DiatonicAlt.C, DiatonicAltPattern.TRIAD_MAJOR, ChordAlt.C],
    [DiatonicAlt.C, DiatonicAltPattern.SEVENTH, ChordAlt.C7],
    [DiatonicAlt.A, DiatonicAltPattern.TRIAD_MINOR, ChordAlt.Am],
    [DiatonicAlt.C, DiatonicAltPattern.SEVENTH_MAJ7, ChordAlt.CMaj7],
])("from DiatonicAlt", (degree, pattern, expected) => {
    it(`(${degree}, ${pattern}) => ${expected}`, async () => {
        const builder = RootPatternAltBuilder.from(degree, pattern);
        expect(builder.root).toBe(degree);
        expect(builder.pattern).toBe(pattern);

        const diatonicAltChord = builder.build();
        expect(diatonicAltChord).toBe(expected);
    })
})

describe.each([
    [DiatonicAlt.C, DiatonicAltPattern.TRIAD_MAJOR],
    [DiatonicAlt.C, DiatonicAltPattern.SEVENTH],
    [DiatonicAlt.A, DiatonicAltPattern.TRIAD_MINOR],
    [DiatonicAlt.C, DiatonicAltPattern.SEVENTH_MAJ7],
    [DiatonicAlt.C, DiatonicAltPattern.NINTH],
])("DiatonicAlt = chord.root + PatternAlt = chord.pattern", (degree, pattern) => {
    it(`root=${degree}, pattern=${pattern}`, async () => {
        const chord = RootPatternAltBuilder.from(degree, pattern)
            .build();
        expect(chord.root).toBe(degree);
        expect(chord.pattern).toBe(pattern);
    })
})