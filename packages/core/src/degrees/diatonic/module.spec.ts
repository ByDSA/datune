import { Degrees } from ".";

describe("static properties should be defined", () => {
  it("building", () => {
    expect(Degrees.fromInt).toBeDefined();
  } );

  it("constants", () => {
    expect(Degrees.I).toBeDefined();
    expect(Degrees.II).toBeDefined();
    expect(Degrees.III).toBeDefined();
    expect(Degrees.IV).toBeDefined();
    expect(Degrees.V).toBeDefined();
    expect(Degrees.VI).toBeDefined();
    expect(Degrees.VII).toBeDefined();
    expect(Degrees.ALL).toBeDefined();
  } );
} );

describe("lazy properties should be defined", () => {
  it("conversions", () => {
    expect(Degrees.toChromatic).toBeDefined();
  } );
} );
