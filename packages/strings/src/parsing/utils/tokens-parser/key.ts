import innerParse from "./innerTokensToTree";
import TokensParserOptions from "./Options";
import { ParserType } from "./Parser";

export type ParsedReturnType = {
  pitch: string;
  scale: string | undefined;
};

export default function parseKey(options: TokensParserOptions): ParsedReturnType {
  return innerParse( {
    ...options,
    statement: (parser: ParserType) => {
      const result = parser.keyStatement();
      const pitch = result.children.pitchClause[0].children.Pitch?.[0].image;
      const scale = result.children.scaleClause?.[0].children.Scale?.[0].image;

      return {
        pitch,
        scale,
      };
    },
  } );
}
