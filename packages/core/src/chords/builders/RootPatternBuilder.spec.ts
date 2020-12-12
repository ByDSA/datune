import { Chromatic } from "../../degrees/Chromatic";
import { DiatonicAlt } from "../../degrees/DiatonicAlt";
import * as init from "../../initializer";
import { ChromaticPattern } from "../../patterns/ChromaticPattern";
import { DiatonicAltPattern } from "../../patterns/DiatonicAltPattern";
import { ChromaticChord } from "../ChromaticChord";
import { DiatonicAltChord } from "../DiatonicAltChord";
import { RootPatternBuilder } from "./RootPatternBuilder";
init.chromatics.default();
init.chromaticChords.default();
init.chromaticPatterns.default();
init.diatonicAlts.default();
init.diatonicAltPatterns.default();
init.diatonicAltChords.default();
init.settings.default();

describe.each([
    [DiatonicAlt.C, DiatonicAltPattern.TRIAD_MAJOR, DiatonicAltChord.C],
    [DiatonicAlt.C, DiatonicAltPattern.SEVENTH, DiatonicAltChord.C7],
    [DiatonicAlt.A, DiatonicAltPattern.TRIAD_MINOR, DiatonicAltChord.Am],
    [DiatonicAlt.C, DiatonicAltPattern.SEVENTH_MAJ7, DiatonicAltChord.CMaj7],
])("from DiatonicAlt", (degree, pattern, expected) => {
    it(`(${degree}, ${pattern}) => ${expected}`, async () => {
        const builder = RootPatternBuilder.create()
            .setRoot(degree)
            .setPattern(pattern);
        expect(builder.getRoot()).toBe(degree);
        expect(builder.getPattern()).toBe(pattern);

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
])("DiatonicAlt = chord.root + DiatonicAltPattern = chord.pattern", (degree, pattern) => {
    it(`root=${degree}, pattern=${pattern}`, async () => {
        const chord = RootPatternBuilder.create()
            .setRoot(degree)
            .setPattern(pattern)
            .build();
        expect(chord.root).toBe(degree);
        expect(chord.pattern).toBe(pattern);
    })
})

describe.each([
    [Chromatic.C, ChromaticPattern.TRIAD_MAJOR, ChromaticChord.C],
])("from Chromatic", (degree, pattern, expected) => {
    it(`(${degree}, ${pattern}) => ${expected}`, async () => {
        const builder = RootPatternBuilder.create()
            .setRoot(degree)
            .setPattern(pattern);
        expect(builder.getRoot()).toBe(degree);
        expect(builder.getPattern()).toBe(pattern);

        const diatonicAltChord = builder.build();
        expect(diatonicAltChord).toBe(expected);
    })
})

describe.each([
    [Chromatic.C, ChromaticPattern.TRIAD_MAJOR],
    [Chromatic.C, ChromaticPattern.SEVENTH],
    [Chromatic.A, ChromaticPattern.TRIAD_MINOR],
    [Chromatic.C, ChromaticPattern.SEVENTH_MAJ7],
    [Chromatic.C, ChromaticPattern.NINTH],
])("Chromatic = chord.root + ChromaticPattern = chord.pattern", (degree, pattern) => {
    it(`root=${degree}, pattern=${pattern}`, async () => {
        const chord = RootPatternBuilder.create().setRoot(degree).setPattern(pattern).build();
        expect(chord.root).toBe(degree);
        expect(chord.pattern).toBe(pattern);
    })
})