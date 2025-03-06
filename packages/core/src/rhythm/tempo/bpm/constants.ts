import type { BPM } from "./BPM";
import * as MD from "../musical-duration/constants";
import { from } from "./building";

export function initialize() {
  if (QUARTER_120)
    throw new Error("Already initialized");

  if (!MD.QUARTER)
    MD.initialize();

  QUARTER_120 = from(120, MD.QUARTER);
}

export let QUARTER_120: BPM;
