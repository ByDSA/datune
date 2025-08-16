import { Scales } from "@datune/core/alt";
import { getDiatonicDegreeFuncsInScale } from "./regions";

it("test", () => {
  const scale = Scales.MAJOR;
  const actual = getDiatonicDegreeFuncsInScale(scale);

  for (const f of actual)
    expect(f.degrees.length).toBeGreaterThan(1);

  expect(actual.size).toBe(120);
} );
