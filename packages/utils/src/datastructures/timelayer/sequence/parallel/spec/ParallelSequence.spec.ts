/* eslint-disable prefer-destructuring */
import { of as intervalOf } from "datils/math/intervals";
import { add } from "time";
import { from as temporalNode } from "../../../temporal-node";
import { EventTest } from "../../../temporal-node/spec/EventTest";
import { newNode1 } from "../../../temporal-node/spec/utils";
import { ParalelSequenceTest } from "./ParallelSequenceTest";

describe("initial state", () => {
  it("initial state - nodes", () => {
    const expected = 0;
    const seq = new ParalelSequenceTest();
    const actual = seq.nodes.length;

    expect(actual).toStrictEqual(expected);
  } );

  it("initial state - duration", () => {
    const expected = 0;
    const seq = new ParalelSequenceTest();
    const actual = seq.duration;

    expect(actual).toStrictEqual(expected);
  } );
} );

describe("add", () => {
  describe("event", () => {
    it("returns node", () => {
      const seq = new ParalelSequenceTest();
      const node = seq.add(newNode1())[0];

      expect(node).toBeDefined();
    } );

    it("node info", () => {
      const seq = new ParalelSequenceTest();
      const obj = newNode1();
      const node = seq.add(obj)[0];

      expect(node.interval.from).toStrictEqual(obj.interval.from);
      expect(node.interval.to).toStrictEqual(obj.interval.to);
      expect(node.event).toBe(obj.event);
    } );

    it("length nodes", () => {
      const expected = 2;
      const seq = new ParalelSequenceTest();

      seq.add(newNode1());
      seq.add(newNode1());
      const actual = seq.nodes.length;

      expect(actual).toBe(expected);
    } );

    it("duration", () => {
      const expected = 2;
      const seq = new ParalelSequenceTest();

      seq.add(newNode1());
      seq.add( {
        event: new EventTest(),
        from: seq.duration,
        to: add(seq.duration, 1),
      } );
      const actual = seq.duration;

      expect(actual).toStrictEqual(expected);
    } );
  } );

  describe("nodes", () => {
    it("node info", () => {
      const seq = new ParalelSequenceTest();
      const ev = new EventTest();
      const node = temporalNode( {
        from: 5,
        to: 10,
        event: ev,
      } );

      seq.add(node);

      expect(node.interval.from).toBe(5);
      expect(node.interval.to).toBe(10);
      expect(node.event).toBe(ev);
    } );

    it("length nodes", () => {
      const expected = 1;
      const seq = new ParalelSequenceTest();
      const node = newNode1();

      seq.add(node);
      const actual = seq.nodes.length;

      expect(actual).toBe(expected);
    } );
  } );

  describe("layer", () => {
    it("ok", () => {
      const seq1 = new ParalelSequenceTest();
      const node = {
        event: new EventTest(),
        interval: intervalOf(0, 1),
      };

      seq1.add(node);

      const seq2 = new ParalelSequenceTest();

      seq2.add( {
        layer: seq1,
      } );

      expect(seq2.nodes).toHaveLength(1);
      expect(seq2.nodes[0]).toBe(node);
    } );

    it("at 1", () => {
      const seq1 = new ParalelSequenceTest();
      const node = {
        event: new EventTest(),
        interval: intervalOf(0, 1),
      };

      seq1.add(node);

      const seq2 = new ParalelSequenceTest();

      seq2.add( {
        layer: seq1,
        at: 1,
      } );

      const expectedNode = {
        event: new EventTest(),
        interval: intervalOf(1, 2),
      };

      expect(seq2.nodes).toHaveLength(1);
      expect(seq2.nodes[0]).toEqual(expectedNode);
    } );
  } );
} );

