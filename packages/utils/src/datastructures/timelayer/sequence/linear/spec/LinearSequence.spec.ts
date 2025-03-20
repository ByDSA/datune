import { of as intervalOf } from "datils/math/intervals";
import { TemporalNode } from "datastructures/timelayer/temporal-node";
import { EventTest } from "datastructures/timelayer/temporal-node/spec/EventTest";
import { LinearSequenceTest } from "./LinearSequenceTest";

describe("add", () => {
  let sequence: LinearSequenceTest;

  beforeEach(() => {
    sequence = new LinearSequenceTest();
  } );

  it("no overlapping", () => {
    sequence.add( {
      event: new EventTest(),
      from: 10,
      to: 20,
    } );

    const expected = [
      {
        event: new EventTest(),
        interval: intervalOf(10, 20),
      },
      {
        event: new EventTest(),
        interval: intervalOf(1, 9),
      },
    ];

    expectCompare(sequence.nodes, expected);
  } );

  describe("overlapping", () => {
    it("total", () => {
      sequence.add( {
        event: new EventTest(),
        from: 0,
        to: 10,
      } );

      const expected = [
        {
          event: new EventTest(),
          interval: intervalOf(0, 10),
        },
      ];

      expectCompare(sequence.nodes, expected);
    } );

    it("left", () => {
      sequence.add( {
        event: new EventTest(),
        from: 0,
        to: 5,
      } );

      const expected = [
        {
          event: new EventTest(),
          interval: intervalOf(0, 5),
        },
        {
          event: new EventTest(),
          interval: intervalOf(5, 9),
        },
      ];

      expectCompare(sequence.nodes, expected);
    } );

    it("right", () => {
      sequence.add( {
        event: new EventTest(),
        from: 6,
        to: 15,
      } );

      const expected = [
        {
          event: new EventTest(),
          interval: intervalOf(1, 6),
        },
        {
          event: new EventTest(),
          interval: intervalOf(6, 15),
        },
      ];

      expectCompare(sequence.nodes, expected);
    } );

    it("sub", () => {
      sequence.add( {
        event: new EventTest(),
        from: 3,
        to: 6,
      } );

      const expected = [
        {
          event: new EventTest(),
          interval: intervalOf(1, 3),
        },
        {
          event: new EventTest(),
          interval: intervalOf(3, 6),
        },
        {
          event: new EventTest(),
          interval: intervalOf(6, 9),
        },
      ];

      expectCompare(sequence.nodes, expected);
    } );
  } );
} );

function expectCompare(a: readonly TemporalNode<EventTest>[], b: TemporalNode<EventTest>[]) {
  expect([...a].sort(sortFunc)).toEqual(b.sort(sortFunc));
}

function sortFunc(a: any, b: any) {
  return a.interval.from - b.interval.from;
}
