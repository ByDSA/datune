import { Intervals as I, Voicings as V, Voicing } from "@datune/core";
import { countAllInnerVoicings, getAllInnerVoicings, findInnerVoicings, InnerVoicingResult, voicingWithOmit } from "./findInnerVoicings";

it("voicing SUS4 should include M2", () => {
  const actual = findInnerVoicings(V.TRIAD_SUS4, [V.M2]);

  expect(actual).toHaveLength(1);
  expect(actual).toEqual([
    {
      indexMap: [1, 2],
      innerVoicing: V.M2,
    },
  ]);
} );

it("voicing SUS4 should include M2 and P4", () => {
  const actual = findInnerVoicings(V.TRIAD_SUS4, [V.M2, V.P4]);

  expect(actual).toHaveLength(2);
  expect(new Set(actual)).toEqual(new Set([
    {
      indexMap: [0, 1],
      innerVoicing: V.P4,
    },
    {
      indexMap: [1, 2],
      innerVoicing: V.M2,
    },
  ]));
} );

it("voicing TRIAD DIMINISHED should include two m3", () => {
  const actual = findInnerVoicings(V.TRIAD_DIMINISHED, [V.m3]);

  expect(actual).toHaveLength(2);
  expect(new Set(actual)).toEqual(new Set([
    {
      indexMap: [0, 1],
      innerVoicing: V.m3,
    },
    {
      indexMap: [1, 2],
      innerVoicing: V.m3,
    },
  ]));
} );

describe("getAllInnerVoicings", () => {
  it("voicing POWER CHORD should not have inner voices", () => {
    const actual = getAllInnerVoicings(V.POWER_CHORD);

    expect(actual).toHaveLength(0);
  } );

  it("voicing TRIAD MAJOR should have M3, m3 and P5", () => {
    const expected: InnerVoicingResult[] = [{
      indexMap: [0, 2],
      innerVoicing: V.POWER_CHORD,
    }, {
      indexMap: [0, 1],
      innerVoicing: V.M3,
    }, {
      indexMap: [1, 2],
      innerVoicing: V.m3,
    }];
    const actual = getAllInnerVoicings(V.TRIAD_MAJOR);

    expect(actual).toHaveLength(3);
    expect(new Set(actual)).toEqual(new Set(expected));
  } );

  it("voicing SEVENTH MAJ7 should have two M3, two m3, P5, M7 and some triads", () => {
    const expected: InnerVoicingResult[] = [
      {
        indexMap: [0, 2],
        innerVoicing: V.POWER_CHORD,
      }, {
        indexMap: [0, 1],
        innerVoicing: V.M3,
      }, {
        indexMap: [1, 2],
        innerVoicing: V.m3,
      }, {
        indexMap: [0, 3],
        innerVoicing: V.M7,
      }, {
        indexMap: [1, 3],
        innerVoicing: V.POWER_CHORD,
      }, {
        indexMap: [2, 3],
        innerVoicing: V.M3,
      }, {
        indexMap: [0, 1, 2],
        innerVoicing: V.TRIAD_MAJOR,
      }, {
        indexMap: [0, 1, 3],
        innerVoicing: voicingWithOmit(V.SEVENTH_MAJ7, I.P5) as Voicing,
      }, {
        indexMap: [0, 2, 3],
        innerVoicing: voicingWithOmit(V.SEVENTH_MAJ7, I.M3) as Voicing,
      }, {
        indexMap: [1, 2, 3],
        innerVoicing: V.TRIAD_MINOR, // omit P1
      },
    ];
    const actual = getAllInnerVoicings(V.SEVENTH_MAJ7);

    expect(actual).toHaveLength(10);
    expect(new Set(actual)).toEqual(new Set(expected));
  } );
} );

describe.each([
  [V.POWER_CHORD, 0n],
  [V.TRIAD_MAJOR, 3n],
  [V.SEVENTH_MAJ7, 10n],
])("countAllInnerVoicings", (voicing, count) => {
  it("voicing " + voicing + " should be same as length of calculation", () => {
    const expected: bigint = BigInt(getAllInnerVoicings(voicing).length);
    const actual = countAllInnerVoicings(voicing);

    expect(actual).toBe(expected);
  } );

  it("voicing " + voicing + " count should be " + count, () => {
    const actual = countAllInnerVoicings(voicing);

    expect(actual).toBe(count);
  } );
} );
