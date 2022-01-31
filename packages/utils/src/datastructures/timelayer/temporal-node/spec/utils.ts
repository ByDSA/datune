/* eslint-disable import/prefer-default-export */
import { TemporalNode } from "index";
import { intervalOf } from "math";
import EventTest from "./EventTest";

export function newNode1(): TemporalNode<EventTest> {
  return {
    event: new EventTest(),
    interval: intervalOf(0, 1),
  };
}
