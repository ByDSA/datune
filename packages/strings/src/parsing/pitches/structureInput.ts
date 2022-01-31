import { getLangIdFromOptions, Options } from "lang";
import { tokenize } from "parsing";
import structureTokens from "./structureTokens";
import getLangTokens from "./tokens";

export default function structureInput(input: string, options?: Options) {
  try {
    const langId = getLangIdFromOptions(options);
    const langTokens = getLangTokens(langId);
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
