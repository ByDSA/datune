import { getLang } from "./db";
import LangId from "./LangId";
import Language from "./Language";

type PartialOptions = {
  langId: LangId;
};

type Options = Partial<PartialOptions>;

export default Options;

export function getLangFromOptions(options?: Options): Language {
  return getLang(getLangIdFromOptions(options)) as Language;
}

export function getLangIdFromOptions(options?: Options): LangId {
  return options?.langId ?? LangId.DEFAULT;
}
