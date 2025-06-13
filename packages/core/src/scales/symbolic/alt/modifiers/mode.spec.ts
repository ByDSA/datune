/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { Degrees as D } from "degrees/alt";
import { Scales as S } from "..";
import { mode } from "./mode";
import { modes } from "./modes";

const { BLUES_b5, DORIAN, LOCRIAN, MAJOR } = S;
const { aI, aIV, I, III, VI, VII } = D;

it("getMode - I = MAJOR", () => {
  const scale = mode(MAJOR, 1);
  const expected = MAJOR;

  expect(scale).toBe(expected);
} );

it("getMode - -I = MAJOR", () => {
  const scale = mode(MAJOR, -1);
  const expected = MAJOR;

  expect(scale).toBe(expected);
} );

it("getMode - II = DORIAN", () => {
  const scale = mode(MAJOR, 2);
  const expected = DORIAN;

  expect(scale).toBe(expected);
} );

it("getMode - -II = LOCRIAN", () => {
  const s = mode(MAJOR, -2);
  const expected = LOCRIAN;

  expect(s).toBe(expected);
} );

it("scale - degrees: BLUES_b5, mode V", () => {
  const scale = mode(BLUES_b5, 4);
  const { degrees } = scale;

  expect(degrees).toStrictEqual([
    I,
    aI,
    III,
    aIV,
    VI,
    VII,
  ]);
} );

it("modes of BLUES_b5", () => {
  const mode5 = mode(BLUES_b5, 5);

  expect(mode5.degrees).toStrictEqual([
    D.I,
    D.bIII,
    D.IV,
    D.bVI,
    D.bVII,
    // realmente es bI, pero se corrige enarmónicamente
    D.VII,
  ]);

  const mode6 = mode(BLUES_b5, 6);

  expect(mode6.degrees).toStrictEqual([
    D.I,
    D.II,
    D.IV,
    D.V,
    D.bVI,
    D.VI,
  ]);

  const mode6From5 = mode(mode5, 2);

  expect(mode6From5).toBe(mode6);
} );

it("get all modes of common scales without error", () => {
  const scales = [...S.COMMON];

  for (let i = 0; i < scales.length; i++) {
    const s = scales[i];

    expect(
      ()=>modes(s),
    ).not.toThrow();
  }
} );
