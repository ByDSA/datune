import { ImmutablesCache } from '../common/ImmutablesCache';
import { ChromaticSymbolicPitch } from './ChromaticSymbolicPitch';
import { SymbolicPitch } from './SymbolicPitch';

type HashingObject = { frequency: number, symbolicPitch: SymbolicPitch };
export class ConcertPitch {
    public static A440;

    private static immutablesCache = new ImmutablesCache<ConcertPitch, HashingObject>(
        function (hashingObject: HashingObject): string {
            return "" + hashingObject.symbolicPitch + hashingObject.frequency;
        },
        function (concertPitch: ConcertPitch): HashingObject {
            return { frequency: concertPitch.frequency, symbolicPitch: concertPitch.symbolicPitch };
        },
        function (hashingObject: HashingObject): ConcertPitch {
            return new ConcertPitch(hashingObject.frequency, hashingObject.symbolicPitch);
        }
    );

    private constructor(private _frequency: number, private _symbolicPitch: SymbolicPitch) {
    }

    public static from(frequency: number, symbolicPitch: SymbolicPitch): ConcertPitch {
        return this.immutablesCache.getOrCreate({ frequency: frequency, symbolicPitch: symbolicPitch });
    }

    public get frequency(): number {
        return this._frequency;
    }

    public get symbolicPitch(): SymbolicPitch {
        return this._symbolicPitch;
    }

    public toString(): string {
        return ConcertPitch.immutablesCache.getHash(this);
    }

    private static initialize() {
        this.A440 = ConcertPitch.from(440, ChromaticSymbolicPitch.A4);
    }
}