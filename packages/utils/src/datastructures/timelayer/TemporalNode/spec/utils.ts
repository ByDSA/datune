import { SimpleTime, TemporalNode } from "index";
import EventTest from "./EventTest";

export function newAddEvent1() {
  return {
    event: new EventTest(),
    from: new SimpleTime(0),
    to: new SimpleTime(1),
  };
}

export function newNode1() {
  return new TemporalNode(newAddEvent1());
}
