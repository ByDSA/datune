import { ZERO } from "@datune/core/rhythm/tempo/musical-duration/constants";
import { of as intervalOf } from "datils/math/intervals";
import { add } from "@datune/utils/time";
import { freeze } from "datils/datatypes/objects";
import { MidiNode } from "../MidiNode";
import { EventFromType } from "./EventFromType";

export function from(obj: EventFromType): Readonly<MidiNode> {
  const event = obj.note;
  const timeFrom = obj.at ?? ZERO;
  const timeTo = add(timeFrom, event.duration);
  const interval = intervalOf(timeFrom, timeTo);

  return freeze( {
    event,
    interval,
  } );
}
