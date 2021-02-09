import { ChromaticInterval } from "../../intervals";
import { Chromatic, DiatonicAlt, SPN } from "../../pitches";
import { Tuning } from "../tuning/Tuning";
import { FrequencyCalculator } from "./FrequencyCalculatorInterface";

export class FrequencyCalculatorChromatic implements FrequencyCalculator {
    private _degree: Chromatic | undefined;
    private _degreeRoot: Chromatic | undefined;

    constructor(private _tuning: Tuning, private spn: SPN) {
    }

    private getDistOctave(degreeRoot: Chromatic, degree: Chromatic): number {
        let distOctave = this.spn.octave - this._tuning.concertPitch.absPitch.octave;
        if (degree < degreeRoot)
            distOctave--;


        return distOctave;
    }

    private getInterval(degreeRoot: Chromatic, degree: Chromatic): ChromaticInterval {
        return ChromaticInterval.between(degreeRoot, degree);
    }

    calc(): number {
        this._degree = this.spn.degree;
        let degreeRoot = this._tuning.concertPitch.absPitch.degree;
        if (degreeRoot instanceof DiatonicAlt)
            this._degreeRoot = degreeRoot.note;
        else if (degreeRoot instanceof Chromatic)
            this._degreeRoot = degreeRoot;

        if (
            typeof this._degree != typeof this._degreeRoot ||
            !(this._degreeRoot instanceof Chromatic)
        )
            throw new Error("Cannot calculate the interval: root=" + this._degreeRoot + " chromatic=" + this._degree);

        let interval = this.getInterval(this._degreeRoot, this._degree);

        let ratioNumber = this._tuning.temperament.getIntervalPitch(interval).ratio.value;

        let distOctave = this.getDistOctave(this._degreeRoot, this._degree);

        return this._tuning.concertPitch.frequency * Math.pow(2, distOctave) * ratioNumber;
    }
}