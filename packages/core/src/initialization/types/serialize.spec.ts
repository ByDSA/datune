import { Chords as C, Keys, Scales as S } from "chromatic";
import { serialize } from "./serialize";

describe("serialize", () => {
  // Initialize caches
  C.C;
  S.MAJOR;
  Keys.C;

  const data = serialize();

  it("chromatic chords cache", () => {
    expect(data.chords.chromatic.cache.length).toBeGreaterThan(0);
  } );

  it("chromatic scales cache", () => {
    expect(data.scales.chromatic.cache.length).toBeGreaterThan(0);
  } );

  it("chromatic keys cache", () => {
    expect(data.keys.chromatic.cache.length).toBeGreaterThan(0);
  } );
} );
