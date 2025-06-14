/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { IntervalSet } from "../IntervalSet";
import { NonEmptyNumberArray } from "datils";
import { inv } from "../modifiers";
import { IntervalSets } from "..";
import { fromRootIntervals } from "./rootIntervals";

// eslint-disable-next-line max-len
const { NINTH_MINOR, SEVENTH, SEVENTH_MAJ7, SEVENTH_MAJ7_b5, SEVENTH_MINOR, SEVENTH_SUS4_b9, THIRTEENTH_a5b9, THIRTEENTH_b5a9, THIRTEENTH_MAJ13_b5a9, TRIAD_AUGMENTED, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR } = IntervalSets;

describe.each(<[NonEmptyNumberArray, IntervalSet][]>[
  [[0, 4, 7], TRIAD_MAJOR],
  [[0, 4, 7], inv(TRIAD_MAJOR, 3)],
  [[0, 3, 7], TRIAD_MINOR],
  [[0, 3, 6], TRIAD_DIMINISHED],
  [[0, 4, 8], TRIAD_AUGMENTED],
  [[0, 4, 7, 10], SEVENTH],
  [[0, 3, 6, 8], inv(SEVENTH)],
  [[0, 4, 7, 11], SEVENTH_MAJ7],
  [[0, 5, 9], inv(TRIAD_MAJOR, 2)],
  [[0, 3, 8], inv(TRIAD_MAJOR)],
  [[0, 4, 6, 11], SEVENTH_MAJ7_b5],
  [[0, 5, 7, 10, 15], SEVENTH_SUS4_b9],
  [[0, 4, 8, 10, 13, 17, 21], THIRTEENTH_a5b9],
  [[0, 3, 7, 10, 14], NINTH_MINOR],
  [[0, 3, 7, 10], SEVENTH_MINOR],
  [[0, 4, 6, 11, 15, 17, 21], THIRTEENTH_MAJ13_b5a9],
  [[0, 4, 6, 10, 15, 17, 21], THIRTEENTH_b5a9],
  [[0, 4, 9, 11, 15, 18, 22], inv(THIRTEENTH_b5a9, 2)],
])("fromRootIntervals", (rootIntervals: NonEmptyNumberArray, expectedIntervalSet: IntervalSet) => {
  it(`${rootIntervals} => ${expectedIntervalSet}`, () => {
    const intervalSet = fromRootIntervals(...rootIntervals);

    expect(intervalSet).toBe(expectedIntervalSet);
  } );

  it(`${expectedIntervalSet}.rootIntervals = ${rootIntervals}`, () => {
    expect(expectedIntervalSet.rootIntervals).toStrictEqual(rootIntervals);
  } );
} );

it("fromRootIntervals - all intervalSets with same rootIntervals are the same", () => {
  const intervalSet = fromRootIntervals(0, 1, 2);
  const intervalSet2 = fromRootIntervals(0, 1, 2);

  expect(intervalSet2).toBe(intervalSet);
} );

it("formRootIntervals - 0", () => {
  const intervalSet = fromRootIntervals(0);

  expect(intervalSet).not.toBeNull();
} );

it("order should not have effect", () => {
  const intervalSet1 = fromRootIntervals(0, 5);
  const intervalSet2 = fromRootIntervals(5, 0);

  expect(intervalSet1).toBe(intervalSet2);
} );
