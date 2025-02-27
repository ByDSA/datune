import { Degrees } from ".";

describe("static properties should be defined", () => {
  it("building", () => {
    expect(Degrees.fromInt).toBeDefined();
  } );

  it("modifiers", () => {
    expect(Degrees.add).toBeDefined();
    expect(Degrees.sub).toBeDefined();
  } );

  it("constants (some)", () => {
    expect(Degrees.I).toBeDefined();
    expect(Degrees.bII).toBeDefined();
    expect(Degrees.VII).toBeDefined();
  } );
} );

describe("lazy properties should be defined", () => {
  it("conversions", () => {
    expect(Degrees.hash).toBeDefined();
    expect(Degrees.toInterval).toBeDefined();
  } );
} );
