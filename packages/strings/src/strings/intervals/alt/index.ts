import { Interval } from "@datune/core/intervals/alt";

export function stringifyInterval(obj: Interval): string {
  const diatonicIntervalInt = +obj.diatonicInterval;
  const qualityShortName = String(obj.quality);

  if (diatonicIntervalInt >= 0) {
    return `${qualityShortName
    }${diatonicIntervalInt + 1}`;
  }

  return `-${qualityShortName
  }${-diatonicIntervalInt + 1}`;
}
