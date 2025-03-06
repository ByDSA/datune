import { Pitch } from "../Pitch";
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
      expect(C instanceof Pitch).toBeTruthy();
      expect(CC instanceof Pitch).toBeTruthy();
      expect(D instanceof Pitch).toBeTruthy();
      expect(DD instanceof Pitch).toBeTruthy();
      expect(E instanceof Pitch).toBeTruthy();
      expect(F instanceof Pitch).toBeTruthy();
      expect(FF instanceof Pitch).toBeTruthy();
      expect(G instanceof Pitch).toBeTruthy();
      expect(GG instanceof Pitch).toBeTruthy();
      expect(A instanceof Pitch).toBeTruthy();
      expect(AA instanceof Pitch).toBeTruthy();
      expect(B instanceof Pitch).toBeTruthy();
    } );

    it("aLL contains all values (unordered)", () => {
      const notes: Pitch[] = [
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

      expect(t).toThrow(Error);
    } );

    it("aLL addition error", () => {
      const t = () => {
        ALL.push(C);
      };

      expect(t).toThrow(Error);
    } );
  } );
} );
