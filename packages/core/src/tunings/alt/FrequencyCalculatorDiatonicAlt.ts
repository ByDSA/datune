import { betweenNext } from "intervals/alt";
import { fromChromatic as pitchFromChromatic, Pitch as DiatonicAlt } from "pitches/alt";
import { Pitch as Chromatic } from "pitches/chromatic";
import { SPN } from "spns/alt";
import { Tuning } from "tunings/chromatic";

export default class FrequencyCalculatorDiatonicAlt {
  private _degree: DiatonicAlt | undefined;

  private _degreeRoot: DiatonicAlt | undefined;

  private _tuning: Tuning;

  private spn: SPN;

  constructor(_tuning: Tuning, spn: SPN) {
    this._tuning = _tuning;
    this.spn = spn;
  }

  private getDistOctave(degreeRoot: DiatonicAlt, degree: DiatonicAlt): number {
    let distOctave = this.spn.octave - this._tuning.concertPitch.spn.octave;

    if (degree.diatonic < degreeRoot.diatonic)
      distOctave--;

    return distOctave;
  }

  calc(): number {
    this._degree = this.spn.pitch;
    let degreeRoot = this._tuning.concertPitch.spn.pitch as Chromatic | DiatonicAlt;

    if (degreeRoot instanceof Chromatic)
      degreeRoot = pitchFromChromatic(degreeRoot);

    this._degreeRoot = degreeRoot as DiatonicAlt;

    const interval = betweenNext(this._degreeRoot, this._degree);
    // TODO
    const ratioNumber = 1;// this._tuning.temperament(interval).ratio.value;
    const distOctave = this.getDistOctave(this._degreeRoot, this._degree);

    return this._tuning.concertPitch.frequency * 2 ** distOctave * ratioNumber;
  }
}
