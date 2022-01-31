import innerParse from "../utils/tokens-parser/innerTokensToTree";
import Options from "../utils/tokens-parser/Options";
import { ParserType } from "../utils/tokens-parser/Parser";
import Struct from "./Struct";

export default function structure(options: Options): Struct {
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
