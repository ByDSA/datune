import { Degrees as AD } from "../../alt";
import { Degrees as DD } from "../../diatonic";
import { fromAltDegree } from "./fromAltDegree";

it("fromAltDegree", () => {
  const degree1 = AD.from(DD.I, -1);
  const degree2 = AD.VII;

  expect(fromAltDegree(degree1)).toBe(fromAltDegree(degree2));
} );
