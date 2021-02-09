import { AbsolutePitchAny, SPN } from '../../../pitches';
import { RealPitch } from '../RealPitch';
import { ConcertPitchCache, HashingObject } from './building/cache/ConcertPitchCache';

export class ConcertPitch extends RealPitch {
    static get A440(): ConcertPitch {
        if (!_A440)
            _A440 = ConcertPitch.fromFrequency(440, SPN.A4);
        return _A440;
    }

    static get A432(): ConcertPitch {
        if (!_A432)
            _A432 = ConcertPitch.fromFrequency(432, SPN.A4);
        return _A432;
    }

    static get A444(): ConcertPitch {
        if (!_A444)
            _A444 = ConcertPitch.fromFrequency(444, SPN.A4);

        return _A444;
    }

    private static _cache = new ConcertPitchCache(
        (hashingObject: HashingObject) => new ConcertPitch(hashingObject.frequency, hashingObject.absPitch)
    );

    private constructor(private _frequency: number, private _absPitch: AbsolutePitchAny) {
        super();
    }

    static fromPitch(pitch: RealPitch, absolutePitch: AbsolutePitchAny): ConcertPitch {
        return this.fromFrequency(pitch.frequency, absolutePitch);
    }

    static fromFrequency(frequency: number, absPitch: AbsolutePitchAny): ConcertPitch {
        return this._cache.getOrCreate({ frequency, absPitch });
    }

    get frequency(): number {
        return this._frequency;
    }

    get absPitch(): AbsolutePitchAny {
        return this._absPitch;
    }

    toString(): string {
        switch (this) {
            case ConcertPitch.A440:
            case ConcertPitch.A444:
            case ConcertPitch.A432: return this.absPitch.degree.toString() + this.frequency;
        }
        return this.absPitch + "-" + this.frequency + " Hz";
    }

    hashCode(): string {
        return ConcertPitch._cache.getHash(this.hashingObject);
    }

    private get hashingObject() {
        return { frequency: this.frequency, absPitch: this.absPitch }
    }
}

let _A432: ConcertPitch, _A440: ConcertPitch, _A444: ConcertPitch;