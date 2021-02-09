import { Language, LanguageInterface, Settings } from "../../../../config";
import { IntervalDiatonicAlt } from "../../../../intervals";
import { DiatonicAlt } from "../../octave/alt/DiatonicAlt";
import { SPNAlt } from "./SPNAlt";

const toStringCases = <[LanguageInterface, SPNAlt, string][]>[
    [Language.ENG, SPNAlt.A4, "A4"],
    [Language.ESP, SPNAlt.A4, "La4"],
]
describe.each(toStringCases)
    ('toString', (lang: LanguageInterface, base: SPNAlt, expected: string) => {
        it(`degree=${base.degree} octave=${base.octave} toString= ${expected} = ${expected}`, () => {
            Settings.lang = lang;
            let actual: string = base.toString();

            expect(actual).toBe(expected);
        })
    });

const withShiftCases = <[SPNAlt, IntervalDiatonicAlt, SPNAlt][]>[
    [SPNAlt.C4, IntervalDiatonicAlt.PERFECT_UNISON, SPNAlt.C4],
    [SPNAlt.C4, IntervalDiatonicAlt.PERFECT_OCTAVE, SPNAlt.C5],
    [SPNAlt.C4, IntervalDiatonicAlt.PERFECT_FIFTH, SPNAlt.G4],
    [SPNAlt.FF4, IntervalDiatonicAlt.DIMINISHED_FIFTH, SPNAlt.C5],
    [SPNAlt.FF4, IntervalDiatonicAlt.DOUBLY_AUGMENTED_FOURTH, SPNAlt.from(DiatonicAlt.BBB, 4)],
    [SPNAlt.from(DiatonicAlt.Gb, 4), IntervalDiatonicAlt.DIMINISHED_FIFTH, SPNAlt.from(DiatonicAlt.Dbb, 5)],
    [SPNAlt.FF4, IntervalDiatonicAlt.PERFECT_FIFTH, SPNAlt.CC5],
]

describe.each(withShiftCases)
    ('withAdd', (base: SPNAlt, interval: IntervalDiatonicAlt, expected: SPNAlt) => {
        it(`${base} + ${interval} = ${expected}`, () => {
            let actual = base.withAdd(interval);

            expect(actual).toBe(expected);
        })
    });

describe.each(withShiftCases)
    ('withSub', (expected: SPNAlt, interval: IntervalDiatonicAlt, base: SPNAlt) => {
        it(`${base} - ${interval} = ${expected}`, () => {
            let actual = base.withSub(interval);

            expect(actual).toBe(expected);
        })
    });