describe("remove", () => {
  it("length nodes", () => {
    const expected = 0;
    const seq = new ParalelSequenceTest();
    const node = seq.add(newNode1())[0];

    seq.remove(node);
    const actual = seq.nodes.length;

    expect(actual).toBe(expected);
  } );

  it("length nodes2", () => {
    const expected = 0;
    const seq = new ParalelSequenceTest();
    const node = seq.add(newNode1())[0];

    seq.remove(node);
    const actual = seq.nodes.length;

    expect(actual).toBe(expected);
  } );

  it("re-add in same time layer", () => {
    const expected = 1;
    const seq = new ParalelSequenceTest();
    const node = seq.add(newNode1())[0];

    seq.remove(node);
    seq.add(node);
    const actual = seq.nodes.length;

    expect(actual).toBe(expected);
  } );

  it("re-add in different time layer", () => {
    const expected = 1;
    const seq = new ParalelSequenceTest();
    const seq2 = new ParalelSequenceTest();
    const node = seq.add(newNode1())[0];

    seq.remove(node);
    seq2.add(node);
    const actual = seq2.nodes.length;

    expect(actual).toBe(expected);
  } );

  it("returns old node", () => {
    const seq = new ParalelSequenceTest();
    const expected = seq.add(newNode1());
    const actual = seq.remove(expected);

    expect(actual).toEqual(expected);
    expect(actual[0]).toBe(expected[0]);
  } );
} );

describe("onremove", () => {
  it("node found", () => {
    let count = 0;
    const seq = new ParalelSequenceTest();

    seq.add(newNode1());
    seq.onRemove(() => count++);
    const nodeToRemove = seq.nodes[0];

    seq.remove(nodeToRemove);

    expect(count).toBe(1);
  } );

  it("node not found", () => {
    let count = 0;
    const seq = new ParalelSequenceTest();
    const node = newNode1();

    seq.onRemove(() => count++);
    seq.remove(node);

    expect(count).toBe(0);
  } );

  describe("clear", () => {
    it("call once per node", () => {
      let count = 0;
      const seq = new ParalelSequenceTest();

      seq.add(newNode1());
      seq.add(newNode1());
      seq.onRemove(() => count++);
      seq.clear();

      expect(count).toBe(2);
    } );

    it("cleared before call any listener", () => {
      const expected = 0;
      let count = 0;
      const seq = new ParalelSequenceTest();

      seq.add(newNode1());
      seq.add(newNode1());
      seq.onRemove(() => {
        count += seq.nodes.length;

        return count;
      } );
      seq.clear();

      expect(count).toBe(expected);
    } );
  } );
} );

describe("clear", () => {
  it("length nodes", () => {
    const expected = 0;
    const seq = new ParalelSequenceTest();

    seq.add(newNode1());
    seq.clear();
    const actual = seq.nodes.length;

    expect(actual).toBe(expected);
  } );
} );

it("move node begin", () => {
  const expectedInterval = intervalOf(3, 4);
  const seq = new ParalelSequenceTest();
  const oldNode = newNode1();

  seq.add(oldNode);
  const actualNode = seq.moveNode(oldNode, 3);

  expect(actualNode.interval).toEqual(expectedInterval);
} );

it("move node end", () => {
  const expectedFrom = 4;
  const expectedTo = 5;
  const seq = new ParalelSequenceTest();
  const oldNode = newNode1();

  seq.add(oldNode);
  const newNode = seq.moveNodeEndTo(oldNode, 5);
  const actualFrom = newNode.interval.from;
  const actualTo = newNode.interval.to;

  expect(actualTo).toStrictEqual(expectedTo);
  expect(actualFrom).toBe(expectedFrom);
} );

describe("get", () => {
  let seq: ParalelSequenceTest;

  beforeEach(() => {
    seq = new ParalelSequenceTest();
  } );

  describe("at", () => {
    beforeEach(() => {
      seq.add(newNode1());
      seq.add( {
        interval: intervalOf(10, 11, {
          fromInclusive: false,
          toInclusive: true,
        } ),
        event: new EventTest(),
      } );
    } );

    it("0 (left included)", () => {
      const got = seq.get( {
        at: 0,
      } );

      expect(got).toHaveLength(1);
    } );

    it("0.5 (middle)", () => {
      const got = seq.get( {
        at: 0.5,
      } );

      expect(got).toHaveLength(1);
    } );

    it("1 (right not included)", () => {
      const got = seq.get( {
        at: 1,
      } );

      expect(got).toHaveLength(0);
    } );

    it("10 (left not included)", () => {
      const got = seq.get( {
        at: 10,
      } );

      expect(got).toHaveLength(0);
    } );

    it("11 (right included)", () => {
      const got = seq.get( {
        at: 11,
      } );

      expect(got).toHaveLength(1);
    } );
  } );
} );

it("onchange", () => {
  const expected = 1;
  const seq = new ParalelSequenceTest();
  let actual = 0;

  seq.onChange(() => {
    actual++;
  } );
  const node = seq.add(newNode1())[0];

  seq.moveNode(node, 3);

  expect(actual).toBe(expected);
} );
