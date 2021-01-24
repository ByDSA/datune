import { IntervalDiatonicAlt } from "../../intervals";
import { Chromatic, DiatonicAlt, SPNAlt } from "../../pitches";
import { Tuning } from "../tuning/Tuning";
import { FrequencyCalculator } from "./FrequencyCalculatorInterface";

export class FrequencyCalculatorDiatonicAlt implements FrequencyCalculator {
    private _degree: DiatonicAlt | undefined;
    private _degreeRoot: DiatonicAlt | undefined;

    constructor(private _tuning: Tuning, private spn: SPNAlt) {
    }

    private getDistOctave(degreeRoot: DiatonicAlt, degree: DiatonicAlt): number {
        let distOctave = this.spn.octave - this._tuning.concertPitch.absPitch.octave;

        if (degree.diatonic < degreeRoot.diatonic)
            distOctave--;


        return distOctave;
    }

    private getInterval(degreeRoot: DiatonicAlt, degree: DiatonicAlt): IntervalDiatonicAlt {
        return IntervalDiatonicAlt.between(degreeRoot, degree);
    }

    calc(): number {
        this._degree = this.spn.degree;
        let degreeRoot = this._tuning.concertPitch.absPitch.degree;
        if (degreeRoot instanceof Chromatic)
            degreeRoot = DiatonicAlt.fromNote(<Chromatic>degreeRoot);
        this._degreeRoot = <DiatonicAlt>degreeRoot;

        let interval = this.getInterval(this._degreeRoot, this._degree);

        let ratioNumber = this._tuning.temperament.getIntervalPitch(interval).ratio.value;

        let distOctave = this.getDistOctave(this._degreeRoot, this._degree);

        return this._tuning.concertPitch.frequency * Math.pow(2, distOctave) * ratioNumber;
    }
}