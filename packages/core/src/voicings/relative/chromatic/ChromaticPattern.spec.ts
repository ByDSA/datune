import { NumberArray } from "@datune/utils";
import { Language, LanguageInterface, Settings } from "../../../config";
import { ChromaticPattern } from "./ChromaticPattern";

describe.each(<[NumberArray, ChromaticPattern][]>[
    [[0, 4, 7], ChromaticPattern.TRIAD_MAJOR],
    [[0, 4, 7], ChromaticPattern.TRIAD_MAJOR.withInv(3)],
    [[1, 5, 8], ChromaticPattern.TRIAD_MAJOR, false],
    [[0, 3, 7], ChromaticPattern.TRIAD_MINOR],
    [[0, 3, 6], ChromaticPattern.TRIAD_DIMINISHED],
    [[0, 4, 8], ChromaticPattern.TRIAD_AUGMENTED],
    [[0, 4, 7, 10], ChromaticPattern.SEVENTH],
    [[0, 3, 6, 8], ChromaticPattern.SEVENTH.withInv()],
    [[0, 4, 7, 11], ChromaticPattern.SEVENTH_MAJ7],
    [[0, 5, 9], ChromaticPattern.TRIAD_MAJOR.withInv(2)],
    [[0, 3, 8], ChromaticPattern.TRIAD_MAJOR.withInv()],
    [[0, 4, 6, 11], ChromaticPattern.SEVENTH_MAJ7_b5],
    [[0, 5, 7, 10, 15], ChromaticPattern.SEVENTH_SUS4_b9],
    [[0, 4, 8, 10, 13, 17, 21], ChromaticPattern.THIRTEENTH_a5b9],
    [[0, 3, 7, 10, 14], ChromaticPattern.NINTH_MINOR],
    [[0, 3, 7, 10], ChromaticPattern.SEVENTH_MINOR],
    [[0, 4, 6, 11, 15, 17, 21], ChromaticPattern.THIRTEENTH_MAJ13_b5a9],
    [[0, 4, 6, 10, 15, 17, 21], ChromaticPattern.THIRTEENTH_b5a9],
    [[0, 4, 9, 11, 15, 18, 22], ChromaticPattern.THIRTEENTH_b5a9.withInv(2)],
])('fromRootIntervals', (rootIntervals: NumberArray, expectedPattern: ChromaticPattern, reverse = true) => {
    test(`${rootIntervals} => ${expectedPattern}`, async () => {
        let pattern = ChromaticPattern.fromRootIntervals(...rootIntervals);
        expect(pattern).toBe(expectedPattern);
    });

    if (reverse)
        test(`${expectedPattern}.rootIntervals = ${rootIntervals}`, async () => {
            expect(expectedPattern.rootIntervals).toStrictEqual(rootIntervals);
        });
})

test('fromRootIntervals - all patterns with same rootIntervals are the same', async () => {
    let pattern = ChromaticPattern.fromRootIntervals(0, 1, 2);
    let pattern2 = ChromaticPattern.fromRootIntervals(0, 1, 2);
    expect(pattern2).toBe(pattern);
});

describe.each([
    [Language.ENG, ChromaticPattern.TRIAD_MAJOR, "MAJOR"],
    [Language.ESP, ChromaticPattern.TRIAD_MAJOR, "MAYOR"],
    [Language.ENG, ChromaticPattern.fromRootIntervals(0, 1, 2), "0-1-2"],
])('string conversion', (lang, pattern, str) => {
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

it("formRootIntervals - 0", () => {
    const pattern = ChromaticPattern.fromRootIntervals(0);
    expect(pattern).not.toBeNull();
})

type Tuple = [LanguageInterface, ChromaticPattern];
const patternAllLanguages: Tuple[] = ChromaticPattern.sets.all.map(e => {
    return <Tuple[]>Language.all().map(l => [l, e]);
}).reduce((c, p) => {
    return p.concat(c);
});
describe.each(patternAllLanguages)
    ("All patterns have name and shortName", (lang: LanguageInterface, pattern: ChromaticPattern) => {
        it(`${lang.id} - Pattern ${pattern} string defined. str=${pattern.toString()}`, async () => {
            Settings.lang = lang;
            const str = pattern.toString();
            expect(str).not.toBeNull();
            if (str.length > 0)
                expect(str[0]).not.toMatch("(");
        });

        it(`${lang.id} - Pattern ${pattern} shortName defined. shortName=${pattern.shortName}`, async () => {
            Settings.lang = lang;
            const str = pattern.shortName;
            expect(str).not.toBeNull();
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
    [Language.ENG, "º", ChromaticPattern.TRIAD_DIMINISHED],
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
    let actual = Pattern.fromString(from);
    let expected = Pattern.SEVENTH_MAJ7_b5;

    expect(actual).toBe(expected);
});
*/

describe.each(<[NumberArray, ChromaticPattern][]>[
    [[4, 3], ChromaticPattern.TRIAD_MAJOR]
])("fromIntraIntervals", (intraIntervals: NumberArray, expectedPattern) => {
    test(`${intraIntervals} => ${expectedPattern}`, async () => {
        let actual = ChromaticPattern.fromIntraIntervals(...intraIntervals);
        expect(actual).toBe(expectedPattern);
    });
});

it("allNonInversions is fine", () => {
    let patterns = ChromaticPattern.allNonInversions();
    for (const p of patterns) {
        let pInv = p;
        for (let i = 1; i < p.length; i++) {
            pInv = pInv.withInv();
            if (pInv === p) // simétrico
                break;
            expect(patterns).not.toContain(pInv);
        }
    }
})