import { Immutables } from '@datune/utils/Immutables';
import { Pitch } from '../pitches/Pitch';
import { SPN } from '../pitches/symbolic/SPN';
import { SymbolicPitch } from '../pitches/symbolic/SymbolicPitch';
import { ConcertPitchCache, HashingObject } from './ConcertPitchCache';

export class ConcertPitch extends Pitch {
    static A440;
    static A432;
    static A444;

    private static _cache = new ConcertPitchCache(
        (hashingObject: HashingObject) => new ConcertPitch(hashingObject.frequency, hashingObject.symbolicPitch)
    );

    private constructor(private _frequency: number, private _symbolicPitch: SymbolicPitch) {
        super();
    }

    static fromPitch(pitch: Pitch, symbolicPitch: SymbolicPitch): ConcertPitch {
        return this.fromFrequency(pitch.frequency, symbolicPitch);
    }

    static fromFrequency(frequency: number, symbolicPitch: SymbolicPitch): ConcertPitch {
        return this._cache.getOrCreate({ frequency, symbolicPitch });
    }

    get frequency(): number {
        return this._frequency;
    }

    get symbolicPitch(): SymbolicPitch {
        return this._symbolicPitch;
    }

    toString(): string {
        switch (this) {
            case ConcertPitch.A440:
            case ConcertPitch.A444:
            case ConcertPitch.A432: return this.symbolicPitch.degree.toString() + this.frequency;
        }
        return this.symbolicPitch + "-" + this.frequency + " Hz";
    }

    hashCode(): string {
        return ConcertPitch._cache.getHash(this.hashingObject);
    }

    private get hashingObject() {
        return { frequency: this.frequency, symbolicPitch: this.symbolicPitch }
    }
}