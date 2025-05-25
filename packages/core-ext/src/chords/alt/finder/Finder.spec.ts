import { Pitches as P } from "@datune/core/pitches/alt";
import { Voicings as V } from "@datune/core/voicings/alt";
import { Chords as C } from "@datune/core/chords/alt";
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

  expect(actual).toHaveLength(143);
  expect(expected.every(a=>actual.includes(a))).toBeTruthy();
} );

it("contains= C, G. MaxLength=3", () => {
  const finder = new Finder()
    .containsNote(P.C, P.G)
    .maxChordLength(3);
  const actual = finder.find();
  const expected = [
    C5,
    C.inv(C5),

    C.C,
    C.inv(C.C),
    C.inv(C.C, 2),

    Cm,
    C.inv(Cm),
    C.inv(Cm, 2),

    Csus4,
    Fsus2,
    C.fromRootVoicing(P.G, V.TRIAD_QUARTAL),

    Gsus4,
    Csus2,
    C.fromRootVoicing(P.D, V.TRIAD_QUARTAL),
  ];

  expect(actual).toHaveLength(7007);

  for (const c of expected)
    expect(actual.includes(c)).toBeTruthy();
} );

it("contains= C, G. MaxLength=3. Root=C", () => {
  const finder = new Finder()
    .containsNote(P.C, P.G)
    .maxChordLength(3)
    .bass(P.C)
    .root(P.C);
  const actual = finder.find();
  const expected = [
    C5,
    C.C,
    Cm,
    Csus4,
    Csus2,
  ];

  expect(actual).toHaveLength(48);

  for (const c of expected)
    expect(actual.includes(c)).toBeTruthy();
} );
