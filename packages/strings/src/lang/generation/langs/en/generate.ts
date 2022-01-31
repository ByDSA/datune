import Language from "../../../Language";
import generate from "../../generate";
import Input from "./Input";

export default function generateThisLang(): Language {
  return generate( {
    id: "en",
    name: "English",
    base: Input,
  } );
}
