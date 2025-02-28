import { Intervals } from "intervals/alt";
import { Pitches, Pitch as P } from "pitches/alt";
import { Pitch as Chromatic } from "pitches/chromatic";
import { SPN } from "spns/alt";
import { Tuning } from "tunings/chromatic";

export class FrequencyCalculatorDiatonicAlt {
  #degree: P | undefined;

  #degreeRoot: P | undefined;

  #tuning: Tuning;

  private spn: SPN;

  constructor(_tuning: Tuning, spn: SPN) {
    this.#tuning = _tuning;
    this.spn = spn;
  }

  private getDistOctave(degreeRoot: P, degree: P): number {
    let distOctave = this.spn.octave - this.#tuning.concertPitch.spn.octave;

    if (degree.diatonic < degreeRoot.diatonic)
      distOctave--;

    return distOctave;
  }

  calc(): number {
    this.#degree = this.spn.pitch;
    let degreeRoot = this.#tuning.concertPitch.spn.pitch as Chromatic | P;

    if (degreeRoot instanceof Chromatic)
      degreeRoot = Pitches.fromChromatic(degreeRoot);

    this.#degreeRoot = degreeRoot as P;

    // TODO
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const interval = Intervals.betweenNext(this.#degreeRoot, this.#degree);
    const ratioNumber = 1;// this._tuning.temperament(interval).ratio.value;
    const distOctave = this.getDistOctave(this.#degreeRoot, this.#degree);

    return this.#tuning.concertPitch.frequency * (2 ** distOctave) * ratioNumber;
  }
}
