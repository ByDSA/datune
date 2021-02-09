import { ParserBottomUp } from "@datune/utils";
import { ChordAlt, DiatonicAltArray } from "../../chords";
import { RootPatternAltBuilder } from "../../chords/octave/alt/building/builders/rootpattern/RootPatternAltBuilder";
import { IntervalDiatonicAlt } from "../../intervals";
import { DiatonicAlt } from "../../pitches";
import { ScaleAlt } from "../../scales";
import { ChromaticPattern, DiatonicAltPattern, DiatonicPattern } from "../../voicings";
import { Tonality } from "../chromatic/Tonality";
import { TonalityAbstract } from "../TonalityAbstract";
import { HashingObjectType, TonalityAltCache } from './building/cache/TonalityAltCache';

export class TonalityAlt extends TonalityAbstract<IntervalDiatonicAlt, DiatonicAltPattern, DiatonicAlt, ScaleAlt, ChordAlt> {
    private static _cache = new TonalityAltCache((hashingObject: HashingObjectType) => new TonalityAlt(hashingObject.root, hashingObject.scale));

    private constructor(_root: DiatonicAlt, _scale: ScaleAlt) {
        super(_root, _scale);
    }

    static from(rootAlt: DiatonicAlt, scaleAlt: ScaleAlt) {
        return this._cache.getOrCreate({ root: rootAlt, scale: scaleAlt });
    }

    static fromString(strValue: string): TonalityAlt | null {
        strValue = this.normalizeInputString(strValue);

        let parser = new ParserBottomUp()
            .from(strValue)
            .expected([DiatonicAlt.name, ScaleAlt.name])
            .add(DiatonicAlt.name, function (str: string): DiatonicAlt | null {
                return DiatonicAlt.fromString(str);
            })
            .add(ScaleAlt.name, function (str: string): ScaleAlt | null {
                return ScaleAlt.fromString(str);
            });

        let objects = parser.parse();

        if (objects)
            return TonalityAlt.from(objects[0], objects[1]);

        return null;
    }

    private static normalizeInputString(strValue: string): string {
        strValue = strValue.replace(/ /g, '')
            .toLowerCase();
        return strValue;
    }

    protected calcNotes(): DiatonicAltArray {
        let tmp: DiatonicAltArray = [this.root];
        let i = 2;
        for (let interval of this.scale.intraIntervals) {
            if (i > this.scale.intraIntervals.length)
                break;
            let lastNote: DiatonicAlt = tmp[tmp.length - 1];
            let chromatic: DiatonicAlt = lastNote.withAdd(interval);
            tmp.push(chromatic);
            i++;
        }

        return tmp;
    }

    protected calcRootChord3(): ChordAlt | null {
        let chordRootPatternPriority = [
            { interval: IntervalDiatonicAlt.PERFECT_UNISON, pattern: DiatonicAltPattern.TRIAD_MAJOR },
            { interval: IntervalDiatonicAlt.PERFECT_UNISON, pattern: DiatonicAltPattern.TRIAD_MINOR },
            { interval: IntervalDiatonicAlt.MAJOR_THIRD, pattern: DiatonicAltPattern.TRIAD_MINOR },
            { interval: IntervalDiatonicAlt.MAJOR_THIRD, pattern: DiatonicAltPattern.TRIAD_MAJOR },
            { interval: IntervalDiatonicAlt.MINOR_THIRD, pattern: DiatonicAltPattern.TRIAD_MINOR },
            { interval: IntervalDiatonicAlt.MINOR_THIRD, pattern: DiatonicAltPattern.TRIAD_MAJOR },
            { interval: IntervalDiatonicAlt.MAJOR_SIXTH, pattern: DiatonicAltPattern.TRIAD_MINOR },
            { interval: IntervalDiatonicAlt.MAJOR_SIXTH, pattern: DiatonicAltPattern.TRIAD_MAJOR },
            { interval: IntervalDiatonicAlt.MINOR_SIXTH, pattern: DiatonicAltPattern.TRIAD_MINOR },
            { interval: IntervalDiatonicAlt.MINOR_SIXTH, pattern: DiatonicAltPattern.TRIAD_MAJOR },
            { interval: IntervalDiatonicAlt.PERFECT_UNISON, pattern: DiatonicAltPattern.TRIAD_DIMINISHED },
            { interval: IntervalDiatonicAlt.PERFECT_UNISON, pattern: DiatonicAltPattern.TRIAD_AUGMENTED },
            { interval: IntervalDiatonicAlt.MAJOR_THIRD, pattern: DiatonicAltPattern.TRIAD_DIMINISHED },
            { interval: IntervalDiatonicAlt.MAJOR_THIRD, pattern: DiatonicAltPattern.TRIAD_AUGMENTED },
            { interval: IntervalDiatonicAlt.MINOR_THIRD, pattern: DiatonicAltPattern.TRIAD_DIMINISHED },
            { interval: IntervalDiatonicAlt.MINOR_THIRD, pattern: DiatonicAltPattern.TRIAD_AUGMENTED },
            { interval: IntervalDiatonicAlt.MAJOR_SIXTH, pattern: DiatonicAltPattern.TRIAD_DIMINISHED },
            { interval: IntervalDiatonicAlt.MAJOR_SIXTH, pattern: DiatonicAltPattern.TRIAD_AUGMENTED },
            { interval: IntervalDiatonicAlt.MINOR_SIXTH, pattern: DiatonicAltPattern.TRIAD_DIMINISHED },
            { interval: IntervalDiatonicAlt.MINOR_SIXTH, pattern: DiatonicAltPattern.TRIAD_AUGMENTED },
        ];

        let rootChord3 = null;
        for (const obj of chordRootPatternPriority) {
            let chromatic = this.root.withAdd(obj.interval);
            let chord = RootPatternAltBuilder
                .from(chromatic, obj.pattern)
                .build();

            if (this.hasChord(chord)) {
                rootChord3 = chord;
                break;
            }
        }

        return rootChord3;
    }

