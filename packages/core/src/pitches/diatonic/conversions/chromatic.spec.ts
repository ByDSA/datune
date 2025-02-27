import { Pitches as CP } from "../../chromatic";
import { A, B, C } from "../constants";
import { toChromatic } from "./chromatic";

describe("chromatic", () => {
  it("b", () => {
    const chromatic = toChromatic(B);

    expect(chromatic).toBeDefined();
    expect(chromatic).toBe(CP.B);
  } );

  it("c", () => {
    const chromatic = toChromatic(C);

    expect(chromatic).toBeDefined();
    expect(chromatic).toBe(CP.C);
  } );

  it("a", () => {
    const chromatic = toChromatic(A);

    expect(chromatic).toBeDefined();
    expect(chromatic).toBe(CP.A);
  } );
} );
