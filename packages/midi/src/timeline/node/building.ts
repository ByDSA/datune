import type { MidiNote } from "timeline/note/MidiNote";
import type { MidiTimelineNode } from "./MidiNode";
import { MusicalDurations as MD } from "@datune/core/rhythm/tempo/musical-duration";
import { intervalBetween } from "datils/math/intervals";
import { add } from "@datune/utils/time";
import { freeze } from "datils/datatypes/objects";
import { Time } from "@datune/utils";

type EventFromType = {
  note: MidiNote;
  at?: Time;
};

export function nodeFrom(obj: EventFromType): Readonly<MidiTimelineNode> {
  const event = obj.note;
  const timeFrom = obj.at ?? MD.ZERO;
  const timeTo = add(timeFrom, event.duration);
  const interval = intervalBetween(timeFrom, timeTo);

  return freeze( {
    event,
    interval,
  } );
}
