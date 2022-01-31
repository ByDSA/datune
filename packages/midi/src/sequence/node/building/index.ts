/* eslint-disable import/prefer-default-export */
import { ZERO } from "@datune/core/time";
import { lock } from "@datune/utils";
import { intervalOf } from "@datune/utils/math";
import { add } from "@datune/utils/time";
import MidiNode from "../MidiNode";
import EventFromType from "./EventFromType";

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
