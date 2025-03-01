import { structure } from "./structureTokens";
import { getLangTokens } from "./tokens";
import { getLangIdFromOptions, Options } from "lang";
import { tokenize } from "parsing";

export function structureInput(input: string, options?: Options) {
  try {
    const langId = getLangIdFromOptions(options);
    const langTokens = getLangTokens(langId);
    const inputTokens = tokenize( {
      input,
      langTokens,
      ...options,
    } );

    return structure( {
      ...options,
      inputTokens,
    } );
  } catch {
    return null;
  }
}
