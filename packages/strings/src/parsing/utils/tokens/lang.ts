import { TokenType } from "chevrotain";
import { LangId } from "lang";
import { getLangTokens as pitchGetLangTokens } from "parsing/pitches/tokens";
import { getLangTokens as scaleGetLangTokens } from "parsing/scales/tokens";

export type LangTokens = {
pitch: TokenType;
scale: TokenType;
};

export function getLangTokens(langId: LangId): LangTokens {
  return {
    scale: scaleGetLangTokens(langId)[0],
    pitch: pitchGetLangTokens(langId)[0],
  };
}
