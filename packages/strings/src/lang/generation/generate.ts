import Language from "../Language";
import Input from "./Input";
import { diatonicsGenerate } from "./parts/diatonics";
import { qualitiesGenerate } from "./parts/qualities";
import { scalesGenerate } from "./parts/scales";
import { shortVoicingsGenerate } from "./parts/shortVoicings";
import { temperamentsGenerate } from "./parts/temperaments";
import { voicingsGenerate } from "./parts/voicings";
import { wordsGenerate } from "./parts/words";

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type LanguagePartial = DeepPartial<Language>;

export type Params = {
  id: string;
  name: string;
  base: Input;
  customGenerators?: LanguagePartial;
};

export default function generate(params: Params): Language {
  return {
    name: params.name,
    id: params.id,
    diatonic: {
      ...diatonicsGenerate(params.base.diatonics),
      ...params.customGenerators?.diatonic,
    },
    scales: {
      ...scalesGenerate(params.base.scales),
      ...params.customGenerators?.scales,
    },
    voicings: {
      ...voicingsGenerate(params.base.voicings),
      ...params.customGenerators?.voicings,
    },
    shortVoicings: {
      ...shortVoicingsGenerate(params.base.shortVoicings),
      ...params.customGenerators?.shortVoicings,
    },
    temperaments: {
      ...temperamentsGenerate(params.base.temperaments),
      ...params.customGenerators?.temperaments,
    },
    words: {
      ...wordsGenerate(params.base.words),
      ...params.customGenerators?.words,
    },
    quality: {
      ...qualitiesGenerate(params.base.qualities),
      ...params.customGenerators?.quality,
    },
  };
}
