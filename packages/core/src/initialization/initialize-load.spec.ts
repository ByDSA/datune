import { Arrays } from "@datune/utils";
import { cache as chromaticChordCache } from "chords/octave/chromatic/caching";
import { ChromaticChord } from "index";
import { C as CP_C, E as CP_E, G as CP_G } from "pitches/chromatic";
import { cache as chromaticScaleCache } from "scales/symbolic/chromatic/caching";
import initialize from "./initialize";
import { load } from "./io";
import { Data } from "./types";

describe("initialize", () => {
  describe("before", () => {
    it("chords chromatic", () => {
      const dto = [CP_C, CP_E, CP_G].map((p) => +p) as Arrays.Number;
      const got = chromaticChordCache.get(dto);

      expect(got).toBeUndefined();
    } );

    it("scales chromatic", () => {
      const got = chromaticScaleCache.get([0, 4, 7]);

      expect(got).toBeUndefined();
    } );
  } );

  describe("after", () => {
    beforeAll(async () => {
      const path = "tests/cache.json";
      const data = await load( {
        path,
        local: true,
      } );

      initialize(data as Data);
    } );

    describe("chords chromatic", () => {
      it("cache", () => {
        const dto = [CP_C, CP_E, CP_G].map((p) => +p) as Arrays.Number;
        const got = chromaticChordCache.get(dto);

        expect(got).toBeDefined();
      } );
      it("pitches", () => {
        const dto = [CP_C, CP_E, CP_G].map((p) => +p) as Arrays.Number;
        const got = chromaticChordCache.get(dto) as ChromaticChord;
        const [p0, p1, p2] = got.pitches;

        expect(p0).toBe(CP_C);
        expect(p1).toBe(CP_E);
        expect(p2).toBe(CP_G);
      } );
    } );

    it("scales chromatic", () => {
      const got = chromaticScaleCache.get([0, 2, 4, 5, 7, 9, 11]);

      expect(got).toBeDefined();
    } );
  } );
} );
