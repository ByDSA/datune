import { C, C5, Cm, Csus2, Csus4, Fsus2, Gsus4 } from "@datune/core/chords/octave/alt/constants";
import { fromRootVoicing } from "@datune/core/chords/octave/alt/building";
import { inv } from "@datune/core/chords/octave/alt/modifiers";
import { Pitches } from "@datune/core/pitches/alt";
import { Voicings } from "@datune/core/voicings/alt";
import { Finder } from "./Finder";
import { TestInit } from "tests";

TestInit.loadAll();

it("contains= C, G. MaxLength=3. NotInversions", () => {
  const finder = new Finder()
    .containsNote(Pitches.C, Pitches.G)
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
    .containsNote(Pitches.C, Pitches.G)
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
    fromRootVoicing(Pitches.G, Voicings.TRIAD_QUARTAL),

    Gsus4,
    Csus2,
    fromRootVoicing(Pitches.D, Voicings.TRIAD_QUARTAL),
  ];

  expect(actual).toEqual(expected);
} );

it("contains= C, G. MaxLength=3. Root=C", () => {
  const finder = new Finder()
    .containsNote(Pitches.C, Pitches.G)
    .maxChordLength(3)
    .bass(Pitches.C);
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
