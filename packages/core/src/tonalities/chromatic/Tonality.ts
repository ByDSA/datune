import { NonEmptyArray, ParserBottomUp } from "@datune/utils";
import { Chord, ChromaticArray } from "../../chords";
import { ChromaticInterval } from "../../intervals";
import { Chromatic } from "../../pitches";
import { Scale } from "../../scales";
import { ChromaticPattern } from "../../voicings";
import { TonalityAbstract } from "../TonalityAbstract";
import { HashingObjectType, TonalityCache } from './building/cache/TonalityCache';

export type TonalityArray = NonEmptyArray<Tonality>;
export class Tonality extends TonalityAbstract<ChromaticInterval, ChromaticPattern, Chromatic, Scale, Chord> {
    private static _cache = new TonalityCache((hashingObject: HashingObjectType) => new Tonality(hashingObject.root, hashingObject.scale));

    private constructor(_root: Chromatic, _scale: Scale) {
        super(_root, _scale);
    }

    static from(root: Chromatic, scale: Scale): Tonality {
        return this._cache.getOrCreate({ root: root, scale: scale });
    }

    static fromString(strValue: string): Tonality | null {
        strValue = this.normalizeInputString(strValue);

        let parser = new ParserBottomUp()
            .from(strValue)
            .expected([Chromatic.name, Scale.name])
            .add(Chromatic.name, function (str: string): Chromatic | null {
                return Chromatic.fromString(str);
            })
            .add(Scale.name, function (str: string): Scale | null {
                return Scale.fromString(str);
            });

        let objects = parser.parse();

        if (objects)
            return Tonality.from(objects[0], objects[1]);

        return null;
    }

    private static normalizeInputString(strValue: string): string {
        strValue = strValue.replace(/ /g, '')
            .toLowerCase();
        return strValue;
    }

    protected calcNotes(): ChromaticArray {
        let ret: ChromaticArray = [this.root];
        const intraIntervals = this.scale.intraIntervals;
        for (let i = 0; i < intraIntervals.length - 1; i++) {
            const interval = intraIntervals[i];
            let lastNote: Chromatic = ret[ret.length - 1];
            let chromatic: Chromatic = lastNote.withShift(interval);
            ret.push(chromatic);
        }

        return ret;
    }

    get notes(): ChromaticArray {
        return super.notes;
    }

    protected calcRootChord3(): Chord | null {
        let chordRootPatternPriority = [
            ChromaticPattern.TRIAD_MAJOR,
            ChromaticPattern.TRIAD_MINOR,
            ChromaticPattern.TRIAD_DIMINISHED,
            ChromaticPattern.TRIAD_AUGMENTED
        ];

        let rootChord3 = null;
        mainLoop: for (const pattern of chordRootPatternPriority) {
            for (let i = 0; i < pattern.length; i++) {
                let patternInv = pattern;
                if (i > 0)
                    patternInv = patternInv.withInv(i);
                let chord = Chord.fromRootPattern(this.root, patternInv);

                if (this.hasChord(chord)) {
                    rootChord3 = chord;
                    break mainLoop;
                }
            }
        }

        return rootChord3;
    }

    protected calcRootChord4(): Chord | null {
        let chordRootPatternPriority = [
            ChromaticPattern.fromRootIntervals(0, 4, 7, 11),
            ChromaticPattern.fromRootIntervals(0, 3, 7, 11),
            ChromaticPattern.fromRootIntervals(0, 4, 7, 10),
            ChromaticPattern.fromRootIntervals(0, 3, 7, 10),
            ChromaticPattern.fromRootIntervals(0, 3, 6, 10),
            ChromaticPattern.fromRootIntervals(0, 3, 6, 11),
            ChromaticPattern.fromRootIntervals(0, 4, 8, 10),
            ChromaticPattern.fromRootIntervals(0, 4, 8, 11)
        ];

        let rootChord4 = null;
        for (const pattern of chordRootPatternPriority) {
            if (!pattern)
                continue;
            let chord = Chord.fromRootPattern(this.root, pattern);

            if (this.hasChord(chord)) {
                rootChord4 = chord;
                break;
            }
        }

        return rootChord4;
    }

    toString(): string {
        return this.root.toString() + " " + this.scale.toString();
    }

    hashCode(): string {
        return "tonality:" + this.root.valueOf() + "|" + this.scale.hashCode();
    }

