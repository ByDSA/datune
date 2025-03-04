import { ProcessCache } from "@datune/utils";
import { COMMON } from "@datune/core/scales/symbolic/chromatic/constants";
import { createToken, TokenType } from "chevrotain";
import { LangId } from "lang";
import { getName } from "strings/scales/chromatic/name";
import { normalizeInputName } from "./normalizeNameInput";

function generateToken(langId: LangId) {
  const pattern = generateVoicing(langId);

  return createToken( {
    name: "Scale",
    pattern,
  } );
}

function generateVoicing(langId: LangId): RegExp {
  const names: string[] = getAllNamesByLang(langId);
  const str = `(${names
    .map(normalizeInputName)
    .map((a) => `(${a})`)
    .join("|")}|(m))`;

  return new RegExp(str, "i");
}

function getAllNamesByLang(langId: LangId): string[] {
  const names = [];

  for (const scale of COMMON) {
    const name = getName(scale, {
      langId,
    } );

    if (name)
      names.push(name);
  }

  return names;
}

export function getLangTokens(langId: LangId = LangId.DEFAULT): TokenType[] {
  const token = cache.getOrProcess(langId);

  return [token];
}
const cache = new ProcessCache((langId: LangId) => generateToken(langId));
