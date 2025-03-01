import { EventTest } from "./EventTest";
import { TemporalNode } from "index";
import { intervalOf } from "math";

export function newNode1(): TemporalNode<EventTest> {
  return {
    event: new EventTest(),
    interval: intervalOf(0, 1),
  };
}
