import { Immutables } from '../common/Immutables';
import { PrecalcCache } from '../common/PrecalcCache';
import { Pitch } from '../pitch/Pitch';
import { SPN } from '../pitch/symbolic/SPN';
import { SymbolicPitch } from '../pitch/symbolic/SymbolicPitch';

type HashingObject = { frequency: number, symbolicPitch: SymbolicPitch };
export class ConcertPitch extends Pitch {
    public static A440;
    public static A432;
    public static A444;

    private static _cache = new (class Cache extends PrecalcCache<ConcertPitch, HashingObject>{
        getHash(hashingObject: HashingObject): string {
            let symbolicPitchHashCode: any = hashingObject.symbolicPitch.valueOf();

            return symbolicPitchHashCode + ":" + hashingObject.frequency;
        }

        getHashingObject(concertPitch: ConcertPitch): HashingObject {
            return { frequency: concertPitch.frequency, symbolicPitch: concertPitch.symbolicPitch };
        }

        create(hashingObject: HashingObject): ConcertPitch {
            return new ConcertPitch(hashingObject.frequency, hashingObject.symbolicPitch);
        }
    });

    private constructor(private _frequency: number, private _symbolicPitch: SymbolicPitch) {
        super();
    }

    public static fromPitch(pitch: Pitch, symbolicPitch: SymbolicPitch): ConcertPitch {
        return this.fromFrequency(pitch.frequency, symbolicPitch);
    }

    public static fromFrequency(frequency: number, symbolicPitch: SymbolicPitch): ConcertPitch {
        return this._cache.getOrCreate({ frequency, symbolicPitch });
    }

    public get frequency(): number {
        return this._frequency;
    }

    public get symbolicPitch(): SymbolicPitch {
        return this._symbolicPitch;
    }

    public toString(): string {
        switch (this) {
            case ConcertPitch.A440:
            case ConcertPitch.A444:
            case ConcertPitch.A432: return this.symbolicPitch.degree.toString() + this.frequency;
        }
        return this.symbolicPitch + "-" + this.frequency + " Hz";
    }

    public hashCode(): string {
        return ConcertPitch._cache.getHash(this.hashingObject);
    }

    private get hashingObject() {
        return { frequency: this.frequency, symbolicPitch: this.symbolicPitch }
    }

    private static initialize() {
        this.A440 = ConcertPitch.fromFrequency(440, SPN.A4);
        this.A432 = ConcertPitch.fromFrequency(432, SPN.A4);
        this.A444 = ConcertPitch.fromFrequency(444, SPN.A4);

        Immutables.lockr(this);
    }
}