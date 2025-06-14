import { Intervals as I, IntervalSets as IS, IntervalSet } from "@datune/core";
import { countAllInnerIntervalSets, getAllInnerIntervalSets, findInnerIntervalSets, InnerIntervalSetResult } from "./findInnerIntervalSets";

it("intervalSet SUS4 should include M2", () => {
  const actual = findInnerIntervalSets(IS.TRIAD_SUS4, [IS.M2]);

  expect(actual).toHaveLength(1);
  expect(actual).toEqual([
    {
      indexMap: [1, 2],
      innerIntervalSet: IS.M2,
    },
  ]);
} );

it("intervalSet SUS4 should include M2 and P4", () => {
  const actual = findInnerIntervalSets(IS.TRIAD_SUS4, [IS.M2, IS.P4]);

  expect(actual).toHaveLength(2);
  expect(new Set(actual)).toEqual(new Set([
    {
      indexMap: [0, 1],
      innerIntervalSet: IS.P4,
    },
    {
      indexMap: [1, 2],
      innerIntervalSet: IS.M2,
    },
  ]));
} );

it("intervalSet TRIAD DIMINISHED should include two m3", () => {
  const actual = findInnerIntervalSets(IS.TRIAD_DIMINISHED, [IS.m3]);

  expect(actual).toHaveLength(2);
  expect(new Set(actual)).toEqual(new Set([
    {
      indexMap: [0, 1],
      innerIntervalSet: IS.m3,
    },
    {
      indexMap: [1, 2],
      innerIntervalSet: IS.m3,
    },
  ]));
} );

describe("getAllInnerIntervalSets", () => {
  it("intervalSet POWER CHORD should not have inner voices", () => {
    const actual = getAllInnerIntervalSets(IS.POWER_CHORD);

    expect(actual).toHaveLength(0);
  } );

  it("intervalSet TRIAD MAJOR should have M3, m3 and P5", () => {
    const expected: InnerIntervalSetResult[] = [{
      indexMap: [0, 2],
      innerIntervalSet: IS.POWER_CHORD,
    }, {
      indexMap: [0, 1],
      innerIntervalSet: IS.M3,
    }, {
      indexMap: [1, 2],
      innerIntervalSet: IS.m3,
    }];
    const actual = getAllInnerIntervalSets(IS.TRIAD_MAJOR);

    expect(actual).toHaveLength(3);
    expect(new Set(actual)).toEqual(new Set(expected));
  } );

  it("intervalSet SEVENTH MAJ7 should have two M3, two m3, P5, M7 and some triads", () => {
    const expected: InnerIntervalSetResult[] = [
      {
        indexMap: [0, 2],
        innerIntervalSet: IS.POWER_CHORD,
      }, {
        indexMap: [0, 1],
        innerIntervalSet: IS.M3,
      }, {
        indexMap: [1, 2],
        innerIntervalSet: IS.m3,
      }, {
        indexMap: [0, 3],
        innerIntervalSet: IS.M7,
      }, {
        indexMap: [1, 3],
        innerIntervalSet: IS.POWER_CHORD,
      }, {
        indexMap: [2, 3],
        innerIntervalSet: IS.M3,
      }, {
        indexMap: [0, 1, 2],
        innerIntervalSet: IS.TRIAD_MAJOR,
      }, {
        indexMap: [0, 1, 3],
        innerIntervalSet: IS.SEVENTH_MAJ7.withRemoved(I.P5) as IntervalSet,
      }, {
        indexMap: [0, 2, 3],
        innerIntervalSet: IS.SEVENTH_MAJ7.withRemoved(I.M3) as IntervalSet,
      }, {
        indexMap: [1, 2, 3],
        innerIntervalSet: IS.TRIAD_MINOR, // omit P1
      },
    ];
    const actual = getAllInnerIntervalSets(IS.SEVENTH_MAJ7);

    expect(actual).toHaveLength(10);
    expect(new Set(actual)).toEqual(new Set(expected));
  } );
} );

describe.each([
  [IS.POWER_CHORD, 0n],
  [IS.TRIAD_MAJOR, 3n],
  [IS.SEVENTH_MAJ7, 10n],
])("countAllInnerIntervalSets", (intervalSet, count) => {
  it("intervalSet " + intervalSet + " should be same as length of calculation", () => {
    const expected: bigint = BigInt(getAllInnerIntervalSets(intervalSet).length);
    const actual = countAllInnerIntervalSets(intervalSet);

    expect(actual).toBe(expected);
  } );

  it("intervalSet " + intervalSet + " count should be " + count, () => {
    const actual = countAllInnerIntervalSets(intervalSet);

    expect(actual).toBe(count);
  } );
} );
