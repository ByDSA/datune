import type { IntervalArray } from "../../Array";
import type { Interval } from "../../Interval";
import { expectIntervals } from "../../tests/intervals";
import { neg } from "../neg";
import { Intervals as I } from "../..";
import { serie } from "./index";

const { M9, M13, P1, P5 } = I;

describe.each([
  [{
    interval: P5,
  }, [P5]],
  [{
    interval: P5,
    length: 2,
  }, [P5, M9]],
  [{
    interval: P5,
    startIndex: 0,
  }, [P1]],
  [{
    interval: P5,
    length: 2,
    startIndex: 0,
  }, [P1, P5]],
  [{
    interval: P5,
    length: 4,
    startIndex: 0,
  }, [P1, P5, M9, M13]],
  [{
    interval: P5,
    length: 0,
  }, []],
  [{
    interval: P5,
    length: 1,
    startIndex: 1,
  }, [P5]],
  [{
    interval: P5,
    length: 3,
    startIndex: -1,
  }, [neg(P5), P1, P5]],
  [{
    interval: neg(P5),
    startIndex: 0,
    length: 4,
  }, [P1,
    neg(P5),
    neg(M9), neg(M13)]],
])("tests", (args: any, expected: Interval[]) => {
  let argsStr = `interval: ${String(args.interval)}`;

  if (args.startIndex !== undefined)
    argsStr += `, startIndex: ${args.startIndex}`;

  if (args.length !== undefined)
    argsStr += `, length: ${args.length}`;

  it(`${argsStr} => ${String(expected as IntervalArray)}`, () => {
    const actual = serie(args);

    expectIntervals(actual, expected);
  } );
} );
