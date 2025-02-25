import { TestInit } from "tests";
import { A, AA, B, BBB, C, Cb, Cbb, CC, D, DD, E, F, FF, G, GG, initialize } from ".";

beforeAll(() => {
  TestInit.diatonicAlt();
} );
describe("values", () => {
  it("are defined", () => {
    expect(C).toBeDefined();
    expect(CC).toBeDefined();
    expect(D).toBeDefined();
    expect(DD).toBeDefined();
    expect(E).toBeDefined();
    expect(F).toBeDefined();
    expect(FF).toBeDefined();
    expect(G).toBeDefined();
    expect(GG).toBeDefined();
    expect(A).toBeDefined();
    expect(AA).toBeDefined();
    expect(B).toBeDefined();
  } );

  it("alts ", () => {
    expect(Cbb.alts).toBe(-2);
    expect(Cb.alts).toBe(-1);
    expect(C.alts).toBe(0);
    expect(BBB.alts).toBe(2);
  } );

  it("reinitialize error", () => {
    const t = () => {
      initialize();
    };

    expect(t).toThrow(TypeError);
  } );
} );