    protected calcRootChord4(): ChordAlt | null {
        let chordRootPatternPriority = [
            DiatonicAltPattern.fromPatterns(ChromaticPattern.fromRootIntervals(0, 4, 7, 11), DiatonicPattern.SEVENTH),
            DiatonicAltPattern.fromPatterns(ChromaticPattern.fromRootIntervals(0, 3, 7, 11), DiatonicPattern.SEVENTH),
            DiatonicAltPattern.fromPatterns(ChromaticPattern.fromRootIntervals(0, 4, 7, 10), DiatonicPattern.SEVENTH),
            DiatonicAltPattern.fromPatterns(ChromaticPattern.fromRootIntervals(0, 3, 7, 10), DiatonicPattern.SEVENTH),
            DiatonicAltPattern.fromPatterns(ChromaticPattern.fromRootIntervals(0, 3, 6, 10), DiatonicPattern.SEVENTH),
            DiatonicAltPattern.fromPatterns(ChromaticPattern.fromRootIntervals(0, 3, 6, 11), DiatonicPattern.SEVENTH),
            DiatonicAltPattern.fromPatterns(ChromaticPattern.fromRootIntervals(0, 4, 8, 10), DiatonicPattern.SEVENTH),
            DiatonicAltPattern.fromPatterns(ChromaticPattern.fromRootIntervals(0, 4, 8, 11), DiatonicPattern.SEVENTH)
        ];

        let rootChord4 = null;
        for (const pattern of chordRootPatternPriority) {
            let chord = RootPatternAltBuilder
                .from(this.root, pattern)
                .build();
            if (this.hasChord(chord)) {
                rootChord4 = chord;
                break;
            }
        }

        return rootChord4;
    }

    get tonality(): Tonality {
        return Tonality.from(this.root.note, this.scale.scale);
    }

    toString(): string {
        return this.root.toString() + " " + this.scale.toString();
    }

    hashCode(): string {
        return "tonality:" + this.root.valueOf() + "|" + this.scale.hashCode();
    }

