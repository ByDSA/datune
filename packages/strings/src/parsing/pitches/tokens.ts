import { ProcessCache } from "datils/patterns/caching";
import { createToken, TokenType } from "chevrotain";
import { LangId } from "lang";

function generateToken(langId: LangId) {
  const pattern = generateVoicing(langId);

  return createToken( {
    name: "Pitch",
    pattern,
  } );
}

function generateVoicing(langId: LangId): RegExp {
  switch (langId) {
    case LangId.ES:
      return /(do|re|mi|fa|sol|la|si)(b|#){0,3}/i;
    case LangId.EN:
    default:
      return /(a|b|c|d|e|f|g)(b|#){0,3}/i;
  }
}

export function getLangTokens(langId: LangId = LangId.DEFAULT): TokenType[] {
  const token = cache.getOrProcess(langId);

  return [token];
}
const cache = new ProcessCache((langId: LangId) => generateToken(langId));
