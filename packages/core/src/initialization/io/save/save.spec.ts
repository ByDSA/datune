import fs from "node:fs";
import { Keys as K } from "keys/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { Scales as S } from "scales/chromatic";
import { TestInit } from "tests/init";
import { save } from "./save";

describe("save constants", () => {
  beforeAll(() => {
    TestInit.chromaticChord();
    TestInit.chromaticScale();
    TestInit.chromaticKey();
  } );

  it("save", async () => {
    const path = "tests/cache.json";

    await save( {
      path,
    } );

    const exists = fs.existsSync(path);

    expect(exists).toBeTruthy();
  } );
} );

describe("save full", () => {
  beforeAll(() => {
    TestInit.chromaticChord();
    TestInit.chromaticScale();
    TestInit.chromaticKey();

    for (const scale of S.COMMON) {
      for (const pitch of P.ALL)
        K.from(pitch, scale);
    }
  } );

  it("save", async () => {
    const path = "tests/cache.json";

    await save( {
      path,
    } );

    const exists = fs.existsSync(path);

    expect(exists).toBeTruthy();
  } );
} );
