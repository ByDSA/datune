import type { MidiNote } from "sequence/note/MidiNote";
import type { MidiNode } from "./MidiNode";
import { MusicalDurations as MD } from "@datune/core/rhythm/tempo/musical-duration";
import { of as intervalOf } from "datils/math/intervals";
import { add } from "@datune/utils/time";
import { freeze } from "datils/datatypes/objects";
import { Time } from "@datune/utils";

type EventFromType = {
  note: MidiNote;
  at?: Time;
};

export function nodeFrom(obj: EventFromType): Readonly<MidiNode> {
  const event = obj.note;
  const timeFrom = obj.at ?? MD.ZERO;
  const timeTo = add(timeFrom, event.duration);
  const interval = intervalOf(timeFrom, timeTo);

  return freeze( {
    event,
    interval,
  } );
}
