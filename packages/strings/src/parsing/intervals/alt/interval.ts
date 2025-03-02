import { Interval as IntervalDiatonicAlt } from "@datune/core/intervals/symbolic/alt";
import { fromIntervalQuality } from "@datune/core/intervals/symbolic/alt/building/intervalQuality";
import { fromInt as intervalDiatonicFromInt } from "@datune/core/intervals/symbolic/diatonic/building";
import { IntervalQuality as Quality } from "@datune/core/intervals/alt";
import { parseShortName } from "parsing/intervals/alt/quality/shortName";

export function parseInterval(str: string): IntervalDiatonicAlt | null {
  const splited = splitLettersNumbers(str);

  if (!splited)
    return null;

  const intervalDiatonic = intervalDiatonicFromInt(splited.n - 1);
  const quality: Quality | null = parseShortName(splited.str);

  if (!quality || !intervalDiatonic)
    return null;

  return fromIntervalQuality(intervalDiatonic, quality);
}

function splitLettersNumbers(str: string): { str: string;
n: number; } | null {
  if (str.length === 0)
    return null;

  const splitPos = getSplitLettersNumberPos(str);

  if (splitPos >= str.length)
    return null;

  const retStr = str.substring(0, splitPos);
  const retN = +str.substring(splitPos);

  if (Number.isNaN(retN))
    return null;

  return {
    str: retStr,
    n: retN,
  };
}

function getSplitLettersNumberPos(str: string): number {
  let splitPos;

  for (splitPos = 0; splitPos < str.length; splitPos++) {
    if (!Number.isNaN(+str[splitPos]))
      break;
  }

  return splitPos;
}
