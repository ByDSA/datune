import { QUARTER } from "../musical-duration/constants";
import type { BPM } from "./BPM";
import { from } from "./building";

export function initialize() {
  QUARTER_120 = from(120, QUARTER);
}

export let QUARTER_120: BPM;
