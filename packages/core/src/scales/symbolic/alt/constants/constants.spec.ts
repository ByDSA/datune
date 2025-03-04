/* eslint-disable camelcase */
import { Degrees } from "degrees/alt";
import { Degrees as D } from "degrees/diatonic";
import { TestInit } from "tests";
import { Scale } from "../Scale";
import { BEBOP_DOMINANT, BLUES_a4, BLUES_b5, BLUES_MAJOR, BLUES_MINOR, EGYPCIAN, MAJOR, MINOR, PENTATONIC, PENTATONIC_MINOR } from "./constants";
import { COMMON } from "./sets";

TestInit.diatonicAltScale();

describe("tests", () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { bIII, bV, bVI, bVII, from, I, II, III, IV, V, VI, VII } = Degrees;

  describe("sets", () => {
    describe.each([...COMMON])("tests", (scale: Scale) => {
      it("defined", () => {
        expect(scale).toBeDefined();
      } );

      it("has string", () => {
        const actual = String(scale);

        expect(actual).toBeDefined();
      } );

      it(`${String(scale)}: degrees defined`, () => {
        expect(scale.degrees).toBeDefined();
      } );
    } );

    it("set all: contains BLUES_a4", () => {
      expect(COMMON.has(BLUES_a4)).toBeTruthy();
    } );
  } );

  it("scale - degrees: MAJOR", () => {
    const scale = MAJOR;
    const { degrees } = scale;

    expect(degrees).toStrictEqual([
      I,
      II,
      III,
      IV,
      V,
      VI,
      VII,
    ]);
  } );

  it("scale - degrees: MINOR", () => {
    const scale = MINOR;
    const { degrees } = scale;

    expect(degrees).toStrictEqual([
      I,
      II,
      bIII,
      IV,
      V,
      bVI,
      bVII,
    ]);
  } );

  it("scale - degrees: BLUES_b5", () => {
    const scale = BLUES_b5;
    const { degrees } = scale;

    expect(degrees).toStrictEqual([
      I,
      bIII,
      IV,
      bV,
      V,
      bVII,
    ]);
  } );

  it("scale - degrees: BLUES_a4", () => {
    const scale = BLUES_a4;
    const { degrees } = scale;

    expect(degrees).toStrictEqual([
      I,
      bIII,
      IV,
      from(D.IV, 1),
      V,
      bVII,
    ]);
  } );

  it("scale - degrees: pentatonic minor", () => {
    const scale = PENTATONIC_MINOR;
    const { degrees } = scale;

    expect(degrees).toStrictEqual([
      I,
      bIII,
      IV,
      V,
      bVII,
    ]);
  } );

  it("scale - degrees: pentatonic", () => {
    const scale = PENTATONIC;
    const { degrees } = scale;

    expect(degrees).toStrictEqual([
      I,
      II,
      III,
      V,
      VI,
    ]);
  } );

  it("scale - degrees: egypcian", () => {
    const scale = EGYPCIAN;
    const { degrees } = scale;

    expect(degrees).toStrictEqual([
      I,
      II,
      IV,
      V,
      bVII,
    ]);
  } );

  it("scale - degrees: blues minor", () => {
    const scale = BLUES_MINOR;
    const { degrees } = scale;

    expect(degrees).toStrictEqual([
      I,
      bIII,
      IV,
      bVI,
      bVII,
    ]);
  } );

  it("scale - degrees: blues major", () => {
    const scale = BLUES_MAJOR;
    const { degrees } = scale;

    expect(degrees).toStrictEqual([
      I,
      II,
      IV,
      V,
      VI,
    ]);
  } );

  it("scale - set all: contains BLUES_a4", () => {
    expect(COMMON.has(BLUES_a4)).toBe(true);
  } );

  it("scale - degrees: BEBOP DOMINANT", () => {
    const scale = BEBOP_DOMINANT;
    const { degrees } = scale;

    expect(degrees).toStrictEqual([
      I,
      II,
      III,
      IV,
      V,
      VI,
      bVII,
      VII,
    ]);
  } );
} );
