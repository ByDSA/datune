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
        MINOR_SECOND: `${INPUT_ES.voicings.SECOND} ${INPUT_ES.voicings.MINOR}`,
        MAJOR_SECOND: `${INPUT_ES.voicings.SECOND} ${INPUT_ES.voicings.MAJOR}`,
        MINOR_THIRD: `${INPUT_ES.voicings.THIRD} ${INPUT_ES.voicings.MINOR}`,
        MAJOR_THIRD: `${INPUT_ES.voicings.THIRD} ${INPUT_ES.voicings.MAJOR}`,
      },
    },
  } );
}
