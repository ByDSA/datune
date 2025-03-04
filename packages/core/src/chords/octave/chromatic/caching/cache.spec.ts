import type { Arrays } from "@datune/utils";
import { PitchArray, Pitches } from "pitches/chromatic";
import { TestInit } from "tests";
import { cache } from "./cache";

TestInit.chromaticChord();

it("same instance", () => {
  const pitches = [Pitches.C, Pitches.E, Pitches.G] as PitchArray;
  const pitchesDto = pitches.map((p) => +p) as Arrays.Number;
  const actual1 = cache.getOrCreate(pitchesDto);
  const actual2 = cache.getOrCreate(pitchesDto);

  expect(actual1).toBe(actual2);
} );
