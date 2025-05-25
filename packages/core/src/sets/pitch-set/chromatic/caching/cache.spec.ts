import { Pitches as P } from "pitches/chromatic";
import { fromPitches } from "../building";

const { C, G } = P;

it("cache works correctly", () => {
  const pitchSet1 = fromPitches(C, G);
  const pitchSet2 = fromPitches(C, G);

  expect(pitchSet1).toBe(pitchSet2);
} );

it("no matter order", () => {
  const pitchSet1 = fromPitches(C, G);
  const pitchSet2 = fromPitches(G, C);

  expect(pitchSet1).toBe(pitchSet2);
} );
