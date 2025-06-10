import { Chords as C, Chord } from "@datune/core/alt";
import { chordDistanceRule } from "./chord-distance-rule";

describe.each([
  // Ejemplos: Tonal Pitch Space, p. 55-56
  [C.C, C.G, 1, 4],
  [C.C, C.Dm, 2, 6],
  [C.C, C.Am, 3, 4],
  // Figure 2.10:
  [C.C, C.F, 1, 4],
  [C.C, C.B0, 2, 6],
  [C.C, C.Em, 3, 4],
  // Figure 2.12:
  [C.Am, C.Am, 0, 0],
  [C.Am, C.F, 3, 4],
])("chordDistanceRule", (x: Chord, y: Chord, jExpected: number, kExpected: number) => {
  describe(x.toString() + " -> " + y.toString(), () => {
    let full: ReturnType<typeof chordDistanceRule>;

    beforeAll(() => {
      full = chordDistanceRule( {
        x,
        y,
      } );
    } );

    it("j (fifth distance) should be " + jExpected, () => {
      expect(full.meta.j).toBe(jExpected);
    } );

    it("k (distinctive pitch classes) should be " + kExpected, () => {
      expect(full.meta.k).toBe(kExpected);
    } );

    it("should calculate the chord distance rule as the sum of j and k", () => {
      expect(full.dist).toBe(jExpected + kExpected);
    } );

    it("should be symmetrical", () => {
      const full2 = chordDistanceRule( {
        x: y,
        y: x,
      } );

      expect(full2.dist).toBe(full.dist);
    } );
  } );
} );
