import { A, B, C } from "pitches/diatonic/constants";
import { Pitches as P } from "..";
import { fromDPitch } from "./dPitch";

describe("fromDPitch", () => {
  it("b", () => {
    const chromatic = fromDPitch(B);

    expect(chromatic).toBeDefined();
    expect(chromatic).toBe(P.B);
  } );

  it("c", () => {
    const chromatic = fromDPitch(C);

    expect(chromatic).toBeDefined();
    expect(chromatic).toBe(P.C);
  } );

  it("a", () => {
    const chromatic = fromDPitch(A);

    expect(chromatic).toBeDefined();
    expect(chromatic).toBe(P.A);
  } );
} );
