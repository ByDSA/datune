import { Immutables } from '../../common/Immutables';
import { ImmutablesCache } from '../../common/ImmutablesCache';
import { MathUtils } from '../../common/MathUtils';
import { Utils } from '../../common/Utils';
import { Chromatic } from '../../degrees/Chromatic';
import { ChromaticPattern } from '../../patterns/ChromaticPattern';
import { Chord } from '../Chord';
import { NameChordCalculator } from '../../lang/naming/NameChordCalculator';

type HashingObjectType = Chromatic[];
export class ChromaticChord implements Chord<Chromatic> {
    // Precalc

    public static C;
    public static Dm;
    public static C7;
    public static Dm7;

    private static immutablesCache = new ImmutablesCache<ChromaticChord, HashingObjectType>(
        function (hashingObject: HashingObjectType) {
            let ret = "";
            for (const chromatic of hashingObject)
                ret += chromatic.valueOf();

            return ret;
        },
        function (chromaticChord: ChromaticChord): HashingObjectType {
            return chromaticChord.notes;
        },
        function (hashingObject: HashingObjectType): ChromaticChord {
            return new ChromaticChord(hashingObject);
        }
    );

    private constructor(private _notes: Chromatic[]) {
    }

    public static from(notes: Chromatic[]): ChromaticChord {
        return this.immutablesCache.getOrCreate(notes);
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

    public getInv(n: number = 1): ChromaticChord {
        let rootIndex = this.rootIndex - n;
        rootIndex = MathUtils.rotativeTrim(rootIndex, this._notes.length);
        let notes = this.notes;
        notes = Utils.arrayRotateLeft(notes, n);

        return ChromaticChord.from(notes);
    }
    
    public get pattern(): ChromaticPattern {
        let patternArray = this.getArrayFromChromaticChord();

        return ChromaticPattern.from(...patternArray);
    }

    private getArrayFromChromaticChord(): number[] {
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

            let dist = MathUtils.rotativeTrim(current.intValue - last.intValue, Chromatic.NUMBER);
            patternArray.push(dist);
        });

        return patternArray;
    }

    private getArrayFromChromaticChordRoot(): number[] {
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

            let dist = MathUtils.rotativeTrim(current.intValue - last.intValue, Chromatic.NUMBER);
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

        Immutables.lockrIf(ChromaticChord, (obj) => !(obj instanceof ImmutablesCache));

    }
}