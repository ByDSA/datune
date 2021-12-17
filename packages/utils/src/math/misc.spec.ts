import { cyclicMod } from "./misc";

describe("cyclicMod", () => {
  test("lower than limit", () => {
    const n = 7;
    const limit = 12;

    expect(cyclicMod(n, limit)).toBe(7);
  } );

  test("over limit", () => {
    const n = 14;
    const limit = 12;

    expect(cyclicMod(n, limit)).toBe(2);
  } );

  test("below 0", () => {
    const n = -1;
    const limit = 12;

    expect(cyclicMod(n, limit)).toBe(11);
  } );

  it("with NaN", () => {
    const actual = cyclicMod(3, NaN);

    expect(actual).toBe(NaN);
  } );
} );
