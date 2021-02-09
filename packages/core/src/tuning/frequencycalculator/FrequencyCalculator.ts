import { SPN, SPNAlt } from "../../pitches";
import { Tuning } from "../../tuning";
import { FrequencyCalculatorChromatic } from "./FrequencyCalculatorChromatic";
import { FrequencyCalculatorDiatonicAlt } from "./FrequencyCalculatorDiatonicAlt";

export class FrequencyCalculator {
    private _spn: unknown | undefined;
    private _tuning: Tuning | undefined;

    private constructor() {
    }

    spn(spn: unknown): FrequencyCalculator {
        this._spn = spn;

        return this;
    }

    tuning(tuning: Tuning): FrequencyCalculator {
        this._tuning = tuning;

        return this;
    }

    calc(): number {
        if (this._tuning)
            if (this._spn instanceof SPN)
                return new FrequencyCalculatorChromatic(this._tuning, this._spn).calc();
            else if (this._spn instanceof SPNAlt)
                return new FrequencyCalculatorDiatonicAlt(this._tuning, this._spn).calc();

        throw new Error();
    }
}