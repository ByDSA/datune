import { A as C_A, B as C_B, C as C_C } from "../../chromatic";
import { A, B, C } from "../constants";
import toChromatic from "./chromatic";

describe("chromatic", () => {
  it("B ", () => {
    const chromatic = toChromatic(B);

    expect(chromatic).toBe(C_B);
  } );

  it("C ", () => {
    const chromatic = toChromatic(C);

    expect(chromatic).toBe(C_C);
  } );

  it("A ", () => {
    const chromatic = toChromatic(A);

    expect(chromatic).toBe(C_A);
  } );
} );
