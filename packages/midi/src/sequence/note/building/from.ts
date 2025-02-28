import { lock } from "@datune/utils";
import { DEFAULT } from "../Default";
import { MidiNote } from "../MidiNote";
import { PartialMidiNote } from "../PartialMidiNote";

export const from = (dto: PartialMidiNote): MidiNote => {
  const note = {
    ...DEFAULT,
    ...dto,
  };

  if (dto.velocity !== undefined)
    note.velocity = fixVelocityValue(dto.velocity);

  return lock(note);
};

function fixVelocityValue(value: number): number {
  if (value < 0)
    return 0;

  if (value > 127)
    return 127;

  return value;
}
