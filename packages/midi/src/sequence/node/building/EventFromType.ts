import { Time } from "@datune/utils";
import { MidiNote } from "sequence/note";

type EventFromType = {
  note: MidiNote;
  at?: Time;
};

export default EventFromType;
