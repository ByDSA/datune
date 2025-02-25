import { Array as IntervalArray, betweenSPN, Interval, PERFECT_UNISON } from "intervals/chromatic";
import { fromRootIntervals as voicingFromRootIntervals, Voicing } from "voicings/chromatic";
import SPNChord from "../Chord";

export default function voicing(obj: SPNChord): Voicing {
  const rootIntervals: IntervalArray = [PERFECT_UNISON];
  const { root } = obj;

  for (let i = 1; i < obj.length; i++) {
    const n = obj.pitches[i];
    const rootInterval: Interval = betweenSPN(root, n);

    rootIntervals.push(rootInterval);
  }

  return voicingFromRootIntervals(...rootIntervals);
}
