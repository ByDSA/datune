import { intervalBetween } from "datils/math/intervals";
import { TimelineNode } from "datastructures/timeline";
import { EventTest } from "datastructures/timeline/node/tests/EventTest";
import { SequentialTimelineTest } from "./SequentialTimelineTest";

describe("add", () => {
  let timeline: SequentialTimelineTest;

  beforeEach(() => {
    timeline = new SequentialTimelineTest();
  } );

  it("no overlapping", () => {
    timeline.add( {
      event: new EventTest(),
      interval: intervalBetween(10, 20),
    } );

    const expected = [
      {
        event: new EventTest(),
        interval: intervalBetween(10, 20),
      },
      {
        event: new EventTest(),
        interval: intervalBetween(1, 9),
      },
    ];

    expectCompare(timeline.nodes, expected);
  } );

  describe("overlapping", () => {
    it("total", () => {
      timeline.add( {
        event: new EventTest(),
        interval: intervalBetween(0, 10),
      } );

      const expected = [
        {
          event: new EventTest(),
          interval: intervalBetween(0, 10),
        },
      ];

      expectCompare(timeline.nodes, expected);
    } );

    it("left", () => {
      timeline.add( {
        event: new EventTest(),
        interval: intervalBetween(0, 5),
      } );

      const expected = [
        {
          event: new EventTest(),
          interval: intervalBetween(0, 5),
        },
        {
          event: new EventTest(),
          interval: intervalBetween(5, 9),
        },
      ];

      expectCompare(timeline.nodes, expected);
    } );

    it("right", () => {
      timeline.add( {
        event: new EventTest(),
        interval: intervalBetween(6, 15),
      } );

      const expected = [
        {
          event: new EventTest(),
          interval: intervalBetween(1, 6),
        },
        {
          event: new EventTest(),
          interval: intervalBetween(6, 15),
        },
      ];

      expectCompare(timeline.nodes, expected);
    } );

    it("sub", () => {
      timeline.add( {
        event: new EventTest(),
        interval: intervalBetween(3, 6),
      } );

      const expected = [
        {
          event: new EventTest(),
          interval: intervalBetween(1, 3),
        },
        {
          event: new EventTest(),
          interval: intervalBetween(3, 6),
        },
        {
          event: new EventTest(),
          interval: intervalBetween(6, 9),
        },
      ];

      expectCompare(timeline.nodes, expected);
    } );
  } );
} );

function expectCompare(a: readonly TimelineNode<EventTest>[], b: TimelineNode<EventTest>[]) {
  expect([...a].sort(sortFunc)).toEqual(b.sort(sortFunc));
}

function sortFunc(a: any, b: any) {
  return a.interval.from - b.interval.from;
}
