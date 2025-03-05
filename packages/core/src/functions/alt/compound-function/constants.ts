import type { CompoundFunc } from "./CompoundFunc";
import { Degrees as D } from "degrees/alt";
import * as DegreeFuncs from "../degree-function/constants";
import { compose } from "./building/compose";

export function initialize() {
  const { SUBV7, V, V7 } = DegreeFuncs;

  V_II = compose(V, D.II);
  V_III = compose(V, D.III);
  V_IV = compose(V, D.IV);
  V_V = compose(V, D.V);
  V_VI = compose(V, D.VI);

  V7_II = compose(V7, D.II);
  V7_III = compose(V7, D.III);
  V7_IV = compose(V7, D.IV);
  V7_V = compose(V7, D.V);
  V7_VI = compose(V7, D.VI);

  SUBV7_II = compose(SUBV7, D.II);
  SUBV7_III = compose(SUBV7, D.III);
  SUBV7_IV = compose(SUBV7, D.IV);
  SUBV7_V = compose(SUBV7, D.V);
  SUBV7_VI = compose(SUBV7, D.VI);
}

export let V_II: CompoundFunc;

export let V_III: CompoundFunc;

export let V_IV: CompoundFunc;

export let V_V: CompoundFunc;

export let V_VI: CompoundFunc;

export let V7_II: CompoundFunc;

export let V7_III: CompoundFunc;

export let V7_IV: CompoundFunc;

export let V7_V: CompoundFunc;

export let V7_VI: CompoundFunc;

export let SUBV7_II: CompoundFunc;

export let SUBV7_III: CompoundFunc;

export let SUBV7_IV: CompoundFunc;

export let SUBV7_V: CompoundFunc;

export let SUBV7_VI: CompoundFunc;
