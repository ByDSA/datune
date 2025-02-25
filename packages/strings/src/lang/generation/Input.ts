import { DiatonicsInput, QualitiesInput, ScalesInput, ShortVoicingsInput, TemperamentsInput, VoicingsInput, WordsInput } from "./parts";

type Input = {
  diatonics: DiatonicsInput;
  voicings: VoicingsInput;
  shortVoicings: ShortVoicingsInput;
  scales: ScalesInput;
  temperaments: TemperamentsInput;
  words: WordsInput;
  qualities: QualitiesInput;
};

export default Input;
