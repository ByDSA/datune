import type { Degree } from "../Degree";
import * as DD from "degrees/diatonic/constants";
import { from } from "../building";

export function initialize() {
  if (I)
    throw new Error("Already initialized");

  I = from(DD.I, 0);
  aI = from(DD.I, 1);
  bII = from(DD.II, -1);
  II = from(DD.II, 0);
  aII = from(DD.II, 1);
  bIII = from(DD.III, -1);
  III = from(DD.III, 0);
  aIII = from(DD.III, 1);
  IV = from(DD.IV, 0);
  aIV = from(DD.IV, 1);
  bV = from(DD.V, -1);
  V = from(DD.V, 0);
  aV = from(DD.V, 1);
  bVI = from(DD.VI, -1);
  VI = from(DD.VI, 0);
  aVI = from(DD.VI, 1);
  bVII = from(DD.VII, -1);
  VII = from(DD.VII, 0);
  aVII = from(DD.VII, 1);
}

export let I: Degree;

export let aI: Degree;

export let bII: Degree;

export let II: Degree;

export let aII: Degree;

export let bIII: Degree;

export let III: Degree;

export let aIII: Degree;

export let IV: Degree;

export let aIV: Degree;

export let bV: Degree;

export let V: Degree;

export let aV: Degree;

export let bVI: Degree;

export let VI: Degree;

export let aVI: Degree;

export let bVII: Degree;

export let VII: Degree;

export let aVII: Degree;
