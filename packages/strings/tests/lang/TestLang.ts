/* eslint-disable accessor-pairs */
import { lockr } from "datils/datatypes";
import { LangId, Language, loadFromFile } from "lang";

export class TestLang {
  static get ES() {
    if (!LANG_ES)
      this.loadES();

    return LANG_ES;
  }

  static get EN() {
    if (!LANG_EN)
      this.loadEN();

    return LANG_EN;
  }

  static loadEN() {
    LANG_EN = loadFromFile( {
      langId: "en" as LangId,
      // eslint-disable-next-line no-undef
      folder: __dirname,
    } ) as Language;

    if (!LANG_EN)
      throw new Error("Error loading lang");

    lockr(LANG_EN);
  }

  static loadES() {
    LANG_ES = loadFromFile( {
      langId: "es" as LangId,
      // eslint-disable-next-line no-undef
      folder: __dirname,
    } ) as Language;

    if (!LANG_EN)
      throw new Error("Error loading lang");

    lockr(LANG_EN);
  }

  static loadAll() {
    this.loadEN();
    this.loadES();
  }
}

let LANG_ES: Language | undefined;
let LANG_EN: Language | undefined;
