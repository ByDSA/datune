import { Language } from "../lang/Language";
import * as init from "../initializer";
import { Settings } from "../settings/Settings";
import { ScaleChromatic } from "./ScaleChromatic";
init.scaleChromatics.default();
init.diatonics.default();
init.chromatics.default();
init.diatonicAltDegrees.default();
init.diatonicAltPatterns.default();
init.settings.default();
init.diatonicDegrees.default();
init.degreeFunctions.default();

describe('precalc', () => {
    describe.each(ScaleChromatic.sets.all())
        ('sets.all() not undefined', (scale) => {
            test(`${scale}`, async () => {
                expect(scale).not.toBeUndefined();
            })
        });

    test('manual', async () => {
        let scale = ScaleChromatic.MAJOR;

        expect(scale).not.toBeUndefined();
        expect(scale).not.toBeNull();
        expect(scale).toBe(ScaleChromatic.MAJOR);
    });
})

describe('getModeIntraIntervals', () => {
    test('-III  = MINOR.intervals', async () => {
        let actual: number[] = (<any>ScaleChromatic.MAJOR).getModeIntraIntervals(-3);
        let expected: number[] = [2, 1, 2, 2, 1, 2, 2];

        expect(actual).toStrictEqual(expected);
    });

    test('VI  = MINOR.intervals', async () => {
        let actual: number[] = (<any>ScaleChromatic.MAJOR).getModeIntraIntervals(6);
        let expected: number[] = [2, 1, 2, 2, 1, 2, 2];

        expect(actual).toStrictEqual(expected);
    });
})

describe.each([
    [1, ScaleChromatic.MAJOR, ScaleChromatic.MAJOR],
    [-1, ScaleChromatic.MAJOR, ScaleChromatic.MAJOR],
    [2, ScaleChromatic.MAJOR, ScaleChromatic.DORIAN],
    [-2, ScaleChromatic.MAJOR, ScaleChromatic.LOCRIAN],
])('getMode', (modeNumber: number, scaleBase, expected) => {
    test(`${modeNumber} of ${scaleBase} => ${expected}`, async () => {
        let mode = scaleBase.getMode(modeNumber);
        expect(mode).toBe(expected);
    });
})

test('degrees not null or undefined', async () => {
    for (let scale of ScaleChromatic.sets.all()) {
        expect(scale.degrees).not.toBeNull();
    }
});

describe.each([
    [ScaleChromatic.MAJOR, [0, 2, 4, 5, 7, 9, 11]],
    [ScaleChromatic.MINOR, [0, 2, 3, 5, 7, 8, 10]],
    [ScaleChromatic.MIXOLYDIAN, [0, 2, 4, 5, 7, 9, 10]],
])('degrees', (scale, expectedDegrees) => {
    test(`${scale} => ${expectedDegrees}`, async () => {
        let degrees = scale.degrees;
        expect(degrees).toStrictEqual(expectedDegrees);
    });
})

describe.each([
    [ScaleChromatic.MAJOR, [2, 2, 1, 2, 2, 2, 1]],
    [ScaleChromatic.BLUES_b5, [3, 2, 1, 1, 3, 2]],
    [ScaleChromatic.BLUES_a4, [3, 2, 1, 1, 3, 2]],
    [ScaleChromatic.PENTATONIC_MINOR, [3, 2, 2, 3, 2]],
    [ScaleChromatic.PENTATONIC, [2, 2, 3, 2, 3]],
    [ScaleChromatic.EGYPCIAN, [2, 3, 2, 3, 2]],
    [ScaleChromatic.BLUES_MINOR, [3, 2, 3, 2, 2]],
    [ScaleChromatic.BLUES_MAJOR, [2, 3, 2, 2, 3]],
    [ScaleChromatic.BEBOP_DOMINANT, [2, 2, 1, 2, 2, 1, 1, 1]],
    [ScaleChromatic.BLUES_b5.modes[4], [3, 2, 3, 2, 1, 1]],
])('intraIntervals', (scale, intraIntervals) => {
    test(`${scale} => ${intraIntervals}`, async () => {
        let degrees = scale.intraIntervals;
        expect(degrees).toStrictEqual(intraIntervals);
    });

    test(`${intraIntervals} => ${scale}`, async () => {
        let actual = ScaleChromatic.fromIntraIntervals(...intraIntervals);
        expect(actual).toBe(scale);
    });
})

