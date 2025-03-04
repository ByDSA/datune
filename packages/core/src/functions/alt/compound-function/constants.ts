import type { CompoundFunction } from "./CompoundFunction";
import { Degrees as D } from "degrees/alt";
import * as DegreeFunctions from "../degree-function/constants";
import { compose } from "./building/compose";

export function initialize() {
  const { SUBV7, V, V7 } = DegreeFunctions;

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
