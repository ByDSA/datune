import type { SPN } from "spns/alt";
import type { Tuning } from "tunings/chromatic";
import { Intervals as I } from "intervals/alt";
import { Pitches as P, Pitch } from "pitches/alt";
import { Pitch as CPitch } from "pitches/chromatic";

// ??
export class FrequencyCalculatorDiatonicAlt {
  #degree: Pitch | undefined;

  #degreeRoot: Pitch | undefined;

  #tuning: Tuning;

  private spn: SPN;

  constructor(_tuning: Tuning, spn: SPN) {
    this.#tuning = _tuning;
    this.spn = spn;
  }

  private getDistOctave(degreeRoot: Pitch, degree: Pitch): number {
    let distOctave = this.spn.octave - this.#tuning.concertPitch.spn.octave;

    if (degree.diatonic < degreeRoot.diatonic)
      distOctave--;

    return distOctave;
  }

  calc(): number {
    this.#degree = this.spn.pitch;
    let degreeRoot = this.#tuning.concertPitch.spn.pitch as CPitch | Pitch;

    if (degreeRoot instanceof CPitch)
      degreeRoot = P.fromChromatic(degreeRoot);

    this.#degreeRoot = degreeRoot as Pitch;

    // TODO
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const interval = I.betweenNext(this.#degreeRoot, this.#degree);
    const ratioNumber = 1;// this._tuning.temperament(interval).ratio.value;
    const distOctave = this.getDistOctave(this.#degreeRoot, this.#degree);

    return this.#tuning.concertPitch.frequency * (2 ** distOctave) * ratioNumber;
  }
}
