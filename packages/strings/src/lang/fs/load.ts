import fs from "node:fs";
import { LangId } from "lang";
import { putLang } from "lang/db";
import { Language } from "../Language";

export type Params = {
  folder?: string;
  langId: LangId;
};

export function loadFromFile(params: Params): Language | null {
  const folder = params.folder || ".";

  try {
    const readLang = fs.readFileSync(`${folder}/${params.langId}.json`, {
      encoding: "utf8",
      flag: "r",
    } ) as string;
    const lang = JSON.parse(readLang) as Language;

    if (!isValidLang(lang))
      return null;

    putLang(lang);

    return lang;
  } catch {
    return null;
  }
}

function isValidLang(lang: Language): boolean {
  return lang.id !== undefined && lang.diatonic !== undefined && lang.words !== undefined;
}
