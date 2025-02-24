import { Arrays } from "@datune/utils";
import { Array as PitchArray, C, E, G } from "pitches/chromatic";
import { TestInit } from "tests";
import cache from "./cache";

TestInit.chromaticChord();
it("same instance", () => {
  const pitches = [C, E, G] as PitchArray;
  const pitchesDto = pitches.map((p) => +p) as Arrays.Number;
  const actual1 = cache.getOrCreate(pitchesDto);
  const actual2 = cache.getOrCreate(pitchesDto);

  expect(actual1).toBe(actual2);
} );
