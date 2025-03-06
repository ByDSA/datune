import { Pitches as P } from "pitches/alt";
import { Pitches as CP } from "pitches/chromatic";
import { RelativePitch } from "./RelativePitch";

it("from - C 0", () => {
  const pitch = CP.C;
  const octaveRelative = 0;
  const actual = RelativePitch.from(pitch, octaveRelative);

  expect(actual.octaveRelative).toEqual(octaveRelative);
  expect(actual.pitch).toEqual(pitch);
} );

it("from - Bb 2", () => {
  const pitch = P.Bb;
  const octaveRelative = 2;
  const actual = RelativePitch.from(pitch, octaveRelative);

  expect(actual.octaveRelative).toEqual(octaveRelative);
  expect(actual.pitch).toEqual(pitch);
} );
