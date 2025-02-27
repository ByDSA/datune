import IntervalArray from "../../Array";
import { MAJOR_NINTH, MAJOR_THIRTEENTH, PERFECT_FIFTH, PERFECT_UNISON } from "../../constants";
import Interval from "../../Interval";
import { neg } from "../neg";
import { serie } from "./index";
import { TestInit } from "tests";

TestInit.diatonicAltInterval();

describe.each([
  [{
    interval: PERFECT_FIFTH,
  }, [PERFECT_FIFTH]],
  [{
    interval: PERFECT_FIFTH,
    length: 2,
  }, [PERFECT_FIFTH, MAJOR_NINTH]],
  [{
    interval: PERFECT_FIFTH,
    startIndex: 0,
  }, [PERFECT_UNISON]],
  [{
    interval: PERFECT_FIFTH,
    length: 2,
    startIndex: 0,
  }, [PERFECT_UNISON, PERFECT_FIFTH]],
  [{
    interval: PERFECT_FIFTH,
    length: 4,
    startIndex: 0,
  }, [PERFECT_UNISON, PERFECT_FIFTH, MAJOR_NINTH, MAJOR_THIRTEENTH]],
  [{
    interval: PERFECT_FIFTH,
    length: 0,
  }, []],
  [{
    interval: PERFECT_FIFTH,
    length: 1,
    startIndex: 1,
  }, [PERFECT_FIFTH]],
  [{
    interval: PERFECT_FIFTH,
    length: 3,
    startIndex: -1,
  }, [neg(PERFECT_FIFTH), PERFECT_UNISON, PERFECT_FIFTH]],
  [{
    interval: neg(PERFECT_FIFTH),
    startIndex: 0,
    length: 4,
  }, [PERFECT_UNISON,
    neg(PERFECT_FIFTH),
    neg(MAJOR_NINTH), neg(MAJOR_THIRTEENTH)]],
])("tests", (args: any, expected: Interval[]) => {
  let argsStr = `interval: ${String(args.interval)}`;

  if (args.startIndex !== undefined)
    argsStr += `, startIndex: ${args.startIndex}`;

  if (args.length !== undefined)
    argsStr += `, length: ${args.length}`;

  it(`${argsStr} => ${String(expected as IntervalArray)}`, () => {
    const actual = serie(args);

    expect(actual).toEqual(expected);
  } );
} );
