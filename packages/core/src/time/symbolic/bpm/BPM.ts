import { MusicalDuration } from "../musicalduration/MusicalDuration";
import { Tempo } from "../tempo/Tempo";

export class BPM extends Tempo {
    private constructor(private _bpm: number, private _beat: MusicalDuration) {
        super();
    }

    static from(bpm: number, beat: MusicalDuration = MusicalDuration.QUARTER): BPM {
        return new BPM(bpm, beat);
    }

    getMillis(musicalDuration: MusicalDuration): number {
        let msPerMin = 1000 * 60;
        let baseDuration = msPerMin / this._bpm;
        let wholeDuration = baseDuration / this._beat.value;

        return musicalDuration.value * wholeDuration;
    }

    get bpm(): number {
        return this._bpm;
    }

    get beat(): MusicalDuration {
        return this._beat;
    }

    // SETS

    static get QUARTER_120(): BPM {
        if (!_QUARTER_120)
            _QUARTER_120 = BPM.from(120, MusicalDuration.QUARTER);

        return _QUARTER_120;
    }
}

let _QUARTER_120: BPM;