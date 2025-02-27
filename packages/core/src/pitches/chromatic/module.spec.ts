import { Pitches as P } from ".";

describe("static properties should be defined", () => {
  it("building", () => {
    expect(P.fromInt).toBeDefined();
  } );

  it("constants", () => {
    expect(P.Cb).toBeDefined();
    expect(P.C).toBeDefined();
    expect(P.CC).toBeDefined();
    expect(P.Db).toBeDefined();
    expect(P.D).toBeDefined();
    expect(P.DD).toBeDefined();
    expect(P.Eb).toBeDefined();
    expect(P.E).toBeDefined();
    expect(P.EE).toBeDefined();
    expect(P.Fb).toBeDefined();
    expect(P.F).toBeDefined();
    expect(P.FF).toBeDefined();
    expect(P.Gb).toBeDefined();
    expect(P.G).toBeDefined();
    expect(P.GG).toBeDefined();
    expect(P.Ab).toBeDefined();
    expect(P.A).toBeDefined();
    expect(P.AA).toBeDefined();
    expect(P.Bb).toBeDefined();
    expect(P.B).toBeDefined();
    expect(P.BB).toBeDefined();
    expect(P.ALL).toBeDefined();
    expect(P.NUMBER).toBeDefined();
  } );

  it("conversions", () => {
    expect(P.hash).toBeDefined();
  } );
} );

describe("lazy properties should be defined", () => {
  it("modifiers", () => {
    expect(P.add).toBeDefined();
    expect(P.rootIntervals).toBeDefined();
    expect(P.sub).toBeDefined();
  } );
} );
