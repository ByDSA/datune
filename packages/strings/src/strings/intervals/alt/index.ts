import { Interval } from "intervals/alt";

export default function f(obj: Interval): string {
  const diatonicIntervalInt = +obj.diatonicInterval;
  const qualityShortName = String(obj.quality);

  if (diatonicIntervalInt >= 0) {
    return `${qualityShortName
    }${diatonicIntervalInt + 1}`;
  }

  return `-${qualityShortName
  }${-diatonicIntervalInt + 1}`;
}
