import { Immutables } from '../../common/Immutables';
import { rotativeTrim } from '../../common/MathUtils';
import { PrecalcCache } from '../../common/PrecalcCache';
import { arrayRotateLeft } from '../../common/Utils';
import { Chromatic } from '../../degrees/Chromatic';
import { NameChordCalculator } from '../../lang/naming/NameChordCalculator';
import { ChromaticPattern } from '../../patterns/ChromaticPattern';
import { Chord } from '../Chord';

type HashingObjectType = Chromatic[];
export class ChromaticChord implements Chord<Chromatic, number> {
    // Precalc
    public static C;
    public static Dm;
    public static C7;
    public static Dm7;

    private static _cache = new (class Cache extends PrecalcCache<ChromaticChord, HashingObjectType> {
        getHash(hashingObject: HashingObjectType): string {
            let ret = "";
            for (const chromatic of hashingObject)
                ret += chromatic.valueOf() + ":";

            return ret;
        }

        getHashingObject(chromaticChord: ChromaticChord): HashingObjectType {
            return chromaticChord.notes;
        }

        create(hashingObject: HashingObjectType): ChromaticChord {
            return new ChromaticChord(hashingObject);
        }
    });

    private constructor(private _notes: Chromatic[]) {
    }

    public static from(notes: Chromatic[]): ChromaticChord {
        return this._cache.getOrCreate(notes);
    }

    public get root(): Chromatic {
        return this.notes[this.rootIndex];
    }

    public get rootIndex(): number {
        return this.pattern.rootIndex;
    }

    public get inversionNumber(): number {
        return this.pattern.inversionNumber;
    }

    public get notes(): Chromatic[] {
        return Array.from(this._notes);
    }

    public withInv(n: number = 1): ChromaticChord {
        let rootIndex = this.rootIndex - n;
        rootIndex = rotativeTrim(rootIndex, this._notes.length);
        let notes = this.notes;
        notes = arrayRotateLeft(notes, n);

        return ChromaticChord.from(notes);
    }

    public withShift(interval: number): ChromaticChord {
        let notes: Chromatic[] = this.notes.map(note => note.getShift(interval));

        return ChromaticChord.from(notes);
    }

    public get pattern(): ChromaticPattern {
        let patternArray = this.getRootIntervalsArray();

        return ChromaticPattern.fromRootIntervals(...patternArray);
    }

    private getRootIntervalsArray(): number[] {
        let patternArray = [0];
        let last: Chromatic;

        let unsortedNotes: Chromatic[] = this.notes;

        let first = true;
        unsortedNotes.forEach(current => {
            if (first) {
                first = false;
                last = current;
                return;
            }

            let dist = rotativeTrim(current.intValue - last.intValue, Chromatic.NUMBER);
            patternArray.push(dist);
        });

        return patternArray;
    }

    public toString(): string {
        return new NameChordCalculator(this).get();
    }

    private static initialize() {
        this.C = ChromaticChord.from([Chromatic.C, Chromatic.E, Chromatic.G]);
        this.Dm = ChromaticChord.from([Chromatic.D, Chromatic.F, Chromatic.A]);
        this.C7 = ChromaticChord.from([Chromatic.C, Chromatic.E, Chromatic.G, Chromatic.AA]);
        this.Dm7 = ChromaticChord.from([Chromatic.D, Chromatic.F, Chromatic.A, Chromatic.AA]);

        Immutables.lockrIf(ChromaticChord, (obj) => !(obj instanceof PrecalcCache));

    }
}