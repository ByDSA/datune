import { IToken } from "chevrotain";
import { Options } from "lang";

export type TokensParserOptions = Options & {
  inputTokens: IToken[];
};
