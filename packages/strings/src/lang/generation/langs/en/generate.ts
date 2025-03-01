import { Language } from "../../../Language";
import { generate } from "../../generate";
import { INPUT_EN } from "./Input";

export function generateEn(): Language {
  return generate( {
    id: "en",
    name: "English",
    base: INPUT_EN,
  } );
}
