import { LangId } from "lang";
import { TestInit, TestLang } from "tests";
import getTokens from "./tokens";

TestLang.loadAll();
TestInit.chromaticScale();

describe.each([
  [LangId.EN, "Major"],
  [LangId.EN, "major"],
  [LangId.EN, "MAJOR"],
  [LangId.EN, "minor"],
  [LangId.ES, "mayor"],
  [LangId.ES, "dorica"],
  [LangId.EN, "bluesb5"],
  [LangId.EN, "bLuEsB5"],
])("test tokens", (langId, str) => {
  it(`${langId}, "${str}"`, () => {
    const token = getTokens(langId)[0];
    const voicing = token.PATTERN as RegExp;
    const exactVoicing = new RegExp(`^${voicing.source}$`, "i");
    const actual = exactVoicing.test(str);

    expect(actual).toBeTruthy();
  } );
} );

describe.each([
  [LangId.ES, "Major"],
  [LangId.EN, "mayor"],
  [LangId.ES, "dórica"],
  [LangId.ES, "dorico"],
  [LangId.EN, "BbLuEsB5"],
])("no match", (langId, str) => {
  it(`${langId}, "${str}"`, () => {
    const token = getTokens(langId)[0];
    const voicing = token.PATTERN as RegExp;
    const exactVoicing = new RegExp(`^${voicing.source}$`, "i");
    const actual = exactVoicing.test(str);

    expect(actual).toBeFalsy();
  } );
} );
