/* eslint-disable @typescript-eslint/naming-convention */
import type { Spn } from "../Spn";
import type { Interval } from "intervals/alt";
import { Intervals as I } from "intervals/alt";
import { Pitches as P } from "pitches/alt";
import { fromPitchOctave } from "../building";
import { Spns } from "..";
import { add, sub } from ".";

const { C4, C5, CC5, FF4, G4 } = Spns;
const { BBB, Dbb, Gb } = P;
const { d5, da4, P5, P8, P1 } = I;
const withShiftCases = <[Spn, Interval, Spn][]>[
  [C4, P1, C4],
  [C4, P8, C5],
  [C4, P5, G4],
  [FF4, d5, C5],
  [FF4, da4, fromPitchOctave(BBB, 4)],
  [fromPitchOctave(Gb, 4), d5, fromPitchOctave(Dbb, 5)],
  [FF4, P5, CC5],
];

describe.each(withShiftCases)("add-sub", (base: Spn, interval: Interval, expected: Spn) => {
  const baseName = base.toString();
  const intervalName = interval.toString();
  const expectedName = expected.toString();

  it(`add: ${baseName} + ${intervalName} = ${expectedName}`, () => {
    const actual = add(base, interval);

    expect(actual).toBe(expected);
  } );

  it(`sub: ${expectedName} - ${intervalName} = ${baseName}`, () => {
    const actual = sub(expected, interval);

    expect(actual).toBe(base);
  } );
} );
