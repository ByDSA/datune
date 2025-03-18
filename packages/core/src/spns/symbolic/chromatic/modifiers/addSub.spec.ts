import type { Spn } from "../Spn";
import type { Interval as CInterval } from "intervals/chromatic";
import { Intervals as I } from "intervals/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { fromPitchOctave } from "../building/pitch-octave";
import { Spns as N } from "..";
import { sub } from "./sub";
import { add } from "./add";

const { C4, C5, CC5, FF4, G4 } = N;
const { d5, P5, P8, P1 } = I;
const withShiftCases = <[Spn, CInterval, Spn][]>[
  [C4, P1, C4],
  [C4, P8, C5],
  [C4, P5, G4],
  [FF4, d5, C5],
  [FF4, P5, fromPitchOctave(P.CC, 5)],
  [fromPitchOctave(P.Gb, 4), d5, fromPitchOctave(P.C, 5)],
  [FF4, P5, CC5],
];

describe.each(withShiftCases)("add-sub", (base: Spn, interval: CInterval, expected: Spn) => {
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
