/* eslint-disable camelcase */
import { C, Cm } from "@datune/core/keys/chromatic";
import { LangId } from "lang";
import arrayPitchStringify from "strings/pitches/chromatic/array";
import { TestInit, TestLang } from "tests";
import stringify from ".";

TestInit.chromaticKey();
TestLang.loadAll();

describe.each([
  [LangId.ES, "Do Mayor", C],
  [LangId.EN, "C Major", C],
  [LangId.EN, "C Minor", Cm],
])("toString + fromString", (langId, str, key) => {
  const keyPitchesName = `key(pitches=${arrayPitchStringify(key.pitches)})`;

  it(`stringify: (${langId}, ${keyPitchesName} => "${str}"`, () => {
    const actual = stringify(key, {
      langId,
    } );

    expect(actual).toBe(str);
  } );
} );
