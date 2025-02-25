/* eslint-disable import/no-mutable-exports */
import { II as C_II, III as C_III, IV as C_IV, V as C_V, VI as C_VI } from "degrees/chromatic";
import { SUBV7, V, V7 } from "../degree-function";
import { from } from "./building";
import CompoundFunction from "./CompoundFunction";

export function initialize() {
  V_II = from(V, C_II);
  V_III = from(V, C_III);
  V_IV = from(V, C_IV);
  V_V = from(V, C_V);
  V_VI = from(V, C_VI);

  V7_II = from(V7, C_II);
  V7_III = from(V7, C_III);
  V7_IV = from(V7, C_IV);
  V7_V = from(V7, C_V);
  V7_VI = from(V7, C_VI);

  SUBV7_II = from(SUBV7, C_II);
  SUBV7_III = from(SUBV7, C_III);
  SUBV7_IV = from(SUBV7, C_IV);
  SUBV7_V = from(SUBV7, C_V);
  SUBV7_VI = from(SUBV7, C_VI);
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
