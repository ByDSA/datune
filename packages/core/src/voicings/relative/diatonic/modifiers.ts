/* eslint-disable import/prefer-default-export */

import { Arrays } from "@datune/utils";
import { NUMBER } from "pitches/diatonic";
import { fromRootIntervalInts } from "./building";
import Voicing from "./DiatonicVoicing";

export function inv(obj: Voicing, n: number = 1): Voicing {
  let { rootIntervalInts } = obj;

  for (let i = 0; i < n; i++) {
    const firstValueBeforeShift = <number>rootIntervalInts.shift();
    const firstValueAfterShift = rootIntervalInts[0];

    rootIntervalInts.push(firstValueBeforeShift + NUMBER);
    rootIntervalInts = <Arrays.Number>rootIntervalInts.map(
      (value: number) => value - firstValueAfterShift,
    );
  }

  return fromRootIntervalInts(...rootIntervalInts);
}
