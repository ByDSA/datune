import { IntervalArray, Intervals, Interval } from "intervals/chromatic";
import { Voicings, Voicing } from "voicings/chromatic";
import { SPNChord } from "../Chord";

export default function voicing(obj: SPNChord): Voicing {
  const rootIntervals: IntervalArray = [Intervals.PERFECT_UNISON];
  const { root } = obj;

  for (let i = 1; i < obj.length; i++) {
    const n = obj.pitches[i];
    const rootInterval: Interval = Intervals.betweenSPN(root, n);

    rootIntervals.push(rootInterval);
  }

  return Voicings.fromRootIntervals(...rootIntervals);
}
