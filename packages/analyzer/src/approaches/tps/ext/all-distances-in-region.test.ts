import { Keys } from "@datune/core/alt";
import { calcAllDistancesInRegion } from "./all-distances-in-region";

it("test", () => {
  const actual = calcAllDistancesInRegion(Keys.C);

  expect(actual).toBeTruthy();
} );
