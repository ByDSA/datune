import { deepFreeze } from "datils/datatypes/objects";
import { type Interval, Intervals } from "intervals/symbolic/diatonic";

export function initialize() {
  if (I)
    throw new Error("Already initialized");

  const { UNISON,
    SECOND,
    THIRD,
    FOURTH,
    FIFTH,
    SIXTH,
    SEVENTH } = Intervals;

  I = UNISON;
  II = SECOND;
  III = THIRD;
  IV = FOURTH;
  V = FIFTH;
  VI = SIXTH;
  VII = SEVENTH;

  ALL = deepFreeze([
    I,
    II,
    III,
    IV,
    V,
    VI,
    VII,
  ]);
}

export let I: Interval;

export let II: Interval;

export let III: Interval;

export let IV: Interval;

export let V: Interval;

export let VI: Interval;

export let VII: Interval;

export let ALL: Interval[];
