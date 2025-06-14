import { DiatonicsInput, QualitiesInput, ScalesInput, ShortIntervalSetsInput, TemperamentsInput, IntervalSetsInput, WordsInput } from "./parts";

export type Input = {
  diatonics: DiatonicsInput;
  intervalSets: IntervalSetsInput;
  shortIntervalSets: ShortIntervalSetsInput;
  scales: ScalesInput;
  temperaments: TemperamentsInput;
  words: WordsInput;
  qualities: QualitiesInput;
};
