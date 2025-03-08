import { generateEN, generateES, LangId } from "lang";
import { Language } from "lang/Language";

const map = new Map<LangId, Language>();

export function getLang(id: LangId): Language {
  let ret = map.get(id);

  if (!ret) {
    const generateFn = (() => {
      switch (id) {
        case LangId.EN: return generateEN;
        case LangId.ES: return generateES;
        default: throw new Error();
      }
    } )();
    const obj = generateFn();

    putLang(obj);

    ret = map.get(id) as Language;
  }

  return ret;
}

export function putLang(lang: Language): void {
  map.set(lang.id as LangId, lang);
}
