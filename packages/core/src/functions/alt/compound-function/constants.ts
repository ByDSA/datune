/* eslint-disable import/no-mutable-exports */
import { II as DA_II, III as DA_III, IV as DA_IV, V as DA_V, VI as DA_VI } from "degrees/alt";
import { SUBV7, V, V7 } from "../degree-function";
import { from } from "./building";
import CompoundFunction from "./CompoundFunction";

export function initialize() {
  V_II = from(V, DA_II);
  V_III = from(V, DA_III);
  V_IV = from(V, DA_IV);
  V_V = from(V, DA_V);
  V_VI = from(V, DA_VI);

  V7_II = from(V7, DA_II);
  V7_III = from(V7, DA_III);
  V7_IV = from(V7, DA_IV);
  V7_V = from(V7, DA_V);
  V7_VI = from(V7, DA_VI);

  SUBV7_II = from(SUBV7, DA_II);
  SUBV7_III = from(SUBV7, DA_III);
  SUBV7_IV = from(SUBV7, DA_IV);
  SUBV7_V = from(SUBV7, DA_V);
  SUBV7_VI = from(SUBV7, DA_VI);
}

export let V_II: CompoundFunction;

export let V_III: CompoundFunction;

export let V_IV: CompoundFunction;

export let V_V: CompoundFunction;

export let V_VI: CompoundFunction;

export let V7_II: CompoundFunction;

export let V7_III: CompoundFunction;

export let V7_IV: CompoundFunction;

export let V7_V: CompoundFunction;

export let V7_VI: CompoundFunction;

export let SUBV7_II: CompoundFunction;

export let SUBV7_III: CompoundFunction;

export let SUBV7_IV: CompoundFunction;

export let SUBV7_V: CompoundFunction;

export let SUBV7_VI: CompoundFunction;
