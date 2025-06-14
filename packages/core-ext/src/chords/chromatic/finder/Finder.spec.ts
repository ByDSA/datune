/* eslint-disable @typescript-eslint/naming-convention */
import { Chords } from "@datune/core/chords/chromatic";
import { Pitches as P } from "@datune/core/pitches/chromatic";
import { IntervalSets as IS } from "@datune/core/chromatic";
import { TestInit } from "tests";
import { Finder } from "./Finder";

TestInit.loadAll();

const { C: C_C, D: C_D, G: C_G } = P;
const { C, C5, Cm, Csus2, Csus4, fromRootIntervalSet, Fsus2, Gsus4, inv } = Chords;

it("contains= C, G. MaxLength=3. NotInversions", () => {
  const finder = new Finder()
    .containsNote(C_C, C_G)
    .notInversions()
    .maxChordLength(3);
  const actual = finder.find();
  const expected = [
    C5,
    C,
    Cm,
    Csus4,
    Gsus4,
  ];

  expect(actual).toHaveLength(32);
  expect(expected.every(a=>actual.includes(a))).toBeTruthy();
} );

it("contains= C, G. MaxLength=3", () => {
  const finder = new Finder()
    .containsNote(C_C, C_G)
    .maxChordLength(3);
  const actual = finder.find();
  const expected = [
    C5,
    inv(C5),

    C,
    inv(C),
    inv(C, 2),

    Cm,
    inv(Cm),
    inv(Cm, 2),

    Csus4,
    Fsus2,
    fromRootIntervalSet(C_G, IS.TRIAD_QUARTAL),

    Gsus4,
    Csus2,
    fromRootIntervalSet(C_D, IS.TRIAD_QUARTAL),
  ];

  expect(actual).toHaveLength(384);
  expect(expected.every(a=>actual.includes(a))).toBeTruthy();
} );

it("contains= C, G. MaxLength=3. Root=C", () => {
  const finder = new Finder()
    .containsNote(C_C, C_G)
    .maxChordLength(3)
    .bass(C_C);
  const actual = finder.find();
  const expected = [
    C5,
    C,
    Cm,
    Csus4,
    Csus2,
  ];

  expect(actual).toHaveLength(132);
  expect(expected.every(a=>actual.includes(a))).toBeTruthy();
} );
