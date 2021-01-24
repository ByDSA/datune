import { NumberArray } from "@datune/utils";
import { Language, Settings } from "../../../../config";
import { ChromaticIntervalArray } from "../../../../intervals/symbolic/chromatic/ChromaticInterval";
import { Scale } from "./Scale";

describe('precalc', () => {
    describe.each(Scale.sets.all())
        ('sets.all() not undefined', (scale) => {
            test(`${scale}`, async () => {
                expect(scale).toBeDefined();
            })
        });

    test('manual', async () => {
        let scale = Scale.MAJOR;

        expect(scale).toBe(Scale.MAJOR);
    });
})

describe('getModeIntraIntervals', () => {
    test('-III  = MINOR.intervals', async () => {
        let actual: number[] = (<any>Scale.MAJOR).getModeIntraIntervals(-3);
        let expected: number[] = [2, 1, 2, 2, 1, 2, 2];

        expect(actual).toStrictEqual(expected);
    });

    test('VI  = MINOR.intervals', async () => {
        let actual: number[] = (<any>Scale.MAJOR).getModeIntraIntervals(6);
        let expected: number[] = [2, 1, 2, 2, 1, 2, 2];

        expect(actual).toStrictEqual(expected);
    });
})

describe.each([
    [1, Scale.MAJOR, Scale.MAJOR],
    [-1, Scale.MAJOR, Scale.MAJOR],
    [2, Scale.MAJOR, Scale.DORIAN],
    [-2, Scale.MAJOR, Scale.LOCRIAN],
])('getMode', (modeNumber: number, scaleBase, expected) => {
    test(`${modeNumber} of ${scaleBase} => ${expected}`, async () => {
        let mode = scaleBase.getMode(modeNumber);
        expect(mode).toBe(expected);
    });
})

test('degrees not null or undefined', async () => {
    for (let scale of Scale.sets.all()) {
        expect(scale.degrees).not.toBeNull();
    }
});

describe.each([
    [Scale.MAJOR, [0, 2, 4, 5, 7, 9, 11]],
    [Scale.MINOR, [0, 2, 3, 5, 7, 8, 10]],
    [Scale.MIXOLYDIAN, [0, 2, 4, 5, 7, 9, 10]],
])('degrees', (scale, expectedDegrees) => {
    test(`${scale} => ${expectedDegrees}`, async () => {
        let degrees = scale.degrees;
        expect(degrees).toStrictEqual(expectedDegrees);
    });
})

describe.each(<[Scale, ChromaticIntervalArray][]>[
    [Scale.MAJOR, [2, 2, 1, 2, 2, 2, 1]],
    [Scale.BLUES_b5, [3, 2, 1, 1, 3, 2]],
    [Scale.BLUES_a4, [3, 2, 1, 1, 3, 2]],
    [Scale.PENTATONIC_MINOR, [3, 2, 2, 3, 2]],
    [Scale.PENTATONIC, [2, 2, 3, 2, 3]],
    [Scale.EGYPCIAN, [2, 3, 2, 3, 2]],
    [Scale.BLUES_MINOR, [3, 2, 3, 2, 2]],
    [Scale.BLUES_MAJOR, [2, 3, 2, 2, 3]],
    [Scale.BEBOP_DOMINANT, [2, 2, 1, 2, 2, 1, 1, 1]],
    [Scale.BLUES_b5.modes[4], [3, 2, 3, 2, 1, 1]],
])('intraIntervals', (scale, intraIntervals: ChromaticIntervalArray) => {
    test(`${scale} => ${intraIntervals}`, async () => {
        let degrees = scale.intraIntervals;
        expect(degrees).toStrictEqual(intraIntervals);
    });

    test(`${intraIntervals} => ${scale}`, async () => {
        let actual = Scale.fromIntraIntervals(...intraIntervals);
        expect(actual).toBe(scale);
    });
})

test('set all: contains BLUES_a4', async () => {
    expect(Scale.sets.all().includes(Scale.BLUES_a4)).toBe(true);
});

