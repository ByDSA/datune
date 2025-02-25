import { LangId } from "lang";
import Language from "lang/Language";

const map = new Map<LangId, Language>();

export function getLang(id: LangId): Language | null {
  return map.get(id) || null;
}

export function putLang(lang: Language): void {
  map.set(lang.id as LangId, lang);
}
