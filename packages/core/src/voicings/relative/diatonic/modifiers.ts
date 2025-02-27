import { Arrays } from "@datune/utils";
import { fromRootIntervalInts } from "./building";
import Voicing from "./DiatonicVoicing";
import { Pitches } from "pitches/diatonic";

export function inv(obj: Voicing, n: number = 1): Voicing {
  let { rootIntervalInts } = obj;

  for (let i = 0; i < n; i++) {
    const firstValueBeforeShift = <number>rootIntervalInts.shift();
    const [firstValueAfterShift] = rootIntervalInts;

    rootIntervalInts.push(firstValueBeforeShift + Pitches.NUMBER);
    rootIntervalInts = <Arrays.Number>rootIntervalInts.map(
      (value: number) => value - firstValueAfterShift,
    );
  }

  return fromRootIntervalInts(...rootIntervalInts);
}
