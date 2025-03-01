import { from as fromRootScale } from "@datune/core/keys/alt/building";
import { MAJOR } from "@datune/core/scales/symbolic/alt/constants";
import { getLangIdFromOptions, Options } from "lang";
import { getLangTokens, tokenize } from "parsing";
import { parsePitch } from "parsing/pitches/alt";
import { parseScale } from "parsing/scales/alt";
import { tokensParse } from "parsing/utils/tokens-parser/key";

export function parseKey(input: string, options?: Options) {
  const langId = getLangIdFromOptions(options);
  const allLangTokens = getLangTokens(langId);
  const langTokens = [
    allLangTokens.scale,
    allLangTokens.pitch,
  ];

  try {
    const parsed = tokensParse( {
      ...options,
      inputTokens: tokenize( {
        input,
        langTokens,
      } ),
    } );

    if (!parsed)
      return null;

    const pitch = parsePitch(parsed.pitch, options);
    const scale = parsed.scale ? parseScale(parsed.scale, options) : MAJOR;

    if (pitch && scale)
      return fromRootScale(pitch, scale);

    return null;
  } catch {
    return null;
  }
}
