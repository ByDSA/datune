import { barkToHz, hzToBark } from "./bark";

it("bark reversible", () => {
  const original = 1000;
  const actual = hzToBark(original);
  const reverted = barkToHz(actual);

  expect(Math.abs(reverted - original)).toBeLessThan(1);
} );
