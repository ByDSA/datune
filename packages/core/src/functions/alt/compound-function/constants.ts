import * as DegreeFunctions from "../degree-function/constants";
import { compose } from "./building/compose";
import type { CompoundFunction } from "./CompoundFunction";
import { Degrees as DA } from "degrees/alt";

export function initialize() {
  const { SUBV7, V, V7 } = DegreeFunctions;

  V_II = compose(V, DA.II);
  V_III = compose(V, DA.III);
  V_IV = compose(V, DA.IV);
  V_V = compose(V, DA.V);
  V_VI = compose(V, DA.VI);

  V7_II = compose(V7, DA.II);
  V7_III = compose(V7, DA.III);
  V7_IV = compose(V7, DA.IV);
  V7_V = compose(V7, DA.V);
  V7_VI = compose(V7, DA.VI);

  SUBV7_II = compose(SUBV7, DA.II);
  SUBV7_III = compose(SUBV7, DA.III);
  SUBV7_IV = compose(SUBV7, DA.IV);
  SUBV7_V = compose(SUBV7, DA.V);
  SUBV7_VI = compose(SUBV7, DA.VI);
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
