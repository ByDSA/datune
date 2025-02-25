import Language from "../../../Language";
import generate from "../../generate";
import Input from "./Input";

export default function generateThisLang(): Language {
  return generate( {
    id: "es",
    name: "Castellano",
    base: Input,
    customGenerators: {
      voicings: {
        MINOR_SECOND: `${Input.voicings.SECOND} ${Input.voicings.MINOR}`,
        MAJOR_SECOND: `${Input.voicings.SECOND} ${Input.voicings.MAJOR}`,
        MINOR_THIRD: `${Input.voicings.THIRD} ${Input.voicings.MINOR}`,
        MAJOR_THIRD: `${Input.voicings.THIRD} ${Input.voicings.MAJOR}`,
      },
    },
  } );
}
