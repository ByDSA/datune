import { freeze } from "datils/datatypes/objects";
import { DEFAULT } from "../Default";
import { MidiNote } from "../MidiNote";

export const noteFrom = (partialMidiNote: Partial<MidiNote>): MidiNote => {
  const note = {
    ...DEFAULT,
    ...partialMidiNote,
  };

  if (partialMidiNote.velocity !== undefined)
    note.velocity = fixVelocityValue(partialMidiNote.velocity);

  return freeze(note);
};

function fixVelocityValue(value: number): number {
  if (value < 0)
    return 0;

  if (value > 127)
    return 127;

  return value;
}
