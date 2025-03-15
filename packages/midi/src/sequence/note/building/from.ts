import { lock } from "@datune/utils";
import { DEFAULT } from "../Default";
import { MidiNote } from "../MidiNote";
import { PartialMidiNote } from "../PartialMidiNote";

export const from = (partialMidiNote: PartialMidiNote): MidiNote => {
  const note = {
    ...DEFAULT,
    ...partialMidiNote,
  };

  if (partialMidiNote.velocity !== undefined)
    note.velocity = fixVelocityValue(partialMidiNote.velocity);

  return lock(note);
};

function fixVelocityValue(value: number): number {
  if (value < 0)
    return 0;

  if (value > 127)
    return 127;

  return value;
}
