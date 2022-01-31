/* eslint-disable import/no-mutable-exports */
import { createToken, Lexer, TokenType } from "chevrotain";

export type GlobalTokens = {
  whiteSpace: TokenType;
};

export const WHITE_SPACE = createToken( {
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED,
} );

export const GLOBAL_TOKENS: GlobalTokens = {
  whiteSpace: WHITE_SPACE,
};
