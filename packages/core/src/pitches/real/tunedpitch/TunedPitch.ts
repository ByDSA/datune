import { Tuning } from "../../../tuning";
import { AbsolutePitchAny } from "../../symbolic/absolute/AbsolutePitch";
import { RealPitch } from "../RealPitch";

export class TunedPitch extends RealPitch {
    private _frequency: number | undefined;

    private constructor(private _absPitch: AbsolutePitchAny, private _tuning: Tuning) {
        super();
    }

    static from(symbolicPitch: AbsolutePitchAny, tuning: Tuning) {
        return new TunedPitch(symbolicPitch, tuning);
    }

    get symbolicPitch(): AbsolutePitchAny {
        return this._absPitch;
    }

    get tuning(): Tuning {
        return this._tuning;
    }

    get frequency(): number {
        if (!this._frequency)
            this._frequency = this._calcFrequency();

        return this._frequency;
    }

    private _calcFrequency(): number {
        return this.tuning.getFrequency(this.symbolicPitch);
    }

    toString(): string {
        return this.symbolicPitch + " " + this.tuning;
    }
}