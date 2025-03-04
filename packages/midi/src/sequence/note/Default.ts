import { QUARTER } from "@datune/core/rhythm/tempo/musical-duration/constants";
import { C5 } from "pitch/constants";
import { MidiNote } from "./MidiNote";

export const DEFAULT: Readonly<MidiNote> = Object.freeze( {
  pitch: C5,
  duration: QUARTER,
  velocity: 100,
} );
