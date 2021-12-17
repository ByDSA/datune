import { newAddEvent1, newNode1 } from "datastructures/timelayer/TemporalNode/spec/utils";
import SimpleTime from "../../../../../time/SimpleTime";
import TemporalNode from "../../../TemporalNode";
import EventTest from "../../../TemporalNode/spec/EventTest";
import ParalelSequenceTest from "./ParallelSequenceTest";

describe("initial state", () => {
  it("initial state - nodes", () => {
    const expected = 0;
    const seq = new ParalelSequenceTest();
    const actual = seq.nodes.length;

    expect(actual).toStrictEqual(expected);
  } );

  it("initial state - duration", () => {
    const expected = new SimpleTime(0);
    const seq = new ParalelSequenceTest();
    const actual = seq.duration;

    expect(actual).toStrictEqual(expected);
  } );
} );

describe("add", () => {
  describe("event", () => {
    it("returns node", () => {
      const seq = new ParalelSequenceTest();
      const node = seq.add(newAddEvent1())[0];

      expect(node).toBeDefined();
    } );
    it("node info", () => {
      const seq = new ParalelSequenceTest();
      const obj = newAddEvent1();
      const node = seq.add(obj)[0];

      expect(node.from).toStrictEqual(obj.from);
      expect(node.to).toStrictEqual(obj.to);
      expect(node.event).toBe(obj.event);
    } );

    it("length nodes", () => {
      const expected = 2;
      const seq = new ParalelSequenceTest();

      seq.add(newAddEvent1());
      seq.add(newAddEvent1());
      const actual = seq.nodes.length;

      expect(actual).toBe(expected);
    } );

    it("duration", () => {
      const expected = new SimpleTime(2);
      const seq = new ParalelSequenceTest();

      seq.add(newAddEvent1());
      seq.add( {
        event: new EventTest(),
        from: seq.duration,
        to: seq.duration.withAdd(new SimpleTime(1)),
      } );
      const actual = seq.duration;

      expect(actual).toStrictEqual(expected);
    } );
  } );

  describe("nodes", () => {
    it("node info", () => {
      const seq = new ParalelSequenceTest();
      const ev = new EventTest();
      const node = new TemporalNode( {
        from: new SimpleTime(5),
        to: new SimpleTime(10),
        event: ev,
      } );

      seq.add(node);

      expect(node.from).toStrictEqual(new SimpleTime(5));
      expect(node.to).toStrictEqual(new SimpleTime(10));
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
} );

describe("remove", () => {
  it("length nodes", () => {
    const expected = 0;
    const seq = new ParalelSequenceTest();
    const node = seq.add(newAddEvent1())[0];

    seq.remove(node);
    const actual = seq.nodes.length;

    expect(actual).toBe(expected);
  } );

  it("length nodes", () => {
    const expected = 0;
    const seq = new ParalelSequenceTest();
    const node = seq.add(newAddEvent1())[0];

    seq.remove(node);
    const actual = seq.nodes.length;

    expect(actual).toBe(expected);
  } );

  it("re-add in same time layer", () => {
    const expected = 1;
    const seq = new ParalelSequenceTest();
    const node = seq.add(newAddEvent1())[0];

    seq.remove(node);
    seq.add(node);
    const actual = seq.nodes.length;

    expect(actual).toBe(expected);
  } );

  it("re-add in different time layer", () => {
    const expected = 1;
    const seq = new ParalelSequenceTest();
    const seq2 = new ParalelSequenceTest();
    const node = seq.add(newAddEvent1())[0];

    seq.remove(node);
    seq2.add(node);
    const actual = seq2.nodes.length;

    expect(actual).toBe(expected);
  } );
  it("returns old node", () => {
    const seq = new ParalelSequenceTest();
    const expected = seq.add(newAddEvent1());
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

      seq.add(newAddEvent1());
      seq.add(newAddEvent1());
      seq.onRemove(() => count++);
      seq.clear();

      expect(count).toBe(2);
    } );

    it("cleared before call any listener", () => {
      const expected = 0;
      let count = 0;
      const seq = new ParalelSequenceTest();

      seq.add(newAddEvent1());
      seq.add(newAddEvent1());
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

    seq.add(newAddEvent1());
    seq.clear();
    const actual = seq.nodes.length;

    expect(actual).toBe(expected);
  } );
} );

it("move node begin", () => {
  const expectedFrom = new SimpleTime(3);
  const expectedTo = new SimpleTime(5);
  const seq = new ParalelSequenceTest();
  const oldNode = seq.add(newAddEvent1())[0];

  oldNode.to = expectedTo;
  const newNode = seq.moveNodeBeginTo(oldNode, new SimpleTime(3));
  const actualFrom = newNode.from;
  const actualTo = newNode.to;

  expect(actualFrom).toStrictEqual(expectedFrom);
  expect(actualTo).toBe(expectedTo);
} );

it("move node end", () => {
  const expectedFrom = new SimpleTime(3);
  const expectedTo = new SimpleTime(5);
  const seq = new ParalelSequenceTest();
  const oldNode = seq.add(newAddEvent1())[0];

  oldNode.from = expectedFrom;
  const newNode = seq.moveNodeEndTo(oldNode, new SimpleTime(5));
  const actualFrom = newNode.from;
  const actualTo = newNode.to;

  expect(actualTo).toStrictEqual(expectedTo);
  expect(actualFrom).toBe(expectedFrom);
} );

it("onchange", () => {
  const expected = 1;
  const seq = new ParalelSequenceTest();
  let actual = 0;

  seq.onChange(() => {
    actual++;
  } );
  const node = seq.add(newAddEvent1())[0];

  seq.moveNodeBeginTo(node, new SimpleTime(3));

  expect(actual).toBe(expected);
} );
