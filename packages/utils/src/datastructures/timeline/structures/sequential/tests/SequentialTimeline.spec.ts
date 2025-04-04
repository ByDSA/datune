import { intervalBetween, IntervalBound } from "datils/math/intervals";
import { SequentialTimeline, TimelineNode } from "datastructures/timeline";
import { EventTest } from "datastructures/timeline/node/tests/EventTest";
import { EmptySequentialTimeline, SequentialTimelineTest } from "./SequentialTimelineTest";

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

describe("getAt", () => {
  describe("should get node with getAt with bounds closed", () => {
    let timeline: SequentialTimeline<EventTest>;

    beforeAll(()=> {
      timeline = new EmptySequentialTimeline();

      timeline.add( {
        event: new EventTest(),
        interval: intervalBetween(1, 3, {
          from: IntervalBound.CLOSED,
          to: IntervalBound.CLOSED,
        } ),
      } );
      timeline.add( {
        event: new EventTest(),
        interval: intervalBetween(10, 20, {
          from: IntervalBound.CLOSED,
          to: IntervalBound.CLOSED,
        } ),
      } );
    } );

    it("should get node with getAt with fromBound closed", () => {
      const node = timeline.getAt(1);

      expect(node).toBeTruthy();
    } );

    it("should get node with getAt with toBound closed", () => {
      const node = timeline.getAt(3);

      expect(node).toBeTruthy();
    } );

    it("should get node with getAt with toBound closed at cellsize border 1", () => {
      const node = timeline.getAt(10);

      expect(node).toBeTruthy();
    } );

    it("should get node with getAt with toBound closed at cellsize border 2", () => {
      const node = timeline.getAt(20);

      expect(node).toBeTruthy();
    } );
  } );

  describe("should not get node with getAt with bounds open", () => {
    let timeline: SequentialTimeline<EventTest>;

    beforeAll(()=> {
      timeline = new EmptySequentialTimeline();

      timeline.add( {
        event: new EventTest(),
        interval: intervalBetween(1, 3, {
          from: IntervalBound.OPEN,
          to: IntervalBound.OPEN,
        } ),
      } );

      timeline.add( {
        event: new EventTest(),
        interval: intervalBetween(10, 20, {
          from: IntervalBound.OPEN,
          to: IntervalBound.OPEN,
        } ),
      } );
    } );

    it("should not get node with getAt with fromBound open", () => {
      const node = timeline.getAt(1);

      expect(node).toBeUndefined();
    } );

    it("should not get node with getAt with toBound open", () => {
      const node = timeline.getAt(3);

      expect(node).toBeUndefined();
    } );

    it("should not get node with getAt with toBound open at cellsize border 1", () => {
      const node = timeline.getAt(10);

      expect(node).toBeUndefined();
    } );

    it("should not get node with getAt with toBound open at cellsize border 2", () => {
      const node = timeline.getAt(20);

      expect(node).toBeUndefined();
    } );
  } );
} );
