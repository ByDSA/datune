import { Time } from "@datune/utils";
import { MidiNote } from "sequence/note";

export type EventFromType = {
  note: MidiNote;
  at?: Time;
};
