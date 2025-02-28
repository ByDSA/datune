/* eslint-disable @typescript-eslint/naming-convention */
import { Chords } from "@datune/core/chords/chromatic";
import { Pitches } from "@datune/core/pitches/chromatic";
import { Voicings as V } from "@datune/core/voicings/chromatic";
import { Finder } from "./Finder";
import { TestInit } from "tests";

TestInit.loadAll();

const { C: C_C, D: C_D, G: C_G } = Pitches;
const { C, C5, Cm, Csus2, Csus4, fromRootVoicing, Fsus2, Gsus4, inv } = Chords;

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
    fromRootVoicing(C_G, V.TRIAD_QUARTAL),

    Gsus4,
    Csus2,
    fromRootVoicing(C_D, V.TRIAD_QUARTAL),
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
