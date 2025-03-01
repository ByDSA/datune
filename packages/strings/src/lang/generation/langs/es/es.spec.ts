import { Language } from "../../..";
import { generateEs } from "./generate";

let lang: Language;

beforeAll(() => {
  lang = generateEs();
} );

it("esp1", () => {
  const expected = "Do";
  const actual = lang.diatonic.C;

  expect(actual).toBe(expected);
} );
