import { LangId } from "lang";
import { TestLang } from "tests";
import { getLangTokens } from "./tokens";

TestLang.loadAll();

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
    const [token] = getLangTokens(langId);
    const intervalSet = token.PATTERN as RegExp;
    const exactIntervalSet = new RegExp(`^${intervalSet.source}$`, "i");
    const actual = exactIntervalSet.test(str);

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
    const [token] = getLangTokens(langId);
    const intervalSet = token.PATTERN as RegExp;
    const exactIntervalSet = new RegExp(`^${intervalSet.source}$`, "i");
    const actual = exactIntervalSet.test(str);

    expect(actual).toBeFalsy();
  } );
} );
