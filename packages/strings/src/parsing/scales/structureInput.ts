import { tokensParse } from "./structureTokens";
import { getLangTokens } from "./tokens";
import { Options, tokenize } from "parsing";

export function structureInput(input: string, options?: Options) {
  try {
    const langTokens = getLangTokens(options?.langId);
    const inputTokens = tokenize( {
      input,
      langTokens,
      ...options,
    } );

    return tokensParse( {
      ...options,
      inputTokens,
    } );
  } catch {
    return null;
  }
}
