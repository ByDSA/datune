import { ChromaticChord } from '../../chords/chromatic/ChromaticChord';
import { Immutables } from '../../common/Immutables';
import { PrecalcCache } from '../../common/PrecalcCache';
import { MathUtils } from '../../common/MathUtils';
import { Utils } from '../../common/Utils';
import { DiatonicAlt } from '../../degrees/DiatonicAlt';
import { IntervalDiatonicAlt } from '../../interval/IntervalDiatonicAlt';
import { NameChordCalculator } from '../../lang/naming/NameChordCalculator';
import { DiatonicAltPattern } from '../../patterns/DiatonicAltPattern';
import { Chord } from '../Chord';
import { RootPatternChord } from '../root-pattern/RootPatternChord';

type HashingObjectType = DiatonicAlt[];
export class DiatonicAltChord implements Chord<DiatonicAlt, IntervalDiatonicAlt> {
    // Precalc
    public static C: DiatonicAltChord;
    public static D: DiatonicAltChord;
    public static E: DiatonicAltChord;
    public static F: DiatonicAltChord;
    public static G: DiatonicAltChord;
    public static A: DiatonicAltChord;
    public static B: DiatonicAltChord;

    public static Cm: DiatonicAltChord;
    public static Dm: DiatonicAltChord;
    public static Em: DiatonicAltChord;
    public static Fm: DiatonicAltChord;
    public static Gm: DiatonicAltChord;
    public static Am: DiatonicAltChord;
    public static Bm: DiatonicAltChord;

    public static CMaj7: DiatonicAltChord;
    public static Csus4: DiatonicAltChord;
    public static Fsus2: DiatonicAltChord;
    public static FMaj7: DiatonicAltChord;

    public static CmMaj7: DiatonicAltChord;

    public static C7: DiatonicAltChord;
    public static C0: DiatonicAltChord;

    private static immutablesCache = new PrecalcCache<DiatonicAltChord, HashingObjectType>(
        function (hashingObject: HashingObjectType) {
            let ret = "";
            for (let diatonicAlt of hashingObject)
                ret += "d" + diatonicAlt.valueOf();

            return ret;
        },
        function (diatonicAltChord: DiatonicAltChord): HashingObjectType {
            return diatonicAltChord.notes;
        },
        function (hashingObject: HashingObjectType): DiatonicAltChord {
            return new DiatonicAltChord(hashingObject);
        }
    );

    private constructor(private _notes: DiatonicAlt[]) {
        Immutables.lockr(this);
    }

    public static from(notes: readonly DiatonicAlt[]): DiatonicAltChord {
        if (!notes)
            return null;
        const nonNullNotes = notes.filter(note => note);
        if (nonNullNotes.length === 0)
            return null;
        return DiatonicAltChord.immutablesCache.getOrCreate(nonNullNotes);
    }

    public withInv(n: number = 1): DiatonicAltChord {
        let rootIndex = this.rootIndex - n;
        rootIndex = MathUtils.rotativeTrim(rootIndex, this._notes.length);
        let notes = this.notes;
        notes = Utils.arrayRotateLeft(notes, n);
        return DiatonicAltChord.from(notes);
    }

    public withAdd(interval: IntervalDiatonicAlt): DiatonicAltChord {
        let notes: DiatonicAlt[] = this.notes.map(note => note.getAdd(interval));

        return DiatonicAltChord.from(notes);
    }

    public withSub(interval: IntervalDiatonicAlt): DiatonicAltChord {
        let notes: DiatonicAlt[] = this.notes.map(note => note.getSub(interval));

        return DiatonicAltChord.from(notes);
    }

    withBass(bass: DiatonicAlt): DiatonicAltChord {
        const oldIndexOfNewBass = this.notes.indexOf(bass);
        if (oldIndexOfNewBass < 0)
            return null;

        return this.withInv(oldIndexOfNewBass);
    }

    public get root(): DiatonicAlt {
        return this._notes[this.rootIndex];
    }

    public get rootIndex(): number {
        return this.pattern.rootIndex;
    }

    public get inversionNumber(): number {
        return this.pattern.inversionNumber;
    }

    public get notes(): DiatonicAlt[] {
        return Array.from(this._notes);
    }

    public get length() {
        return this._notes.length;
    }

    public get pattern(): DiatonicAltPattern {
        let rootIntervals: IntervalDiatonicAlt[] = DiatonicAltChord.getRootIntervalsFromNotes(this.notes);

        return DiatonicAltPattern.fromRootIntervals(...rootIntervals);
    }

