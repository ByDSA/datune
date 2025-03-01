import { GLOBAL_TOKENS } from "./tokens";
import { Lexer, TokenType } from "chevrotain";
import { Options } from "lang";

export type TokenizeOptions = Options & {
  input: string;
  langTokens: TokenType[];
};

export function tokenize(options: TokenizeOptions) {
  const { langTokens } = options;
  const allTokens = [...Object.values(GLOBAL_TOKENS), ...Object.values(langTokens)];
  const lexer = new Lexer(allTokens);
  const result = lexer.tokenize(options.input);

  if (result.errors.length > 0)
    throw new Error(result.errors.map((e) => e.message).join("\n"));

  return result.tokens;
}
