/* eslint-disable camelcase */
import { Bb as DA_Bb } from "pitches/alt";
import { C as C_C } from "pitches/chromatic";
import RelativePitch from "./RelativePitch";

it("from - C 0", () => {
  const degree = C_C;
  const octaveRelative = 0;
  const actual = RelativePitch.from(degree, octaveRelative);

  expect(actual.octaveRelative).toEqual(octaveRelative);
  expect(actual.pitch).toEqual(degree);
} );

it("from - Bb 2", () => {
  const degree = DA_Bb;
  const octaveRelative = 2;
  const actual = RelativePitch.from(degree, octaveRelative);

  expect(actual.octaveRelative).toEqual(octaveRelative);
  expect(actual.pitch).toEqual(degree);
} );
