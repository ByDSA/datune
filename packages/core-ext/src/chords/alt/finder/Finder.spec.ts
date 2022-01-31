import { C, C5, Cm, Csus2, Csus4, fromRootVoicing, Fsus2, Gsus4, inv } from "chords/alt";
import { C as C_C, D as C_D, G as C_G } from "pitches/alt";
import { TestInit } from "tests";
import { TRIAD_QUARTAL } from "voicings/alt";
import Finder from "./Finder";

TestInit.loadAll();

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

  expect(actual).toEqual(expected);
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
    fromRootVoicing(C_G, TRIAD_QUARTAL),

    Gsus4,
    Csus2,
    fromRootVoicing(C_D, TRIAD_QUARTAL),
  ];

  expect(actual).toEqual(expected);
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

  expect(actual).toEqual(expected);
} );
