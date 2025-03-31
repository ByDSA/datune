import { Spn } from "@datune/core";
import { MidiTimelineNode } from "@datune/midi";
import { TimelineNode } from "@datune/utils";

export function sortSpnNodesBySpn(
  nodes: TimelineNode<Spn>[],
): TimelineNode<Spn>[] {
  return nodes.sort((a, b) => {
    const valueA = a.event.valueOf();
    const valueB = b.event.valueOf();

    if (valueA < valueB)
      return -1;

    if (valueA > valueB)
      return 1;

    return 0;
  } );
}

export function sortMidiNodesBySpn(
  nodes: MidiTimelineNode[],
): MidiTimelineNode[] {
  return nodes.sort((a, b) => {
    const valueA = a.event.pitch.spn.valueOf();
    const valueB = b.event.pitch.spn.valueOf();

    if (valueA < valueB)
      return -1;

    if (valueA > valueB)
      return 1;

    return 0;
  } );
}

export function sortNodesByFrom<T>(nodes: TimelineNode<T>[]): TimelineNode<T>[] {
  return nodes.sort((a, b)=>a.interval.from - b.interval.from);
}
