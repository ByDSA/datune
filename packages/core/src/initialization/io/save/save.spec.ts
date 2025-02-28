import fs from "node:fs";
import { save } from "./save";
import { Keys } from "keys/chromatic";
import { Pitches } from "pitches/chromatic";
import { Scales } from "scales/chromatic";
import { TestInit } from "tests/init";

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

    for (const scale of Scales.COMMON) {
      for (const pitch of Pitches.ALL)
        Keys.fromRootScale(pitch, scale);
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
