import { Spn } from "@datune/core";
import { TemporalNode } from "@datune/utils";

export function sortNodesBySpn(
  nodes: TemporalNode<Spn>[],
): TemporalNode<Spn>[] {
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

export function sortNodesByFrom<T>(nodes: TemporalNode<T>[]): TemporalNode<T>[] {
  return nodes.sort((a, b)=>a.interval.from - b.interval.from);
}
