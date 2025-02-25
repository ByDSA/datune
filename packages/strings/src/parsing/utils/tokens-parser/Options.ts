import { IToken } from "chevrotain";
import { Options } from "lang";

type TokensParserOptions = Options & {
  inputTokens: IToken[];
};

export default TokensParserOptions;
