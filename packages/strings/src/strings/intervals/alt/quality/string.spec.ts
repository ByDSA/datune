import { IntervalQualities as IQ } from "@datune/core/intervals/alt";
import { LangId } from "lang";
import { TestLang } from "tests";
import { stringifyQuality } from ".";

TestLang.loadAll();

describe.each([
  [LangId.EN, IQ.M, "Major"],
  [LangId.EN, IQ.m, "Minor"],
  [LangId.EN, IQ.P, "Perfect"],
  [LangId.EN, IQ.a, "Augmented"],
  [LangId.EN, IQ.d, "Diminished"],
  [LangId.EN, IQ.dd, "Doubly Diminished"],
  [LangId.EN, IQ.da, "Doubly Augmented"],
  [LangId.ES, IQ.M, "Mayor"],
  [LangId.ES, IQ.m, "Menor"],
  [LangId.ES, IQ.P, "Perfecta"],
  [LangId.ES, IQ.a, "Aumentada"],
  [LangId.ES, IQ.da, "Doble Aumentada"],
  [LangId.ES, IQ.dd, "Doble Disminuida"],
  [LangId.ES, IQ.d, "Disminuida"],
])("manual tests", (langId, quality, str) => {
  it(`(${langId}, ${quality}) => "${str}"`, () => {
    const actual = stringifyQuality(quality, {
      langId,
    } );

    expect(actual).toBe(str);
  } );
} );
