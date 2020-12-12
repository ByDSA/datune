import { ParserBottomUp } from "@datune/utils/parser/Parser";
import { RootPatternBuilder } from '../chords/builders/RootPatternBuilder';
import { DiatonicAltChord } from '../chords/DiatonicAltChord';
import { Chromatic } from '../degrees/Chromatic';
import { DiatonicAlt } from '../degrees/DiatonicAlt';
import { IntervalDiatonicAlt } from '../intervals/IntervalDiatonicAlt';
import { ChromaticPattern } from '../patterns/ChromaticPattern';
import { DiatonicAltPattern } from '../patterns/DiatonicAltPattern';
import { DiatonicPattern } from '../patterns/DiatonicPattern';
import { Scale } from '../scales/Scale';
import { HashingObjectType, TonalityCache } from './TonalityCache';
import { TonalityStaticNames } from './TonalityStaticNames';

export class Tonality extends TonalityStaticNames {
    private static _cache = new TonalityCache((hashingObject: HashingObjectType) => new Tonality(hashingObject.root, hashingObject.scale));

    private _notes: DiatonicAlt[] = [];
    private _rootChord3: DiatonicAltChord;
    private _rootChord4: DiatonicAltChord;

    private constructor(private _root: DiatonicAlt, private _scale: Scale) {
        super();
        this.calculateNotes();
        this.calculateRootChord();
    }

    static fromChromatic(chromaticRoot: Chromatic, scale: Scale) {
        let root = DiatonicAlt.fromChromatic(chromaticRoot);
        return Tonality.from(root, scale);
    }

    static from(root: DiatonicAlt, scale: Scale) {
        return this._cache.getOrCreate({ root: root, scale: scale });
    }

    static fromString(strValue: string): Tonality {
        strValue = this.normalizeInputString(strValue);

        let parser = new ParserBottomUp()
            .from(strValue)
            .expected([DiatonicAlt.name, Scale.name])
            .add(DiatonicAlt.name, function (str: string): DiatonicAlt {
                return DiatonicAlt.fromString(str);
            })
            .add(Scale.name, function (str: string): Scale {
                return Scale.fromString(str);
            });

        let objects = parser.parse();

        if (objects)
            return Tonality.from(objects[0], objects[1]);

        throw new Error("Can't get Tonality from string: " + strValue);
    }

    private static normalizeInputString(strValue: string): string {
        strValue = strValue.replace(/ /g, '')
            .toLowerCase();
        return strValue;
    }

    private calculateNotes(): void {
        this._notes.push(this.root);
        let i = 2;
        for (let interval of this.scale.intraIntervals) {
            if (i > this.scale.intraIntervals.length)
                break;
            let lastNote = this._notes[this._notes.length - 1];
            let note = lastNote.withAdd(interval);
            this._notes.push(note);
            i++;
        }

        Object.freeze(this._notes);
    }

    private calculateRootChord() {
        this.calculateRootChord3();
        this.calculateRootChord4();

    }

    private calculateRootChord3() {
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

        this._rootChord3 = null;
        for (const pattern of chordRootPatternPriority) {
            let note = this.root.withAdd(pattern.interval);
            let chord = <DiatonicAltChord>RootPatternBuilder.create()
                .setRoot(note)
                .setPattern(pattern.pattern)
                .build();

            if (this.containsChord(chord)) {
                this._rootChord3 = chord;
                break;
            }
        }

        Object.freeze(this._rootChord3);
    }

    private calculateRootChord4() {
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

        this._rootChord4 = null;
        for (const pattern of chordRootPatternPriority) {
            let chord = <DiatonicAltChord>RootPatternBuilder.create()
                .setRoot(this.root)
                .setPattern(pattern)
                .build();
            if (this.containsChord(chord)) {
                this._rootChord4 = chord;
                break;
            }
        }

        Object.freeze(this._rootChord4);
    }

    containsChord(chord: DiatonicAltChord): boolean {
        for (let diatonicAlt of chord.notes) {
            if (!this.containsNote(diatonicAlt))
                return false;
        }

        return true;
    }

    containsNote(note: DiatonicAlt): boolean {
        return this.notes.includes(note);
    }

    get root(): DiatonicAlt {
        return this._root;
    }

    get rootChord3(): DiatonicAltChord {
        return this._rootChord3;
    }

    get rootChord4(): DiatonicAltChord {
        return this._rootChord4;
    }

    get scale(): Scale {
        return this._scale;
    }

    get length(): number {
        return this._scale.length;
    }

    get notes(): DiatonicAlt[] {
        return Array.from(this._notes);
    }

    hashCode(): string {
        return "tonality:" + this.root.valueOf() + "|" + this.scale.hashCode();
    }

    toString(): string {
        return this.root.toString() + " " + this.scale.toString();
    }
}