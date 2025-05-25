import type { PitchArray } from "pitches/alt";
import { Pitches as P } from "pitches/alt";
import { PitchSets as PS } from "alt";
import { cache, Key } from "./cache";

it("same instance", () => {
  const { C, D: E, G } = P;
  const pitches = [C, E, G] as PitchArray;
  const key: Key = {
    pitchSet: PS.fromPitches(...pitches),
    root: P.C,
    bass: P.C,
  };
  const actual1 = cache.getOrCreate(key);
  const actual2 = cache.getOrCreate( {
    ...key,
  } );

  expect(actual1).toBe(actual2);
} );
