import type { PitchArray } from "pitches/chromatic";
import { NonEmptyNumberArray } from "datils";
import { Pitches as P } from "pitches/chromatic";
import { getKey as pitchGetKey } from "pitches/chromatic/caching/id";
import { cache } from "./cache";

it("same instance", () => {
  const pitches = [P.C, P.E, P.G] as PitchArray;
  const pitchesKey = pitches.map(pitchGetKey) as NonEmptyNumberArray;
  const actual1 = cache.getOrCreate(pitchesKey);
  const actual2 = cache.getOrCreate(pitchesKey);

  expect(actual1).toBe(actual2);
} );