    // SETS
    static get C(): Tonality {
        if (!_C)
            _C = _C = Tonality.from(Chromatic.C, Scale.MAJOR);
        return _C;
    }
    static get CC(): Tonality {
        if (!_CC)
            _CC = Tonality.from(Chromatic.CC, Scale.MAJOR);
        return _CC;
    }
    static get D(): Tonality {
        if (!_D)
            _D = Tonality.from(Chromatic.CC, Scale.MAJOR);
        return _D;
    }
    static get DD(): Tonality {
        if (!_DD)
            _DD = Tonality.from(Chromatic.DD, Scale.MAJOR);
        return _DD;
    }
    static get E(): Tonality {
        if (!_E)
            _E = Tonality.from(Chromatic.E, Scale.MAJOR);
        return _E;
    }
    static get F(): Tonality {
        if (!_F)
            _F = Tonality.from(Chromatic.F, Scale.MAJOR);
        return _F;
    }
    static get FF(): Tonality {
        if (!_FF)
            _FF = Tonality.from(Chromatic.FF, Scale.MAJOR);
        return _FF;
    }
    static get G(): Tonality {
        if (!_G)
            _G = Tonality.from(Chromatic.G, Scale.MAJOR);
        return _G;
    }
    static get GG(): Tonality {
        if (!_GG)
            _GG = Tonality.from(Chromatic.GG, Scale.MAJOR);
        return _GG;
    }
    static get A(): Tonality {
        if (!_A)
            _A = Tonality.from(Chromatic.A, Scale.MAJOR);
        return _A;
    }
    static get AA(): Tonality {
        if (!_AA)
            _AA = Tonality.from(Chromatic.AA, Scale.MAJOR);
        return _AA;
    }
    static get B(): Tonality {
        if (!_B)
            _B = Tonality.from(Chromatic.B, Scale.MAJOR);
        return _B;
    }

    static get Cm(): Tonality {
        if (!_Cm)
            _Cm = Tonality.from(Chromatic.C, Scale.MINOR);
        return _Cm;
    }
    static get CCm(): Tonality {
        if (!_CCm)
            _CCm = Tonality.from(Chromatic.CC, Scale.MINOR);
        return _CCm;
    }
    static get Dm(): Tonality {
        if (!_Dm)
            _Dm = Tonality.from(Chromatic.D, Scale.MINOR);
        return _Dm;
    }
    static get DDm(): Tonality {
        if (!_DDm)
            _DDm = Tonality.from(Chromatic.DD, Scale.MINOR);
        return _DDm;
    }
    static get Em(): Tonality {
        if (!_Em)
            _Em = Tonality.from(Chromatic.E, Scale.MINOR);
        return _Em;
    }
    static get Fm(): Tonality {
        if (!_Fm)
            _Fm = Tonality.from(Chromatic.F, Scale.MINOR);
        return _Fm;
    }
    static get FFm(): Tonality {
        if (!_FFm)
            _FFm = Tonality.from(Chromatic.FF, Scale.MINOR);
        return _FFm;
    }
    static get Gm(): Tonality {
        if (!_Gm)
            _Gm = Tonality.from(Chromatic.G, Scale.MINOR);
        return _Gm;
    }
    static get GGm(): Tonality {
        if (!_GGm)
            _GGm = Tonality.from(Chromatic.GG, Scale.MINOR);
        return _GGm;
    }
    static get Am(): Tonality {
        if (!_Am)
            _Am = Tonality.from(Chromatic.A, Scale.MINOR);
        return _Am;
    }
    static get AAm(): Tonality {
        if (!_AAm)
            _AAm = Tonality.from(Chromatic.AA, Scale.MINOR);
        return _AAm;
    }
    static get Bm(): Tonality {
        if (!_Bm)
            _Bm = Tonality.from(Chromatic.B, Scale.MINOR);
        return _Bm;
    }
}

let _C: Tonality, _CC: Tonality, _D: Tonality, _DD: Tonality, _E: Tonality, _F: Tonality, _FF: Tonality, _G: Tonality, _GG: Tonality, _A: Tonality, _AA: Tonality, _B: Tonality;
let _Cm: Tonality, _CCm: Tonality, _Dm: Tonality, _DDm: Tonality, _Em: Tonality, _Fm: Tonality, _FFm: Tonality, _Gm: Tonality, _GGm: Tonality, _Am: Tonality, _AAm: Tonality, _Bm: Tonality;