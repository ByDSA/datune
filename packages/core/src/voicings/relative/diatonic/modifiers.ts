import type { Arrays } from "@datune/utils";
import type { Voicing } from "./Voicing";
import type { Interval } from "diatonic";
import { Pitches as P } from "pitches/diatonic";
import { abs } from "intervals/symbolic/diatonic/modifiers/abs";
import { OCTAVE } from "intervals/symbolic/diatonic/constants";
import { simplify } from "intervals/symbolic/diatonic/modifiers/simplify";
import { Direction } from "intervals/symbolic/diatonic/Direction";
import { fromRootIntervalInts } from "./building";

export function inv(obj: Voicing, n: number = 1): Voicing {
  let { rootIntervalInts } = obj;

  for (let i = 0; i < n; i++) {
    const firstValueBeforeShift = <number>rootIntervalInts.shift();
    const [firstValueAfterShift] = rootIntervalInts;

    rootIntervalInts.push(firstValueBeforeShift + P.NUMBER);
    rootIntervalInts = <Arrays.Number>rootIntervalInts.map(
      (value: number) => value - firstValueAfterShift,
    );
  }

  return fromRootIntervalInts(...rootIntervalInts);
}

export function add(obj: Voicing, n: number): Voicing {
  const rootIntervalInts = obj.rootIntervalInts.map(i=>i + n) as Arrays.Number;

  return fromRootIntervalInts(...rootIntervalInts);
}

export function sub(obj: Voicing, n: number): Voicing {
  const rootIntervalInts = obj.rootIntervalInts.map(i=>i - n) as Arrays.Number;

  return fromRootIntervalInts(...rootIntervalInts);
}

export function bass(obj: Voicing, int: Interval): Voicing {
  if (obj.rootIntervals[0] === int)
    return obj;

  if (int.direction === Direction.DESCENDENT)
    return bass(obj, abs(int));

  const octaveMagnitude = OCTAVE.magnitude;

  if (int.magnitude >= octaveMagnitude)
    return bass(obj, simplify(int));

  return fromRootIntervalInts(
    0,
    ...add(obj, OCTAVE.magnitude - int.magnitude).rootIntervalInts,
  );
}
