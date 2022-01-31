import innerParse from "../utils/tokens-parser/innerTokensToTree";
import Options from "../utils/tokens-parser/Options";
import { ParserType } from "../utils/tokens-parser/Parser";
import Struct from "./Struct";

export default function tokensParse(options: Options): Struct {
  return innerParse( {
    ...options,
    statement: (parser: ParserType) => {
      const result = parser.scaleStatement();
      const scale = result.children.scaleClause[0].children.Scale?.[0].image;

      return {
        scale,
      };
    },
  } );
}
