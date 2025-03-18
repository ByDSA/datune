import type { Tuning } from "../Tuning";
import type { Pitch } from "pitches/chromatic";
import type { Spn } from "spns/chromatic";
import { Intervals } from "intervals/chromatic";

class FrequencyCalculator {
  private pitch?: Pitch;

  private root?: Pitch;

  private tuning: Tuning;

  private spn: Spn;

  constructor(tuning: Tuning, spn: Spn) {
    this.tuning = tuning;
    this.spn = spn;
  }

  private getDistOctave(root: Pitch, pitch: Pitch): number {
    let distOctave = this.spn.octave - this.tuning.concertPitch.spn.octave;

    if (pitch < root)
      distOctave--;

    return distOctave;
  }

  calc(): number {
    this.pitch = this.spn.pitch;
    this.root = this.tuning.concertPitch.spn.pitch;
    const interval = Intervals.betweenNext(this.root, this.pitch);
    const intervalSimple = Intervals.simplify(interval);
    const ratioNumber = +this.tuning.temperament(intervalSimple).ratio;
    const distOctave = this.getDistOctave(this.root, this.pitch);

    return this.tuning.concertPitch.frequency * (2 ** distOctave) * ratioNumber;
  }
}

export function calcFrequency(tuning: Tuning, spn: Spn): number {
  return new FrequencyCalculator(tuning, spn).calc();
}
