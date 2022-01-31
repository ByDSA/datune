import { TestInit } from "tests/init";
import serialize from "./serialize";

TestInit.chromaticChord();
TestInit.chromaticScale();
TestInit.chromaticKey();
describe("serialize", () => {
  const data = serialize();

  describe("chords", () => {
    describe("chromatic", () => {
      it("cache", () => {
        expect(data.chords.chromatic.cache.length).toBeGreaterThan(0);
      } );
    } );
  } );

  describe("scales", () => {
    describe("chromatic", () => {
      it("cache", () => {
        expect(data.scales.chromatic.cache.length).toBeGreaterThan(0);
      } );
    } );
  } );

  describe("keys", () => {
    describe("chromatic", () => {
      it("cache", () => {
        expect(data.keys.chromatic.cache.length).toBeGreaterThan(0);
      } );
    } );
  } );
} );
