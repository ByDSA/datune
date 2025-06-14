import type { BPM } from "./BPM";
import { assertNotInitialized } from "@datune/utils/errors/not-initialized";
import * as MD from "../musical-duration/constants";
import { from } from "./building";

export function initialize() {
  assertNotInitialized(QUARTER_120);

  if (!MD.QUARTER)
    MD.initialize();

  QUARTER_120 = from(120, MD.QUARTER);
}

export let QUARTER_120: BPM;
