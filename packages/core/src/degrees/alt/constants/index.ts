/* eslint-disable import/no-mutable-exports */
import { I as D_I, II as D_II, III as D_III, IV as D_IV, V as D_V, VI as D_VI, VII as D_VII } from "degrees/diatonic";
import { from } from "../building";
import Degree from "../Degree";

export function initialize() {
  if (I)
    throw new Error("Already initialized");

  I = from(D_I, 0);
  aI = from(D_I, 1);
  bII = from(D_II, -1);
  II = from(D_II, 0);
  aII = from(D_II, 1);
  bIII = from(D_III, -1);
  III = from(D_III, 0);
  aIII = from(D_III, 1);
  IV = from(D_IV, 0);
  aIV = from(D_IV, 1);
  bV = from(D_V, -1);
  V = from(D_V, 0);
  aV = from(D_V, 1);
  bVI = from(D_VI, -1);
  VI = from(D_VI, 0);
  aVI = from(D_VI, 1);
  bVII = from(D_VII, -1);
  VII = from(D_VII, 0);
  aVII = from(D_VII, 1);
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