    // SETS
    static get C(): TonalityAlt {
        if (!_C)
            _C = _C = TonalityAlt.from(DiatonicAlt.C, ScaleAlt.MAJOR);
        return _C;
    }
    static get CC(): TonalityAlt {
        if (!_CC)
            _CC = TonalityAlt.from(DiatonicAlt.CC, ScaleAlt.MAJOR);
        return _CC;
    }
    static get D(): TonalityAlt {
        if (!_D)
            _D = TonalityAlt.from(DiatonicAlt.D, ScaleAlt.MAJOR);
        return _D;
    }
    static get DD(): TonalityAlt {
        if (!_DD)
            _DD = TonalityAlt.from(DiatonicAlt.DD, ScaleAlt.MAJOR);
        return _DD;
    }
    static get E(): TonalityAlt {
        if (!_E)
            _E = TonalityAlt.from(DiatonicAlt.E, ScaleAlt.MAJOR);
        return _E;
    }
    static get F(): TonalityAlt {
        if (!_F)
            _F = TonalityAlt.from(DiatonicAlt.F, ScaleAlt.MAJOR);
        return _F;
    }
    static get FF(): TonalityAlt {
        if (!_FF)
            _FF = TonalityAlt.from(DiatonicAlt.FF, ScaleAlt.MAJOR);
        return _FF;
    }
    static get G(): TonalityAlt {
        if (!_G)
            _G = TonalityAlt.from(DiatonicAlt.G, ScaleAlt.MAJOR);
        return _G;
    }
    static get GG(): TonalityAlt {
        if (!_GG)
            _GG = TonalityAlt.from(DiatonicAlt.GG, ScaleAlt.MAJOR);
        return _GG;
    }
    static get A(): TonalityAlt {
        if (!_A)
            _A = TonalityAlt.from(DiatonicAlt.A, ScaleAlt.MAJOR);
        return _A;
    }
    static get AA(): TonalityAlt {
        if (!_AA)
            _AA = TonalityAlt.from(DiatonicAlt.AA, ScaleAlt.MAJOR);
        return _AA;
    }
    static get B(): TonalityAlt {
        if (!_B)
            _B = TonalityAlt.from(DiatonicAlt.B, ScaleAlt.MAJOR);
        return _B;
    }

    static get Cm(): TonalityAlt {
        if (!_Cm)
            _Cm = TonalityAlt.from(DiatonicAlt.C, ScaleAlt.MINOR);
        return _Cm;
    }
    static get CCm(): TonalityAlt {
        if (!_CCm)
            _CCm = TonalityAlt.from(DiatonicAlt.CC, ScaleAlt.MINOR);
        return _CCm;
    }
    static get Dm(): TonalityAlt {
        if (!_Dm)
            _Dm = TonalityAlt.from(DiatonicAlt.D, ScaleAlt.MINOR);
        return _Dm;
    }
    static get DDm(): TonalityAlt {
        if (!_DDm)
            _DDm = TonalityAlt.from(DiatonicAlt.DD, ScaleAlt.MINOR);
        return _DDm;
    }
    static get Em(): TonalityAlt {
        if (!_Em)
            _Em = TonalityAlt.from(DiatonicAlt.E, ScaleAlt.MINOR);
        return _Em;
    }
    static get Fm(): TonalityAlt {
        if (!_Fm)
            _Fm = TonalityAlt.from(DiatonicAlt.F, ScaleAlt.MINOR);
        return _Fm;
    }
    static get FFm(): TonalityAlt {
        if (!_FFm)
            _FFm = TonalityAlt.from(DiatonicAlt.FF, ScaleAlt.MINOR);
        return _FFm;
    }
    static get Gm(): TonalityAlt {
        if (!_Gm)
            _Gm = TonalityAlt.from(DiatonicAlt.G, ScaleAlt.MINOR);
        return _Gm;
    }
    static get GGm(): TonalityAlt {
        if (!_GGm)
            _GGm = TonalityAlt.from(DiatonicAlt.GG, ScaleAlt.MINOR);
        return _GGm;
    }
    static get Am(): TonalityAlt {
        if (!_Am)
            _Am = TonalityAlt.from(DiatonicAlt.A, ScaleAlt.MINOR);
        return _Am;
    }
    static get AAm(): TonalityAlt {
        if (!_AAm)
            _AAm = TonalityAlt.from(DiatonicAlt.AA, ScaleAlt.MINOR);
        return _AAm;
    }
    static get Bm(): TonalityAlt {
        if (!_Bm)
            _Bm = TonalityAlt.from(DiatonicAlt.B, ScaleAlt.MINOR);
        return _Bm;
    }
}

let _C: TonalityAlt, _CC: TonalityAlt, _D: TonalityAlt, _DD: TonalityAlt, _E: TonalityAlt, _F: TonalityAlt, _FF: TonalityAlt, _G: TonalityAlt, _GG: TonalityAlt, _A: TonalityAlt, _AA: TonalityAlt, _B: TonalityAlt;
let _Cm: TonalityAlt, _CCm: TonalityAlt, _Dm: TonalityAlt, _DDm: TonalityAlt, _Em: TonalityAlt, _Fm: TonalityAlt, _FFm: TonalityAlt, _Gm: TonalityAlt, _GGm: TonalityAlt, _Am: TonalityAlt, _AAm: TonalityAlt, _Bm: TonalityAlt;