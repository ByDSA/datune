import { Keys } from "@datune/core/keys/chromatic";
import { stringifyKey } from ".";
import { LangId } from "lang";
import { stringifyPitches } from "strings/pitches/chromatic/array";
import { TestInit, TestLang } from "tests";

TestInit.chromaticKey();
TestLang.loadAll();

describe.each([
  [LangId.ES, "Do Mayor", Keys.C],
  [LangId.EN, "C Major", Keys.C],
  [LangId.EN, "C Minor", Keys.Cm],
])("toString + parse", (langId, str, key) => {
  const keyPitchesName = `key(pitches=${stringifyPitches(key.pitches)})`;

  it(`stringify: (${langId}, ${keyPitchesName} => "${str}"`, () => {
    const actual = stringifyKey(key, {
      langId,
    } );

    expect(actual).toBe(str);
  } );
} );
