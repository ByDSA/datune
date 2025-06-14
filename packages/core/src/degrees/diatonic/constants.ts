import type { Degree } from "./Degree";
import { assertNotInitialized } from "@datune/utils/errors/not-initialized";
import { deepFreeze } from "datils/datatypes/objects";
import { Intervals } from "intervals/symbolic/diatonic";

export function initialize() {
  assertNotInitialized(I);

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

export let I: Degree;

export let II: Degree;

export let III: Degree;

export let IV: Degree;

export let V: Degree;

export let VI: Degree;

export let VII: Degree;

export let ALL: Degree[];
