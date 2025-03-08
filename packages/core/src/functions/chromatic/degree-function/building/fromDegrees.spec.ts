import { Degrees as D, DegreeArray } from "chromatic";
import { getDegrees } from "../conversions";
import { fromDegrees } from "./fromDegrees";

it("should have same degrees as build", () => {
  const degrees: DegreeArray = [D.I, D.III, D.V];
  const actual = fromDegrees(...degrees);
  const newDegrees = getDegrees(actual);

  expect(newDegrees).toEqual(degrees);
} );
