import { from } from "../building";
import Degree from "../Degree";
import { Degrees as DDegrees } from "degrees/diatonic";

export function initialize() {
  if (I)
    throw new Error("Already initialized");

  I = from(DDegrees.I, 0);
  aI = from(DDegrees.I, 1);
  bII = from(DDegrees.II, -1);
  II = from(DDegrees.II, 0);
  aII = from(DDegrees.II, 1);
  bIII = from(DDegrees.III, -1);
  III = from(DDegrees.III, 0);
  aIII = from(DDegrees.III, 1);
  IV = from(DDegrees.IV, 0);
  aIV = from(DDegrees.IV, 1);
  bV = from(DDegrees.V, -1);
  V = from(DDegrees.V, 0);
  aV = from(DDegrees.V, 1);
  bVI = from(DDegrees.VI, -1);
  VI = from(DDegrees.VI, 0);
  aVI = from(DDegrees.VI, 1);
  bVII = from(DDegrees.VII, -1);
  VII = from(DDegrees.VII, 0);
  aVII = from(DDegrees.VII, 1);
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
