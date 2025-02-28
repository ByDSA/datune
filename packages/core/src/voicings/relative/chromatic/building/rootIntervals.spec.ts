/* eslint-disable camelcase */
import { Arrays } from "@datune/utils";
import { NINTH_MINOR, SEVENTH, SEVENTH_MAJ7, SEVENTH_MAJ7_b5, SEVENTH_MINOR, SEVENTH_SUS4_b9, THIRTEENTH_a5b9, THIRTEENTH_b5a9, THIRTEENTH_MAJ13_b5a9, TRIAD_AUGMENTED, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR } from "../constants";
import { inv } from "../modifiers";
import type { Voicing } from "../Voicing";
import { fromRootIntervals } from "./rootIntervals";
import { TestInit } from "tests";

TestInit.chromaticVoicing();

describe.each(<[Arrays.Number, Voicing][]>[
  [[0, 4, 7], TRIAD_MAJOR],
  [[0, 4, 7], inv(TRIAD_MAJOR, 3)],
  [[1, 5, 8], TRIAD_MAJOR, false],
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
])("fromRootIntervals", (rootIntervals: Arrays.Number, expectedVoicing: Voicing, reverse = true) => {
  it(`${rootIntervals} => ${expectedVoicing}`, () => {
    const voicing = fromRootIntervals(...rootIntervals);

    expect(voicing).toBe(expectedVoicing);
  } );

  if (reverse) {
    it(`${expectedVoicing}.rootIntervals = ${rootIntervals}`, () => {
      expect(expectedVoicing.rootIntervals).toStrictEqual(rootIntervals);
    } );
  }
} );

it("fromRootIntervals - all voicings with same rootIntervals are the same", () => {
  const voicing = fromRootIntervals(0, 1, 2);
  const voicing2 = fromRootIntervals(0, 1, 2);

  expect(voicing2).toBe(voicing);
} );

it("formRootIntervals - 0", () => {
  const voicing = fromRootIntervals(0);

  expect(voicing).not.toBeNull();
} );
