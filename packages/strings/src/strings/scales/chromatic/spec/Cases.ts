/* eslint-disable camelcase */
import { LangId } from "lang";
import { AEOLIAN_b1, COMMON, MAJOR, MINOR, Scale } from "scales/chromatic";
import stringify from "..";

type Case = [LangId, Scale, string];
export function getManualCases(): Case[] {
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
  const ALL_LANGS = [LangId.ES, LangId.EN];
  const cartesian = (...z: any) => z.reduce(
    (a: any, b: any) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())),
  );
  const cases: [LangId, Scale, string][] = cartesian(ALL_LANGS, [...COMMON]);

  for (const tuple of cases) {
    tuple.push(stringify(tuple[1], {
      langId: tuple[0],
    } ));
  }

  return cases;
}
