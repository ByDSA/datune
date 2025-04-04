import { BPM } from "@datune/core";
import { MidiTimeline } from "@datune/midi";
import { TimelineNode, Time } from "@datune/utils";
import { intervalContains, Interval } from "datils/math";

export function symbolicTimelineToReal(
  midiTimelineSymbolic: MidiTimeline,
  bpm: BPM,
): MidiTimeline {
  const notesTimelineReal = new MidiTimeline( {
    startTime: bpm.getMillis(midiTimelineSymbolic.startTime),
    cellSize: bpm.getMillis(midiTimelineSymbolic.cellSize),
  } );

  for (const n of midiTimelineSymbolic.nodes) {
    notesTimelineReal.add( {
      event: n.event,
      interval: {
        ...n.interval,
        from: bpm.getMillis(n.interval.from),
        to: bpm.getMillis(n.interval.to),
      },
    } );
  }

  return notesTimelineReal;
}

export function intervalDuration(interval: Interval<Time>): Time {
  return interval.to - interval.from;
}

type ClassifyNodesReturn<E> = {
  startNodes: TimelineNode<E>[];
  endNodes: TimelineNode<E>[];
  sustainedNodes: TimelineNode<E>[];
};

export function classifyNodes<E>(
  nodes: TimelineNode<E>[],
  windowInterval: Interval<Time>,
): ClassifyNodesReturn<E> {
  const startNodes: TimelineNode<E>[] = [];
  const endNodes: TimelineNode<E>[] = [];
  const sustainedNodes: TimelineNode<E>[] = [];

  for (const node of nodes) {
    const startsInWindow = intervalContains(windowInterval, node.interval.from);
    const endsInWindow = intervalContains(windowInterval, node.interval.to);

    if (startsInWindow && !endsInWindow)
      startNodes.push(node);
    else if (!startsInWindow && endsInWindow)
      endNodes.push(node);
    else if (!startsInWindow && !endsInWindow)
      sustainedNodes.push(node);
  }

  return {
    startNodes,
    endNodes,
    sustainedNodes: sustainedNodes,
  };
}

type FixableNodeData<E> = [E, TimelineNode<E>[]][];
type ClassifyNodesWithFixableReturn<E> = {
  startNodes: TimelineNode<E>[];
  endNodes: TimelineNode<E>[];
  activeNodes: TimelineNode<E>[];
  fixableNodes: {
    selfContainedNodes: FixableNodeData<E>;
    splitNodes: FixableNodeData<E>;
  };
};
function classifyNodesWithFixable<E>(
  nodes: TimelineNode<E>[],
  windowInterval: Interval<Time>,
): ClassifyNodesWithFixableReturn<E> {
  const startNodes: TimelineNode<E>[] = [];
  const endNodes: TimelineNode<E>[] = [];
  const activeNodes: TimelineNode<E>[] = [];
  const eventClassification = new Map<E, TimelineNode<E>[]>();

  for (const node of nodes) {
    const n = eventClassification.get(node.event) ?? [];

    n.push(node);
  }

  const fixables: E[] = [];

  eventClassification.forEach((nodeArray, event) => {
    if (nodeArray.length === 1) {
      const startsInWindow = intervalContains(windowInterval, nodeArray[0].interval.from);
      const endsInWindow = intervalContains(windowInterval, nodeArray[0].interval.to);

      if (startsInWindow && !endsInWindow)
        startNodes.push(...nodeArray);

      if (!startsInWindow && endsInWindow)
        endNodes.push(...nodeArray);

      if (!startsInWindow && !endsInWindow)
        activeNodes.push(...nodeArray);
    } else
      fixables.push(event);
  } );

  const fixableNodes = {
    selfContainedNodes: [] as FixableNodeData<E>,
    splitNodes: [] as FixableNodeData<E>,
  };

  fixables.forEach((event) => {
    const nodeArray = eventClassification.get(event)!;

    if (nodeArray.every(n=> (
      intervalContains(windowInterval, n.interval.from)
      && intervalContains(windowInterval, n.interval.to)
    )))
      fixableNodes.selfContainedNodes.push([event, nodeArray]);
    else
      fixableNodes.splitNodes.push([event, nodeArray]);
  } );

  return {
    startNodes,
    endNodes,
    activeNodes,
    fixableNodes,
  };
}
