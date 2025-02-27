import { from } from "./building";
import { C } from "./constants";
import { Pitches as DA, Pitch } from "pitches/alt";
import { Scales } from "scales/alt";
import { TestInit } from "tests";

TestInit.diatonicAltChord();
TestInit.diatonicAltScale();
TestInit.diatonicAltKey();

describe("tests", () => {
  const { BLUES_MINOR, MAJOR, ORIENTAL } = Scales;

  describe.each([
    [C, DA.C, MAJOR],
    [from(DA.C, ORIENTAL), DA.C, ORIENTAL],
  ])("scales & root", (key, root, scale) => {
    it(`${key} => root=${root}, scale=${scale}`, () => {
      expect(key.scale).toBe(scale);
      expect(key.root).toBe(root);
    } );
  } );

  it("notes: C", () => {
    const { pitches } = C;

    expect(pitches).toHaveLength(7);

    const expected = [
      DA.C,
      DA.D,
      DA.E,
      DA.F,
      DA.G,
      DA.A,
      DA.B,
    ];

    pitches.forEach((_n: Pitch, i: number) => {
      expect(pitches[i]).toBe(expected[i]);
    } );
  } );

  it("notes: C BLUES MINOR", () => {
    const key = from(DA.C, BLUES_MINOR);
    const { pitches } = key;

    expect(pitches).toHaveLength(5);
    expect(pitches).toStrictEqual(
      [
        DA.C,
        DA.Eb,
        DA.F,
        DA.Ab,
        DA.Bb,
      ],
    );
  } );
} );
