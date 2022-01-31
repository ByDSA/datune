import fs from "fs";
import { from as keyFrom } from "keys/chromatic";
import { ALL } from "pitches/chromatic";
import { COMMON } from "scales/chromatic";
import { TestInit } from "tests/init";
import save from "./save";

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

    for (const scale of COMMON) {
      for (const pitch of ALL)
        keyFrom(pitch, scale);
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
