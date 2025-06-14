import { Language } from "../../../Language";
import { generate } from "../../generate";
import { INPUT_ES } from "./Input";

export function generateEs(): Language {
  return generate( {
    id: "es",
    name: "Castellano",
    base: INPUT_ES,
    customGenerators: {
      intervalSets: {
        m2: `${INPUT_ES.intervalSets.SECOND} ${INPUT_ES.intervalSets.MINOR}`,
        M2: `${INPUT_ES.intervalSets.SECOND} ${INPUT_ES.intervalSets.MAJOR}`,
        m3: `${INPUT_ES.intervalSets.THIRD} ${INPUT_ES.intervalSets.MINOR}`,
        M3: `${INPUT_ES.intervalSets.THIRD} ${INPUT_ES.intervalSets.MAJOR}`,
      },
    },
  } );
}
