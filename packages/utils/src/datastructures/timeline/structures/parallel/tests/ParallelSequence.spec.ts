/* eslint-disable prefer-destructuring */
import { intervalBetween, IntervalBound } from "datils/math/intervals";
import { add } from "time";
import { fromBetween } from "../../../node/building";
import { EventTest } from "../../../node/tests/EventTest";
import { newNode1 } from "../../../node/tests/cases";
import { ParallelTimelineTest } from "./ParallelTimelineTest";

describe("initial state", () => {
  it("initial state - nodes", () => {
    const expected = 0;
    const tl = new ParallelTimelineTest();
    const actual = tl.nodes.length;

    expect(actual).toStrictEqual(expected);
  } );

  it("initial state - duration", () => {
    const expected = 0;
    const tl = new ParallelTimelineTest();
    const actual = tl.duration;

    expect(actual).toStrictEqual(expected);
  } );
} );

describe("add", () => {
  describe("event", () => {
    it("returns node", () => {
      const tl = new ParallelTimelineTest();
      const node = tl.add(newNode1())[0];

      expect(node).toBeDefined();
    } );

    it("node info", () => {
      const tl = new ParallelTimelineTest();
      const obj = newNode1();
      const node = tl.add(obj)[0];

      expect(node.interval.from).toStrictEqual(obj.interval.from);
      expect(node.interval.to).toStrictEqual(obj.interval.to);
      expect(node.event).toBe(obj.event);
    } );

    it("length nodes", () => {
      const expected = 2;
      const tl = new ParallelTimelineTest();

      tl.add(newNode1());
      tl.add(newNode1());
      const actual = tl.nodes.length;

      expect(actual).toBe(expected);
    } );

    it("duration", () => {
      const expected = 2;
      const tl = new ParallelTimelineTest();

      tl.add(newNode1());
      tl.add( {
        event: new EventTest(),
        interval: intervalBetween(
          tl.duration,
          add(tl.duration, 1),
        ),
      } );
      const actual = tl.duration;

      expect(actual).toStrictEqual(expected);
    } );
  } );

  describe("nodes", () => {
    it("node info", () => {
      const tl = new ParallelTimelineTest();
      const ev = new EventTest();
      const node = fromBetween(ev, 5, 10);

      tl.add(node);

      expect(node.interval.from).toBe(5);
      expect(node.interval.to).toBe(10);
      expect(node.event).toBe(ev);
    } );

    it("length nodes", () => {
      const expected = 1;
      const tl = new ParallelTimelineTest();
      const node = newNode1();

      tl.add(node);
      const actual = tl.nodes.length;

      expect(actual).toBe(expected);
    } );
  } );

  describe("layer", () => {
    it("ok", () => {
      const seq1 = new ParallelTimelineTest();
      const node = {
        event: new EventTest(),
        interval: intervalBetween(0, 1),
      };

      seq1.add(node);

      const seq2 = new ParallelTimelineTest();

      seq2.addTimeline(seq1);

      expect(seq2.nodes).toHaveLength(1);
      expect(seq2.nodes[0]).toStrictEqual(node);
      expect(seq2.nodes[0]).not.toBe(node);
    } );

    it("at 1", () => {
      const seq1 = new ParallelTimelineTest();
      const node = {
        event: new EventTest(),
        interval: intervalBetween(0, 1),
      };

      seq1.add(node);

      const seq2 = new ParallelTimelineTest();

      seq2.addTimeline(seq1, 1);

      const expectedNode = {
        event: new EventTest(),
        interval: intervalBetween(1, 2),
      };

      expect(seq2.nodes).toHaveLength(1);
      expect(seq2.nodes[0]).toEqual(expectedNode);
    } );
  } );
} );

