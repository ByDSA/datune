import { intervalBetween } from "datils/math/intervals";
import { SequentialTimeline } from "./Sequential";

describe("sequentialTimeline", () => {
  let timeline: SequentialTimeline<string>;

  beforeEach(() => {
    timeline = new SequentialTimeline( {
      startTime: 0,
      cellSize: 1,
    } );
  } );

  describe("add", () => {
    it("should add non-overlapping nodes", () => {
      const node1 = {
        event: "event1",
        interval: intervalBetween(0, 1),
      };
      const node2 = {
        event: "event2",
        interval: intervalBetween(2, 3),
      };

      timeline.add(node1, node2);

      expect(timeline.nodes).toHaveLength(2);
      expect(timeline.getAt(0)).toBe(node1);
      expect(timeline.getAt(2)).toBe(node2);
    } );

    it("should handle total overlap by removing old node", () => {
      const oldNode = {
        event: "old",
        interval: intervalBetween(1, 2),
      };
      const newNode = {
        event: "new",
        interval: intervalBetween(0, 3),
      };

      timeline.add(oldNode);
      timeline.add(newNode);

      expect(timeline.nodes).toHaveLength(1);
      expect(timeline.getAt(1)).toBe(newNode);
    } );

    it("should handle partial right overlap by trimming old node", () => {
      const oldNode = {
        event: "old",
        interval: intervalBetween(0, 2),
      };
      const newNode = {
        event: "new",
        interval: intervalBetween(1, 3),
      };

      timeline.add(oldNode);
      timeline.add(newNode);

      expect(timeline.nodes).toHaveLength(2);
      expect(timeline.getAt(0)?.event).toBe("old");
      expect(timeline.getAt(2)?.event).toBe("new");
    } );

    it("should handle partial left overlap by trimming old node", () => {
      const oldNode = {
        event: "old",
        interval: intervalBetween(1, 3),
      };
      const newNode = {
        event: "new",
        interval: intervalBetween(0, 2),
      };

      timeline.add(oldNode);
      timeline.add(newNode);

      expect(timeline.nodes).toHaveLength(2);
      expect(timeline.getAt(1)?.event).toBe("new");
      expect(timeline.getAt(2)?.event).toBe("old");
    } );

    it("should handle sub overlap by splitting old node", () => {
      const oldNode = {
        event: "old",
        interval: intervalBetween(0, 4),
      };
      const newNode = {
        event: "new",
        interval: intervalBetween(1, 3),
      };

      timeline.add(oldNode);
      timeline.add(newNode);

      expect(timeline.nodes).toHaveLength(3);
      expect(timeline.getAt(0)?.event).toBe("old");
      expect(timeline.getAt(2)?.event).toBe("new");
      expect(timeline.getAt(3)?.event).toBe("old");
    } );
  } );

  describe("removeAt", () => {
    it("should remove node at specific time", () => {
      const node = {
        event: "test",
        interval: intervalBetween(0, 1),
      };

      timeline.add(node);

      const removed = timeline.removeAt(0);

      expect(removed).toBe(node);
      expect(timeline.nodes).toHaveLength(0);
    } );
  } );

  describe("getAt", () => {
    it("should get node at specific time", () => {
      const node = {
        event: "test",
        interval: intervalBetween(1, 2),
      };

      timeline.add(node);

      expect(timeline.getAt(1)).toBe(node);
    } );
  } );

  describe("extendsNode", () => {
    it("should extend node interval", () => {
      const node = {
        event: "test",
        interval: intervalBetween(1, 2),
      };

      timeline.add(node);

      const extended = timeline.extendNode(node, {
        to: 3,
      } );

      expect(extended.interval.from).toBe(1);
      expect(extended.interval.to).toBe(3);
      expect(extended.event).toBe("test");
    } );

    it("should allow extending start time", () => {
      const node = {
        event: "test",
        interval: intervalBetween(2, 3),
      };

      timeline.add(node);

      const extended = timeline.extendNode(node, {
        from: 1,
      } );

      expect(extended.interval.from).toBe(1);
      expect(extended.interval.to).toBe(3);
    } );

    it("should allow shrinking interval", () => {
      const node = {
        event: "test",
        interval: intervalBetween(1, 4),
      };

      timeline.add(node);

      const extended = timeline.extendNode(node, {
        from: 2,
        to: 3,
      } );

      expect(extended.interval.from).toBe(2);
      expect(extended.interval.to).toBe(3);
    } );
  } );

  describe("extendNode with overlapping", () => {
    it("should handle total overlap by removing overlapped nodes", () => {
      const existingNode = {
        event: "existing",
        interval: intervalBetween(1, 3),
      };
      const targetNode = {
        event: "target",
        interval: intervalBetween(2, 3),
      };

      timeline.add(existingNode);
      timeline.add(targetNode);

      const extended = timeline.extendNode(targetNode, {
        from: 0,
        to: 4,
      } );

      expect(timeline.nodes).toHaveLength(1);
      expect(extended.interval.from).toBe(0);
      expect(extended.interval.to).toBe(4);
      expect(extended.event).toBe("target");
    } );

    it("should handle right overlap by trimming existing node", () => {
      const existingNode = {
        event: "existing",
        interval: intervalBetween(0, 3),
      };
      const targetNode = {
        event: "target",
        interval: intervalBetween(2, 3),
      };

      timeline.add(existingNode);
      timeline.add(targetNode);

      const extended = timeline.extendNode(targetNode, {
        from: 1,
        to: 4,
      } );

      expect(timeline.nodes).toHaveLength(2);
      expect(timeline.getAt(0)?.event).toBe("existing");
      expect(extended.interval.from).toBe(1);
      expect(extended.interval.to).toBe(4);
    } );

    it("should handle left overlap by trimming existing node", () => {
      const existingNode = {
        event: "existing",
        interval: intervalBetween(2, 4),
      };
      const targetNode = {
        event: "target",
        interval: intervalBetween(1, 2),
      };

      timeline.add(existingNode);
      timeline.add(targetNode);

      const extended = timeline.extendNode(targetNode, {
        to: 3,
      } );

      expect(timeline.nodes).toHaveLength(2);
      expect(timeline.getAt(3)?.event).toBe("existing");
      expect(extended.interval.from).toBe(1);
      expect(extended.interval.to).toBe(3);
    } );

    it("should handle sub overlap by splitting existing node", () => {
      const existingNode = {
        event: "existing",
        interval: intervalBetween(0, 4),
      };
      const targetNode = {
        event: "target",
        interval: intervalBetween(2, 3),
      };

      timeline.add(existingNode);
      timeline.add(targetNode);

      const extended = timeline.extendNode(targetNode, {
        from: 1,
        to: 3,
      } );

      expect(timeline.nodes).toHaveLength(3);
      expect(timeline.getAt(0)?.event).toBe("existing");
      expect(extended.interval.from).toBe(1);
      expect(extended.interval.to).toBe(3);
      expect(timeline.getAt(3)?.event).toBe("existing");
    } );
  } );
} );
