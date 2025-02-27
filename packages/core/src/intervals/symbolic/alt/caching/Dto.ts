import { Interval as DiatonicInterval } from "intervals/diatonic";
import { Quality } from "intervals/quality";

export type Dto = {
  diatonicInterval: DiatonicInterval;
  quality: Quality;
};
