import { Tuning } from "../tuning/Tuning";
import { Pitch } from "./Pitch";
import { SymbolicPitch } from "./symbolic/SymbolicPitch";

export class PitchParametric extends Pitch {
    private _frequency: number;

    private constructor(private _symbolicPitch: SymbolicPitch, private _tuning: Tuning) {
        super();
    }

    static from(symbolicPitch: SymbolicPitch, tuning: Tuning) {
        return new PitchParametric(symbolicPitch, tuning);
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

    toString(): string {
        return this.symbolicPitch + " " + this.tuning;
    }
}