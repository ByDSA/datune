import { fromRootVoicing } from "@datune/core/chords/octave/alt/building";
import { inv } from "@datune/core/chords/octave/alt/modifiers";
import { Pitches as P } from "@datune/core/pitches/alt";
import { Voicings as V } from "@datune/core/voicings/alt";
import { Chords as C } from "@datune/core/alt";
import { TestInit } from "tests";
import { Finder } from "./Finder";

TestInit.loadAll();
// eslint-disable-next-line @typescript-eslint/naming-convention
const { C5, Cm, Csus2, Csus4, Fsus2, Gsus4 } = C;

it("contains= C, G. MaxLength=3. NotInversions", () => {
  const finder = new Finder()
    .containsNote(P.C, P.G)
    .notInversions()
    .maxChordLength(3);
  const actual = finder.find();
  const expected = [
    C5,
    C.C,
    Cm,
    Csus4,
    Gsus4,
  ];

  expect(actual).toEqual(expected);
} );

it("contains= C, G. MaxLength=3", () => {
  const finder = new Finder()
    .containsNote(P.C, P.G)
    .maxChordLength(3);
  const actual = finder.find();
  const expected = [
    C5,
    inv(C5),

    C.C,
    inv(C.C),
    inv(C.C, 2),

    Cm,
    inv(Cm),
    inv(Cm, 2),

    Csus4,
    Fsus2,
    fromRootVoicing(P.G, V.TRIAD_QUARTAL),

    Gsus4,
    Csus2,
    fromRootVoicing(P.D, V.TRIAD_QUARTAL),
  ];

  expect(actual).toEqual(expected);
} );

it("contains= C, G. MaxLength=3. Root=C", () => {
  const finder = new Finder()
    .containsNote(P.C, P.G)
    .maxChordLength(3)
    .bass(P.C);
  const actual = finder.find();
  const expected = [
    C5,
    C.C,
    Cm,
    Csus4,
    Csus2,
  ];

  expect(actual).toEqual(expected);
} );
