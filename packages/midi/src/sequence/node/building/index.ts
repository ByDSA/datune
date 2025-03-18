import { ZERO } from "@datune/core/rhythm/tempo/musical-duration/constants";
import { lock } from "datils/datatypes";
import { intervalOf } from "datils/math";
import { add } from "@datune/utils/time";
import { MidiNode } from "../MidiNode";
import { EventFromType } from "./EventFromType";

export function from(obj: EventFromType): Readonly<MidiNode> {
  const event = obj.note;
  const timeFrom = obj.at ?? ZERO;
  const timeTo = add(timeFrom, event.duration);
  const interval = intervalOf(timeFrom, timeTo);

  return lock( {
    event,
    interval,
  } );
}
