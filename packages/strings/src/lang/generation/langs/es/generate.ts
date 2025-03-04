import { Language } from "../../../Language";
import { generate } from "../../generate";
import { INPUT_ES } from "./Input";

export function generateEs(): Language {
  return generate( {
    id: "es",
    name: "Castellano",
    base: INPUT_ES,
    customGenerators: {
      voicings: {
        m2: `${INPUT_ES.voicings.SECOND} ${INPUT_ES.voicings.MINOR}`,
        M2: `${INPUT_ES.voicings.SECOND} ${INPUT_ES.voicings.MAJOR}`,
        m3: `${INPUT_ES.voicings.THIRD} ${INPUT_ES.voicings.MINOR}`,
        M3: `${INPUT_ES.voicings.THIRD} ${INPUT_ES.voicings.MAJOR}`,
      },
    },
  } );
}
