import * as init from "../initializer";
import { Language } from "../lang/Language";
import { LanguageInterface } from "../lang/LanguageInterface";
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
    [[0, 3, 6, 8], ChromaticPattern.SEVENTH.withInv()],
    [[0, 4, 7, 11], ChromaticPattern.SEVENTH_MAJ7],
    [[0, 5, 9], ChromaticPattern.TRIAD_MAJOR.withInv(2)],
    [[0, 3, 8], ChromaticPattern.TRIAD_MAJOR.withInv()],
    [[1, 5, 8], ChromaticPattern.TRIAD_MAJOR, false],
    [[0, 4, 6, 11], ChromaticPattern.SEVENTH_MAJ7_b5],
    [[0, 5, 7, 10, 15], ChromaticPattern.SEVENTH_SUS4_b9],
    [[0, 4, 8, 10, 13, 17, 21], ChromaticPattern.THIRTEENTH_a5b9],
    [[0, 3, 7, 10, 14], ChromaticPattern.NINTH_MINOR],
    [[0, 3, 7, 10], ChromaticPattern.SEVENTH_MINOR],
    [[0, 4, 6, 11, 15, 17, 21], ChromaticPattern.THIRTEENTH_MAJ13_b5a9],
    [[0, 4, 6, 10, 15, 17, 21], ChromaticPattern.THIRTEENTH_b5a9],
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

const patternAllLanguages = [].concat(...ChromaticPattern.all().map(e => {
    const ret = [];
    for (const lang of Language.all())
        ret.push([lang, e]);

    return ret;
}));
describe.each(patternAllLanguages)
    ("All patterns have name", (lang: LanguageInterface, pattern: ChromaticPattern) => {
        it(`${lang.id} - Pattern ${pattern} string defined. str=${pattern.toString()}`, async () => {
            Settings.lang = lang;
            const str = pattern.toString();
            expect(str).toBeDefined();
            if (str.length > 0)
                expect(str[0]).not.toMatch("(");
        });

        it(`${lang.id} - Pattern ${pattern} shortName defined. shortName=${pattern.shortName}`, async () => {
            Settings.lang = lang;
            const str = pattern.shortName;
            expect(str).toBeDefined();
            if (str.length > 0)
                expect(str[0]).not.toMatch("(");
        });

        it(`${lang.id} - Pattern ${pattern} string reversible. str=${pattern.toString()}. actual=${ChromaticPattern.fromString(pattern.toString())}`, async () => {
            Settings.lang = lang;
            expect(ChromaticPattern.fromString(pattern.toString())).toBe(pattern);
        });

        it(`${lang.id} - Pattern ${pattern} shortName reversible. shortName=${pattern.shortName}. actual=${ChromaticPattern.fromString(pattern.shortName)}`, async () => {
            Settings.lang = lang;
            expect(ChromaticPattern.fromString(pattern.shortName)).toBe(pattern);
        });
    });

describe.each([
    [Language.ESP, "m", ChromaticPattern.TRIAD_MINOR],
    [Language.ESP, " ", ChromaticPattern.TRIAD_MAJOR],
    [Language.ESP, "MAyOR", ChromaticPattern.TRIAD_MAJOR],

    [Language.ENG, "MAjOR", ChromaticPattern.TRIAD_MAJOR],
    [Language.ENG, "5", ChromaticPattern.POWER_CHORD],
    [Language.ENG, " ", ChromaticPattern.TRIAD_MAJOR],
    [Language.ENG, "m", ChromaticPattern.TRIAD_MINOR],
    [Language.ENG, "0", ChromaticPattern.TRIAD_DIMINISHED],
    [Language.ENG, "+", ChromaticPattern.TRIAD_AUGMENTED],
    [Language.ENG, "quartal", ChromaticPattern.TRIAD_QUARTAL],
    [Language.ENG, "7", ChromaticPattern.SEVENTH],
    [Language.ENG, "7b5", ChromaticPattern.SEVENTH_b5],
    [Language.ENG, "Maj7b5", ChromaticPattern.SEVENTH_MAJ7_b5],
    [Language.ENG, "13m", ChromaticPattern.THIRTEENTH_MINOR],
    [Language.ENG, "13#5♭9", ChromaticPattern.THIRTEENTH_a5b9],
    [Language.ENG, "6", ChromaticPattern.SIXTH],
    [Language.ESP, "treceava maj13 b5#9", ChromaticPattern.THIRTEENTH_MAJ13_b5a9],
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