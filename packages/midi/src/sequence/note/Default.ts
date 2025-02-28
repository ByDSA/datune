import { QUARTER } from "@datune/core/time/symbolic/musical-duration/constants";
import { MidiNote } from "./MidiNote";
import { C5 } from "pitch/constants";

export const DEFAULT: Readonly<MidiNote> = Object.freeze( {
  pitch: C5,
  duration: QUARTER,
  velocity: 100,
} );