test('fromPC: MAJOR', async () => {
    let scale = Scale.fromRootIntervals(0, 2, 4, 5, 7, 9, 11);
    expect(scale).toBe(Scale.MAJOR);
});


test('toString: all have string', async () => {
    for (let scale of Scale.sets.all()) {
        expect(scale.toString()).not.toBeNull();
        expect(scale.toString()).not.toBeUndefined();
    }
});

describe.each([
    [Language.ESP, Scale.MAJOR, "MAYOR"],
    [Language.ESP, Scale.MINOR, "MENOR"],
    [Language.ESP, Scale.AEOLIAN_b1, "LIDIA AUMENTADA ♯2"],

    [Language.ENG, Scale.MAJOR, "MAJOR"],
    [Language.ENG, Scale.MINOR, "MINOR"],
    [Language.ENG, Scale.AEOLIAN_b1, "LYDIAN AUGMENTED ♯2"],
])('toString', (lang, scale, str) => {
    test(`${lang.id} - ${scale} => ${str}`, async () => {
        Settings.lang = lang;
        expect(scale.toString()).toBe(str);
    });
    test(`${lang.id} - ${str} => ${scale}`, async () => {
        Settings.lang = lang;
        expect(Scale.fromString(str)).toBe(scale);
    });
})

describe('fromString', () => {
    describe.each([
        [Language.ESP, "  ma Yor  ", Scale.MAJOR],
        [Language.ESP, "LiDIA aume Ntada #2", Scale.AEOLIAN_b1],
        [Language.ESP, "LiDIA AUMENTada ♯2", Scale.AEOLIAN_b1],
        [Language.ESP, "LiDIA b7", Scale.LYDIAN_b7],
        [Language.ESP, "SUPERLOCRIA bb7", Scale.SUPERLOCRIAN_bb7],

        [Language.ENG, "  ma Jor  ", Scale.MAJOR],
        [Language.ENG, "LyDIAN augme Nted #2", Scale.AEOLIAN_b1],
        [Language.ENG, "LYDIAN AUGMENTED ♯2", Scale.AEOLIAN_b1],
        [Language.ENG, "LYDIAN b7", Scale.LYDIAN_b7],
        [Language.ENG, "blues b5", Scale.BLUES_b5],
        [Language.ENG, "SUPERLOCRIAN bb7", Scale.SUPERLOCRIAN_bb7],
    ])('name', (lang, str, expected) => {
        test(`${lang.id} - ${str} => ${expected}`, async () => {
            Settings.lang = lang;
            expect(Scale.fromString(str)).toBe(expected);
        });
    })

    describe.each([
        [Language.ESP, "MAJOR"],
        [Language.ENG, "MAYOR"],
    ])('name - error', (lang, str) => {
        test(`${lang.id} - ${str}`, async () => {
            Settings.lang = lang;
            const actual = Scale.fromString(str);
            expect(actual).toBeNull();
        });
    })

    describe.each([
        ["2-2-1-2-2-2-1", Scale.MAJOR],
        ["2:2-1:2-2:2-1", Scale.MAJOR],
        ["2 2 1 2-2 2:1", Scale.MAJOR],
        ["2:2-1 2-2:2-1", Scale.MAJOR],
        ["2-2-1-2-2-2-1", Scale.MAJOR],
        ["2:2-1:2-2:2-1", Scale.MAJOR],
        ["2 2 1 2-2 2:1", Scale.MAJOR],
    ])('intraIntervals', (str, expected) => {
        describe.each([
            Language.ENG,
            Language.ESP,
        ])("lang", (lang) => {
            test(`${lang.id} - ${str} => ${expected}`, async () => {
                Settings.lang = lang;
                expect(Scale.fromString(str)).toBe(expected);
            });
        })
    })
})

it(`Scale MAJOR degrees`, () => {
    const expected: NumberArray = [0, 2, 4, 5, 7, 9, 11];
    const actual = Scale.MAJOR.degrees;

    expect(actual).toStrictEqual(expected);
});