    public get chromaticChord(): ChromaticChord {
        let notesChromatic = this.notes.map((diatonicAlt: DiatonicAlt) => diatonicAlt.chromatic);

        return ChromaticChord.from(notesChromatic);
    }

    private static getRootIntervalsFromNotes(notes: DiatonicAlt[]): IntervalDiatonicAlt[] {
        let rootIntervals: IntervalDiatonicAlt[] = [];
        for (let i = 0; i < notes.length; i++) {
            let rootInterval = IntervalDiatonicAlt.between(notes[0], notes[i]);
            while (i > 0 && rootIntervals[i - 1].intervalChromatic >= rootInterval.intervalChromatic)
                rootInterval = rootInterval.getAdd(IntervalDiatonicAlt.PERFECT_OCTAVE);
            rootIntervals.push(rootInterval);
        }

        return rootIntervals;
    }

    public toString(): string {
        return new NameChordCalculator(this).get();
    }

    private static diatonicAlt2Str(diatonicAlt: DiatonicAlt): string {
        switch (diatonicAlt) {
            case DiatonicAlt.C: return "C";
            case DiatonicAlt.CC: return "CC";
            case DiatonicAlt.Db: return "Db";
            case DiatonicAlt.D: return "D";
            case DiatonicAlt.DD: return "DD";
            case DiatonicAlt.Eb: return "Eb";
            case DiatonicAlt.E: return "E";
            case DiatonicAlt.Fb: return "Fb";
            case DiatonicAlt.F: return "F";
            case DiatonicAlt.FF: return "FF";
            case DiatonicAlt.Gb: return "Gb";
            case DiatonicAlt.G: return "G";
            case DiatonicAlt.GG: return "GG";
            case DiatonicAlt.Ab: return "Ab";
            case DiatonicAlt.A: return "A";
            case DiatonicAlt.AA: return "AA";
            case DiatonicAlt.Bb: return "Bb";
            case DiatonicAlt.B: return "B";
        }

        return null;
    }

    private static diatonicAltChordPattern2Str(diatonicAltChordPattern: DiatonicAltPattern): string {
        switch (diatonicAltChordPattern) {
            case DiatonicAltPattern.TRIAD_MAJOR: return "";
            case DiatonicAltPattern.TRIAD_MINOR: return "m";
            case DiatonicAltPattern.TRIAD_AUGMENTED: return "AUG";
            case DiatonicAltPattern.TRIAD_DIMINISHED: return "0";
            case DiatonicAltPattern.TRIAD_SUS4: return "sus4";
            case DiatonicAltPattern.TRIAD_SUS2: return "sus2";
            case DiatonicAltPattern.SEVENTH_MAJ7: return "Maj7";
            case DiatonicAltPattern.SEVENTH: return "7";
            case DiatonicAltPattern.SEVENTH_MINOR: return "m7";
            case DiatonicAltPattern.SEVENTH_MINOR_MAJ7: return "mMaj7";
            case DiatonicAltPattern.THIRTEENTH_b5a9: return "13b5a9";
        }

        return null;
    }

    private static initialize() {
        let diatonicAlts = [
            DiatonicAlt.C,
            DiatonicAlt.CC,
            DiatonicAlt.Db,
            DiatonicAlt.D,
            DiatonicAlt.DD,
            DiatonicAlt.Eb,
            DiatonicAlt.E,
            DiatonicAlt.Fb,
            DiatonicAlt.F,
            DiatonicAlt.FF,
            DiatonicAlt.Gb,
            DiatonicAlt.G,
            DiatonicAlt.GG,
            DiatonicAlt.Ab,
            DiatonicAlt.A,
            DiatonicAlt.AA,
            DiatonicAlt.Bb,
            DiatonicAlt.B,
        ];

        let diatonicAltChordPatterns = DiatonicAltPattern.all();

        for (const diatonicAlt of diatonicAlts) {
            const diatonicAltStr = this.diatonicAlt2Str(diatonicAlt);
            if (diatonicAltStr == null)
                continue;

            for (const diatonicAltChordPattern of diatonicAltChordPatterns) {
                const diatonicAltChordPatternStr = this.diatonicAltChordPattern2Str(diatonicAltChordPattern);
                if (diatonicAltChordPatternStr == null)
                    continue;

                const name = diatonicAltStr + diatonicAltChordPatternStr;

                DiatonicAltChord[name] = RootPatternChord.from(diatonicAlt, diatonicAltChordPattern).chord;
            }
        }

        Immutables.lockrIf(DiatonicAltChord, (obj) => !(obj instanceof PrecalcCache));
    }
}