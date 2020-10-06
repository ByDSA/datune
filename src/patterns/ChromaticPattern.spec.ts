import * as init from "../initializer";
import { Language } from "../lang/Language";
import { Settings } from "../settings/Settings";
import { ChromaticPattern } from "./ChromaticPattern";
init.chromaticPatterns.default();
init.chromaticChords.default();
init.settings.default(); // Por si hay errores, mostrar el nombre del test

describe.each([
    [[0, 4, 7], ChromaticPattern.TRIAD_MAJOR],
    [[0, 4, 7], ChromaticPattern.TRIAD_MAJOR.withInv(3)],
    [[0, 3, 7], ChromaticPattern.TRIAD_MINOR],
    [[0, 3, 6], ChromaticPattern.TRIAD_DIMINISHED],
    [[0, 4, 8], ChromaticPattern.TRIAD_AUGMENTED],
    [[0, 4, 7, 10], ChromaticPattern.SEVENTH],
    [[0, 4, 7, 11], ChromaticPattern.SEVENTH_MAJ7],
    [[0, 5, 9], ChromaticPattern.TRIAD_MAJOR.withInv(2)],
    [[0, 3, 8], ChromaticPattern.TRIAD_MAJOR.withInv()],
    [[0, 5, 9], ChromaticPattern.TRIAD_MAJOR.withInv().withInv()],
    [[1, 5, 8], ChromaticPattern.TRIAD_MAJOR, false],
    [[0, 4, 6, 11], ChromaticPattern.SEVENTH_MAJ7_b5],
    [[0, 5, 7, 10, 15], ChromaticPattern.SEVENTH_SUS4_b9],
])('fromRootIntervals', (rootIntervals, pattern, reverse = true) => {
    test(`${rootIntervals} => ${pattern}`, async () => {
        let chromaticPattern = ChromaticPattern.fromRootIntervals(...rootIntervals);
        expect(chromaticPattern).toBe(pattern);
    });

    if (reverse)
        test(`${pattern}.rootIntervals = ${rootIntervals}`, async () => {
            expect(pattern.rootIntervals).toStrictEqual(rootIntervals);
        });
})

test('fromIC - immutable new pattern: 0, 1, 2', async () => {
    let chromaticPattern = ChromaticPattern.fromRootIntervals(0, 1, 2);
    let chromaticPattern2 = ChromaticPattern.fromRootIntervals(0, 1, 2);
    expect(chromaticPattern2).toBe(chromaticPattern);
});

describe.each([
    [Language.ENG, ChromaticPattern.TRIAD_MAJOR, "MAJOR"],
    [Language.ESP, ChromaticPattern.TRIAD_MAJOR, "MAYOR"],
    [Language.ENG, ChromaticPattern.fromRootIntervals(0, 1, 2), "0-1-2"],
])('toString', (lang, pattern, str) => {
    test(`${lang.id} - ${pattern} => "${str}"`, async () => {
        Settings.lang = lang;
        let actual = pattern.toString();
        let expected = str;
        expect(actual).toMatch(expected);
    });

    test(`${lang} - "${str}" => ${pattern}`, async () => {
        Settings.lang = lang;
        let actual = ChromaticPattern.fromString(str);
        let expected = pattern;
        expect(actual).toBe(expected);
    });
})

describe.each([
    [Language.ESP, "m", ChromaticPattern.TRIAD_MINOR],
    [Language.ESP, " ", ChromaticPattern.TRIAD_MAJOR],
    [Language.ESP, "MAyOR", ChromaticPattern.TRIAD_MAJOR],
    [Language.ENG, "m", ChromaticPattern.TRIAD_MINOR],
    [Language.ENG, " ", ChromaticPattern.TRIAD_MAJOR],
    [Language.ENG, "MAjOR", ChromaticPattern.TRIAD_MAJOR],
])("fromString", (lang, str, expectedPattern) => {
    test(`${lang.id} - "${str}" => ${expectedPattern}`, async () => {
        Settings.lang = lang;
        const actual = ChromaticPattern.fromString(str);
        expect(actual).toBe(expectedPattern);
    });
})

// TODO
/*
test('fromString - "0 4 6 11" = SEVENTH MAJ7 b5', () => {
    let from = "0 4 6 11";
    let actual = ChromaticPattern.fromString(from);
    let expected = ChromaticPattern.SEVENTH_MAJ7_b5;

    expect(actual).toBe(expected);
});
*/

test('fromIntraIntervals - 4 3', async () => {
    let actual = ChromaticPattern.fromIntraIntervals(4, 3);
    let expected = ChromaticPattern.TRIAD_MAJOR;
    expect(actual).toBe(expected);
});