test('set all: contains BLUES_a4', async () => {
    expect(ScaleChromatic.sets.all().includes(ScaleChromatic.BLUES_a4)).toBe(true);
});

test('fromPC: MAJOR', async () => {
    let scale = ScaleChromatic.fromRootIntervals(0, 2, 4, 5, 7, 9, 11);
    expect(scale).toBe(ScaleChromatic.MAJOR);
});


test('toString: all have string', async () => {
    for (let scale of ScaleChromatic.sets.all()) {
        expect(scale.toString()).not.toBeNull();
        expect(scale.toString()).not.toBeUndefined();
    }
});

describe.each([
    [Language.ESP, ScaleChromatic.MAJOR, "MAYOR"],
    [Language.ESP, ScaleChromatic.MINOR, "MENOR"],
    [Language.ESP, ScaleChromatic.AEOLIAN_b1, "LIDIA AUMENTADA ♯2"],

    [Language.ENG, ScaleChromatic.MAJOR, "MAJOR"],
    [Language.ENG, ScaleChromatic.MINOR, "MINOR"],
    [Language.ENG, ScaleChromatic.AEOLIAN_b1, "LYDIAN AUGMENTED ♯2"],
])('toString', (lang, scale, str) => {
    test(`${lang.id} - ${scale} => ${str}`, async () => {
        Settings.lang = lang;
        expect(scale.toString()).toBe(str);
    });
    test(`${lang.id} - ${str} => ${scale}`, async () => {
        Settings.lang = lang;
        expect(ScaleChromatic.fromString(str)).toBe(scale);
    });
})

describe('fromString', () => {
    describe.each([
        [Language.ESP, "  ma Yor  ", ScaleChromatic.MAJOR],
        [Language.ESP, "LiDIA aume Ntada #2", ScaleChromatic.AEOLIAN_b1],
        [Language.ESP, "LiDIA AUMENTada ♯2", ScaleChromatic.AEOLIAN_b1],
        [Language.ESP, "LiDIA b7", ScaleChromatic.LYDIAN_b7],
        [Language.ESP, "SUPERLOCRIA bb7", ScaleChromatic.SUPERLOCRIAN_bb7],

        [Language.ENG, "  ma Jor  ", ScaleChromatic.MAJOR],
        [Language.ENG, "LyDIAN augme Nted #2", ScaleChromatic.AEOLIAN_b1],
        [Language.ENG, "LYDIAN AUGMENTED ♯2", ScaleChromatic.AEOLIAN_b1],
        [Language.ENG, "LYDIAN b7", ScaleChromatic.LYDIAN_b7],
        [Language.ENG, "blues b5", ScaleChromatic.BLUES_b5],
        [Language.ENG, "SUPERLOCRIAN bb7", ScaleChromatic.SUPERLOCRIAN_bb7],
    ])('name', (lang, str, expected) => {
        test(`${lang.id} - ${str} => ${expected}`, async () => {
            Settings.lang = lang;
            expect(ScaleChromatic.fromString(str)).toBe(expected);
        });
    })

    describe.each([
        [Language.ESP, "MAJOR"],
        [Language.ENG, "MAYOR"],
    ])('name - error', (lang, str) => {
        test(`${lang.id} - ${str}`, async () => {
            Settings.lang = lang;
            const t = () => {
                ScaleChromatic.fromString(str)
            };
            expect(t).toThrow(Error);
        });
    })

    describe.each([
        ["2-2-1-2-2-2-1", ScaleChromatic.MAJOR],
        ["2:2-1:2-2:2-1", ScaleChromatic.MAJOR],
        ["2 2 1 2-2 2:1", ScaleChromatic.MAJOR],
        ["2:2-1 2-2:2-1", ScaleChromatic.MAJOR],
        ["2-2-1-2-2-2-1", ScaleChromatic.MAJOR],
        ["2:2-1:2-2:2-1", ScaleChromatic.MAJOR],
        ["2 2 1 2-2 2:1", ScaleChromatic.MAJOR],
    ])('intraIntervals', (str, expected) => {
        describe.each([
            Language.ENG,
            Language.ESP,
        ])("lang", (lang) => {
            test(`${lang.id} - ${str} => ${expected}`, async () => {
                Settings.lang = lang;
                expect(ScaleChromatic.fromString(str)).toBe(expected);
            });
        })
    })
})