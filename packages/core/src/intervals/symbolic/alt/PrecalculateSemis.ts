import { Chromatic, Diatonic } from "../../../pitches";
import { Scale } from "../../../scales";
import { ChromaticInterval } from "../chromatic/ChromaticInterval";
import { IntervalDiatonic } from "../diatonic/IntervalDiatonic";
import { Quality } from "../quality/Quality";
import { IntervalDiatonicAlt } from "./IntervalDiatonicAlt";

export class PrecalculateSemis {
    private rootInterval: number;
    private diatonicIntValueMod7: number | undefined;

    constructor(private _self: IntervalDiatonicAlt) {
        this.rootInterval = 0;
    }

    calc(): number {
        this.initialize();

        this.qualityFixer();

        this.octaveFixer();

        return this.rootInterval;
    }

    private initialize() {
        this.diatonicIntValueMod7 = this._self.intervalDiatonic.valueOf() % Diatonic.NUMBER;
        const SemisMajor = Scale.MAJOR.degrees;
        this.rootInterval = SemisMajor[this.diatonicIntValueMod7];
    }

    private qualityFixer() {
        switch (this.diatonicIntValueMod7) {
            case IntervalDiatonic.UNISON.valueOf():
            case IntervalDiatonic.FOURTH.valueOf():
            case IntervalDiatonic.FIFTH.valueOf():
                switch (this._self.quality) {
                    case Quality.DIMINISHED:
                        this.rootInterval--;
                        break;
                    case Quality.AUGMENTED:
                        this.rootInterval++;
                        break;
                    case Quality.DOUBLY_DIMINISHED:
                        this.rootInterval -= 2;
                        break;
                    case Quality.DOUBLY_AUGMENTED:
                        this.rootInterval += 2;
                        break;
                }
                break;
            case IntervalDiatonic.SECOND.valueOf():
            case IntervalDiatonic.THIRD.valueOf():
            case IntervalDiatonic.SIXTH.valueOf():
            case IntervalDiatonic.SEVENTH.valueOf():
                switch (this._self.quality) {
                    case Quality.MINOR:
                        this.rootInterval--;
                        break;
                    case Quality.DIMINISHED:
                        this.rootInterval -= 2;
                        break;
                    case Quality.AUGMENTED:
                        this.rootInterval++;
                        break;
                }
        }
    }

    private octaveFixer() {
        let octaves: number = Math.floor(this._self.intervalDiatonic.valueOf() / Diatonic.NUMBER);
        this.rootInterval += Chromatic.NUMBER * octaves;
    }
}