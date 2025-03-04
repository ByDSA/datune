/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { Scales, Scale } from "@datune/core/scales/chromatic";
import { LangId } from "lang";
import { stringifyScale } from "..";

type Case = [LangId, Scale, string];
export function getManualCases(): Case[] {
  const { AEOLIAN_b1, MAJOR, MINOR } = Scales;

  return [
    [LangId.ES, MAJOR, "Mayor"],
    [LangId.ES, MINOR, "Menor"],
    [LangId.ES, AEOLIAN_b1, "Lidia Aumentada ♯2"],
    [LangId.EN, MAJOR, "Major"],
    [LangId.EN, MINOR, "Minor"],
    [LangId.EN, AEOLIAN_b1, "Lydian Augmented ♯2"],
  ];
}

export function getAllCases(): Case[] {
  const { COMMON } = Scales;
  const ALL_LANGS = [LangId.ES, LangId.EN];
  const cartesian = (...z: any) => z.reduce(
    (a: any, b: any) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())),
  );
  const cases: [LangId, Scale, string][] = cartesian(ALL_LANGS, [...COMMON]);

  for (const tuple of cases) {
    tuple.push(stringifyScale(tuple[1], {
      langId: tuple[0],
    } ));
  }

  return cases;
}
