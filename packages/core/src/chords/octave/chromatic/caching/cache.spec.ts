import type { Arrays } from "@datune/utils";
import type { PitchArray } from "pitches/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { cache } from "./cache";

it("same instance", () => {
  const pitches = [P.C, P.E, P.G] as PitchArray;
  const pitchesDto = pitches.map((p) => +p) as Arrays.Number;
  const actual1 = cache.getOrCreate(pitchesDto);
  const actual2 = cache.getOrCreate(pitchesDto);

  expect(actual1).toBe(actual2);
} );