describe("remove", () => {
  it("length nodes", () => {
    const expected = 0;
    const tl = new ParallelTimelineTest();
    const node = tl.add(newNode1())[0];

    tl.remove(node);
    const actual = tl.nodes.length;

    expect(actual).toBe(expected);
  } );

  it("length nodes2", () => {
    const expected = 0;
    const tl = new ParallelTimelineTest();
    const node = tl.add(newNode1())[0];

    tl.remove(node);
    const actual = tl.nodes.length;

    expect(actual).toBe(expected);
  } );

  it("re-add in same time layer", () => {
    const expected = 1;
    const tl = new ParallelTimelineTest();
    const node = tl.add(newNode1())[0];

    tl.remove(node);
    tl.add(node);
    const actual = tl.nodes.length;

    expect(actual).toBe(expected);
  } );

  it("re-add in different time layer", () => {
    const expected = 1;
    const tl = new ParallelTimelineTest();
    const seq2 = new ParallelTimelineTest();
    const node = tl.add(newNode1())[0];

    tl.remove(node);
    seq2.add(node);
    const actual = seq2.nodes.length;

    expect(actual).toBe(expected);
  } );

  it("returns old node", () => {
    const tl = new ParallelTimelineTest();
    const expected = tl.add(newNode1());
    const actual = tl.remove(...expected);

    expect(actual).toEqual(expected);
    expect(actual[0]).toBe(expected[0]);
  } );
} );

describe("onremove", () => {
  it("node found", () => {
    let count = 0;
    const tl = new ParallelTimelineTest();

    tl.add(newNode1());
    tl.onRemove(() => count++);
    const nodeToRemove = tl.nodes[0];

    tl.remove(nodeToRemove);

    expect(count).toBe(1);
  } );

  it("node not found", () => {
    let count = 0;
    const tl = new ParallelTimelineTest();
    const node = newNode1();

    tl.onRemove(() => count++);
    tl.remove(node);

    expect(count).toBe(0);
  } );

  describe("clear", () => {
    it("call once per node", () => {
      let count = 0;
      const tl = new ParallelTimelineTest();

      tl.add(newNode1());
      tl.add(newNode1());
      tl.onRemove(() => count++);
      tl.clear();

      expect(count).toBe(2);
    } );

    it("cleared before call any listener", () => {
      const expected = 0;
      let count = 0;
      const tl = new ParallelTimelineTest();

      tl.add(newNode1());
      tl.add(newNode1());
      tl.onRemove(() => {
        count += tl.nodes.length;

        return count;
      } );
      tl.clear();

      expect(count).toBe(expected);
    } );
  } );
} );

describe("clear", () => {
  it("length nodes", () => {
    const expected = 0;
    const tl = new ParallelTimelineTest();

    tl.add(newNode1());
    tl.clear();
    const actual = tl.nodes.length;

    expect(actual).toBe(expected);
  } );
} );

it("move node begin", () => {
  const expectedInterval = intervalBetween(3, 4);
  const tl = new ParallelTimelineTest();
  const oldNode = newNode1();

  tl.add(oldNode);
  const actualNode = tl.moveNode(oldNode, 3);

  expect(actualNode.interval).toEqual(expectedInterval);
} );

it("move node end", () => {
  const expectedFrom = 4;
  const expectedTo = 5;
  const tl = new ParallelTimelineTest();
  const oldNode = newNode1();

  tl.add(oldNode);
  const newNode = tl.moveNodeEndTo(oldNode, 5);
  const actualFrom = newNode.interval.from;
  const actualTo = newNode.interval.to;

  expect(actualTo).toStrictEqual(expectedTo);
  expect(actualFrom).toBe(expectedFrom);
} );

describe("get", () => {
  let tl: ParallelTimelineTest;

  beforeEach(() => {
    tl = new ParallelTimelineTest();
  } );

  describe("at", () => {
    beforeEach(() => {
      tl.add(newNode1());
      tl.add( {
        interval: intervalBetween(10, 11, {
          from: IntervalBound.OPEN,
          to: IntervalBound.CLOSED,
        } ),
        event: new EventTest(),
      } );
    } );

    it("0 (left included)", () => {
      const got = tl.getAt(0);

      expect(got).toHaveLength(1);
    } );

    it("0.5 (middle)", () => {
      const got = tl.getAt(0.5);

      expect(got).toHaveLength(1);
    } );

    it("1 (right not included)", () => {
      const got = tl.getAt(1);

      expect(got).toHaveLength(0);
    } );

    it("10 (left not included)", () => {
      const got = tl.getAt(10);

      expect(got).toHaveLength(0);
    } );

    it("11 (right included)", () => {
      const got = tl.getAt(11);

      expect(got).toHaveLength(1);
    } );
  } );
} );

it("onchange", () => {
  const expected = 1;
  const tl = new ParallelTimelineTest();
  let actual = 0;

  tl.onChange(() => {
    actual++;
  } );
  const node = tl.add(newNode1())[0];

  tl.moveNode(node, 3);

  expect(actual).toBe(expected);
} );
