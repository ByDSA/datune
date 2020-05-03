import { Pitch } from "./Pitch";
import { SymbolicPitch } from "./symbolic/SymbolicPitch";
import { Tuning } from "../tunning/Tuning";

export class PitchParametric implements Pitch {
    private _frequency: number;

    private constructor(private _symbolicPitch: SymbolicPitch, private _tuning: Tuning) {
    }

    get symbolicPitch(): SymbolicPitch {
        return this._symbolicPitch;
    }

    get tuning(): Tuning {
        return this._tuning;
    }

    get frequency(): number {
        if (!this._frequency)
            this.precalcFrequency();

        return this._frequency;
    }

    private precalcFrequency() {
        this._frequency = this.tuning.getFrequency(this.symbolicPitch);
    }
}