import { generateEN } from "lang/generation/langs/en";
import { generateES } from "lang/generation/langs/es";
import save from "./save";

it("ENG", () => {
  const lang = generateEN();

  save( {
    lang,
    folder: "tests/lang",
  } );
} );

it("ESP", () => {
  const lang = generateES();

  save( {
    lang,
    folder: "tests/lang",
  } );
} );
