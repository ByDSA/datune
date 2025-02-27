import Chromatic from "../Pitch";
import { A, AA, ALL, B, C, CC, D, DD, E, F, FF, G, GG, NUMBER } from ".";

describe("sets", () => {
  it("number", () => {
    expect(NUMBER).toBe(12);
  } );

  it("all length=12", () => {
    expect(ALL).toHaveLength(12);
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

    it("instanceof", () => {
      expect(C instanceof Chromatic).toBeTruthy();
      expect(CC instanceof Chromatic).toBeTruthy();
      expect(D instanceof Chromatic).toBeTruthy();
      expect(DD instanceof Chromatic).toBeTruthy();
      expect(E instanceof Chromatic).toBeTruthy();
      expect(F instanceof Chromatic).toBeTruthy();
      expect(FF instanceof Chromatic).toBeTruthy();
      expect(G instanceof Chromatic).toBeTruthy();
      expect(GG instanceof Chromatic).toBeTruthy();
      expect(A instanceof Chromatic).toBeTruthy();
      expect(AA instanceof Chromatic).toBeTruthy();
      expect(B instanceof Chromatic).toBeTruthy();
    } );

    it("aLL contains all values (unordered)", () => {
      const notes: Chromatic[] = [
        C,
        CC,
        D,
        DD,
        E,
        F,
        FF,
        G,
        GG,
        A,
        AA,
        B,
      ];

      for (const chromatic of notes)
        expect(ALL).toContain(chromatic);
    } );

    it("value extension error", () => {
      const t = () => {
        (C as any).asd = "s";
      };

      expect(t).toThrow(TypeError);
    } );

    it("aLL addition error", () => {
      const t = () => {
        ALL.push(C);
      };

      expect(t).toThrow(TypeError);
    } );
  } );
} );
