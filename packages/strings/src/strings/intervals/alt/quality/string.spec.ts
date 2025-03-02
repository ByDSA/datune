import { IntervalQualities } from "@datune/core/intervals/alt";
import { stringifyQuality } from ".";
import { LangId } from "lang";
import { TestLang } from "tests";

TestLang.loadAll();

const { AUGMENTED,
  DIMINISHED,
  DOUBLY_AUGMENTED,
  DOUBLY_DIMINISHED,
  MAJOR, MINOR, PERFECT } = IntervalQualities;

describe.each([
  [LangId.EN, MAJOR, "Major"],
  [LangId.EN, MINOR, "Minor"],
  [LangId.EN, PERFECT, "Perfect"],
  [LangId.EN, AUGMENTED, "Augmented"],
  [LangId.EN, DIMINISHED, "Diminished"],
  [LangId.EN, DOUBLY_DIMINISHED, "Doubly Diminished"],
  [LangId.EN, DOUBLY_AUGMENTED, "Doubly Augmented"],
  [LangId.ES, MAJOR, "Mayor"],
  [LangId.ES, MINOR, "Menor"],
  [LangId.ES, PERFECT, "Perfecta"],
  [LangId.ES, AUGMENTED, "Aumentada"],
  [LangId.ES, DOUBLY_AUGMENTED, "Doble Aumentada"],
  [LangId.ES, DOUBLY_DIMINISHED, "Doble Disminuida"],
  [LangId.ES, DIMINISHED, "Disminuida"],
])("manual tests", (langId, quality, str) => {
  it(`(${langId}, ${quality}) => "${str}"`, () => {
    const actual = stringifyQuality(quality, {
      langId,
    } );

    expect(actual).toBe(str);
  } );
} );
