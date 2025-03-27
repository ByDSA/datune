import { intervalBetween } from "datils/math/intervals";
import { TimelineNode } from "index";
import { EventTest } from "./EventTest";

export function newNode1(): TimelineNode<EventTest> {
  return {
    event: new EventTest(),
    interval: intervalBetween(0, 1),
  };
}
