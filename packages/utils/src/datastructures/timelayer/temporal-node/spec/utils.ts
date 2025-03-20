import { of as intervalOf } from "datils/math/intervals";
import { TemporalNode } from "index";
import { EventTest } from "./EventTest";

export function newNode1(): TemporalNode<EventTest> {
  return {
    event: new EventTest(),
    interval: intervalOf(0, 1),
  };
}
