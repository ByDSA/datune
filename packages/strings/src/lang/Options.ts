import { getLang } from "./db";
import { LangId } from "./LangId";
import { Language } from "./Language";

type PartialOptions = {
  langId: LangId;
};

export type Options = Partial<PartialOptions>;

export function getLangFromOptions(options?: Options): Language {
  return getLang(getLangIdFromOptions(options)) as Language;
}

export function getLangIdFromOptions(options?: Options): LangId {
  return options?.langId ?? LangId.DEFAULT;
}
