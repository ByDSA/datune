import { TokenType } from "chevrotain";
import { LangId } from "lang";
import { getLangTokens, GlobalTokens, GLOBAL_TOKENS, LangTokens } from "parsing/utils/tokens";

export type ParserTokens = {
  global: GlobalTokens;
  lang: LangTokens;
};

export function toArray(parserTokens: ParserTokens): TokenType[] {
  return [
    ...Object.values(parserTokens.global),
    ...Object.values(parserTokens.lang),
  ];
}

export function getParserTokens(langId: LangId): ParserTokens {
  const parserTokens = {
    global: GLOBAL_TOKENS,
    lang: getLangTokens(langId),
  };

  return parserTokens;
}
