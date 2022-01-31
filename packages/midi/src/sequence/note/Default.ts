import { QUARTER, ZERO } from "@datune/core/time";
import { C5 } from "pitch/constants";
import RequiredNote from "./MidiNote";

export default {
  pitch: C5,
  duration: QUARTER,
  velocity: 100,
  from: ZERO,
} as RequiredNote;
