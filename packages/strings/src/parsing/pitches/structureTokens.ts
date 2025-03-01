import { innerParse } from "../utils/tokens-parser/innerTokensToTree";
import { TokensParserOptions } from "../utils/tokens-parser/Options";
import { ParserType } from "../utils/tokens-parser/Parser";
import { Struct } from "./Struct";

export function structure(options: TokensParserOptions): Struct {
  return innerParse( {
    ...options,
    statement: (parser: ParserType) => {
      const result = parser.pitchStatement();
      const pitch = result.children.pitchClause[0].children.Pitch?.[0].image;

      return {
        pitch,
      };
    },
  } );
}
