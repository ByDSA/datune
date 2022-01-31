import { Options, tokenize } from "parsing";
import structureTokens from "./structureTokens";
import getLangTokens from "./tokens";

export default function structureInput(input: string, options?: Options) {
  try {
    const langTokens = getLangTokens(options?.langId);
    const inputTokens = tokenize( {
      input,
      langTokens,
      ...options,
    } );

    return structureTokens( {
      ...options,
      inputTokens,
    } );
  } catch (e) {
    return null;
  }
}
