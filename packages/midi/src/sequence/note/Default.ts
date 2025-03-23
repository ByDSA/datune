import { MusicalDurations as MD } from "@datune/core";
import { MidiPitches as M } from "pitch";
import { MidiNote } from "./MidiNote";

export const DEFAULT: Readonly<MidiNote> = Object.freeze( {
  pitch: M.C5,
  duration: MD.QUARTER,
  velocity: 100,
} );
