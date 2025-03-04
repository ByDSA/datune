/* eslint-disable jest/expect-expect */
import { generateEn } from "lang/generation/langs/en";
import { generateEs } from "lang/generation/langs/es";
import { save } from "./save";

it("eng", () => {
  const lang = generateEn();

  save( {
    lang,
    folder: "tests/lang",
  } );
} );

it("esp", () => {
  const lang = generateEs();

  save( {
    lang,
    folder: "tests/lang",
  } );
} );
