import { intervalBetween, IntervalBound } from "datils/math";
import { SequentialPointTimeline } from "./SequentialPointTimeline";

describe("sequentialPointTimeline", () => {
  let timeline: SequentialPointTimeline<string>;

  beforeEach(() => {
    timeline = new SequentialPointTimeline();
  } );

  describe("add", () => {
    it("should add nodes in order", () => {
      timeline.add(
        {
          time: 2,
          event: "b",
        },
        {
          time: 1,
          event: "a",
        },
        {
          time: 3,
          event: "c",
        },
      );

      expect(timeline.nodes).toEqual([
        {
          time: 1,
          event: "a",
        },
        {
          time: 2,
          event: "b",
        },
        {
          time: 3,
          event: "c",
        },
      ]);
    } );

    it("should overwrite nodes at same time", () => {
      timeline.add(
        {
          time: 1,
          event: "a",
        },
        {
          time: 1,
          event: "b",
        },
      );

      expect(timeline.nodes).toEqual([
        {
          time: 1,
          event: "b",
        },
      ]);
    } );
  } );

  describe("remove", () => {
    beforeEach(() => {
      timeline.add(
        {
          time: 1,
          event: "a",
        },
        {
          time: 2,
          event: "b",
        },
        {
          time: 3,
          event: "c",
        },
      );
    } );

    it("should remove specified nodes", () => {
      const removed = timeline.remove( {
        time: 2,
        event: "b",
      } );

      expect(removed).toEqual([{
        time: 2,
        event: "b",
      }]);
      expect(timeline.nodes).toEqual([
        {
          time: 1,
          event: "a",
        },
        {
          time: 3,
          event: "c",
        },
      ]);
    } );
  } );

  describe("removeAtInterval", () => {
    beforeEach(() => {
      timeline.add(
        {
          time: 1,
          event: "a",
        },
        {
          time: 2,
          event: "b",
        },
        {
          time: 3,
          event: "c",
        },
        {
          time: 4,
          event: "d",
        },
      );
    } );

    it("should remove 'b' but not 'c'", () => {
      const removed = timeline.removeAtInterval(intervalBetween(2, 3));

      expect(removed).toEqual([
        {
          time: 2,
          event: "b",
        },
      ]);

      expect(timeline.nodes).toEqual([
        {
          time: 1,
          event: "a",
        },
        {
          time: 3,
          event: "c",
        },
        {
          time: 4,
          event: "d",
        },
      ]);
    } );

    it("should remove nodes in interval2", () => {
      const removed = timeline.removeAtInterval(intervalBetween(2.5, 3.5));

      expect(removed).toEqual([
        {
          time: 3,
          event: "c",
        },
      ]);

      expect(timeline.nodes).toEqual([
        {
          time: 1,
          event: "a",
        },
        {
          time: 2,
          event: "b",
        },
        {
          time: 4,
          event: "d",
        },
      ]);
    } );
  } );

  describe("getAtInterval", () => {
    beforeEach(() => {
      timeline.add(
        {
          time: 1,
          event: "a",
        },
        {
          time: 2,
          event: "b",
        },
        {
          time: 3,
          event: "c",
        },
      );
    } );

    it("should get 'a' (time=1) but not 'b' (time=2)", () => {
      const nodes = timeline.getAtInterval(intervalBetween(1, 2));

      expect(nodes).toEqual([
        {
          time: 1,
          event: "a",
        },
      ]);
    } );

    it("should get nodes in interval 2", () => {
      const nodes = timeline.getAtInterval(intervalBetween(-1, 2));

      expect(nodes).toEqual([
        {
          time: 1,
          event: "a",
        },
      ]);
    } );

    it("should get nothing in interval with no nodes", () => {
      const nodes = timeline.getAtInterval(intervalBetween(10, 20));

      expect(nodes).toEqual([]);
    } );

    describe("getAtInterval with bounds", () => {
      it("should include boundary nodes with CLOSED bounds", () => {
        const nodes = timeline.getAtInterval( {
          from: 1,
          to: 3,
          fromBound: IntervalBound.CLOSED,
          toBound: IntervalBound.CLOSED,
        } );

        expect(nodes).toEqual([
          {
            time: 1,
            event: "a",
          },
          {
            time: 2,
            event: "b",
          },
          {
            time: 3,
            event: "c",
          },
        ]);
      } );

      it("should exclude boundary nodes with OPEN bounds", () => {
        const nodes = timeline.getAtInterval( {
          from: 1,
          to: 3,
          fromBound: IntervalBound.OPEN,
          toBound: IntervalBound.OPEN,
        } );

        expect(nodes).toEqual([
          {
            time: 2,
            event: "b",
          },
        ]);
      } );

      it("should handle mixed bounds correctly", () => {
        const nodes = timeline.getAtInterval( {
          from: 1,
          to: 3,
          fromBound: IntervalBound.CLOSED,
          toBound: IntervalBound.OPEN,
        } );

        expect(nodes).toEqual([
          {
            time: 1,
            event: "a",
          },
          {
            time: 2,
            event: "b",
          },
        ]);
      } );

      it("should return empty array when no nodes in interval", () => {
        const nodes = timeline.getAtInterval( {
          from: 1.5,
          to: 1.7,
          fromBound: IntervalBound.CLOSED,
          toBound: IntervalBound.CLOSED,
        } );

        expect(nodes).toEqual([]);
      } );

      it("should return empty array when interval is before all nodes", () => {
        const nodes = timeline.getAtInterval( {
          from: -1,
          to: 0,
          fromBound: IntervalBound.CLOSED,
          toBound: IntervalBound.CLOSED,
        } );

        expect(nodes).toEqual([]);
      } );

      it("should return empty array when interval is after all nodes", () => {
        const nodes = timeline.getAtInterval( {
          from: 4,
          to: 5,
          fromBound: IntervalBound.CLOSED,
          toBound: IntervalBound.CLOSED,
        } );

        expect(nodes).toEqual([]);
      } );
    } );
  } );

  describe("moveNode", () => {
    beforeEach(() => {
      timeline.add(
        {
          time: 1,
          event: "a",
        },
        {
          time: 2,
          event: "b",
        },
      );
    } );

    it("should move node to new time", () => {
      const node = timeline.nodes[0];
      const moved = timeline.moveNode(node, 3);

      expect(moved).toEqual( {
        time: 3,
        event: "a",
      } );
      expect(timeline.nodes).toEqual([
        {
          time: 2,
          event: "b",
        },
        {
          time: 3,
          event: "a",
        },
      ]);
    } );
  } );

  describe("getLeftAt & getRightAt", () => {
    beforeEach(() => {
      timeline.add(
        {
          time: 1,
          event: "a",
        },
        {
          time: 3,
          event: "b",
        },
      );
    } );

    it("should get most recent event before time", () => {
      expect(timeline.getLeftAt(2)?.event).toBe("a");
      expect(timeline.getLeftAt(3)?.event).toBe("b");
      expect(timeline.getLeftAt(0)).toBeNull();
    } );

    it("should get most recent event after time", () => {
      expect(timeline.getRightAt(0)?.event).toBe("a");
      expect(timeline.getRightAt(2)?.event).toBe("b");
      expect(timeline.getRightAt(3)?.event).toBe("b");
      expect(timeline.getRightAt(3.5)).toBeNull();
    } );
  } );

  describe("duration", () => {
    it("should return 0 for empty timeline", () => {
      expect(timeline.duration).toBe(0);
    } );

    it("should return duration between first and last nodes", () => {
      timeline.add(
        {
          time: 1,
          event: "a",
        },
        {
          time: 4,
          event: "b",
        },
      );

      expect(timeline.duration).toBe(3);
    } );
  } );

  describe("clear", () => {
    it("should remove all nodes", () => {
      timeline.add( {
        time: 1,
        event: "a",
      } );
      timeline.clear();

      expect(timeline.nodes).toEqual([]);
    } );
  } );
} );
