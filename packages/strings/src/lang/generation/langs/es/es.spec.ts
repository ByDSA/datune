import { generateES } from ".";
import { Language } from "../../..";

let lang: Language;

beforeAll(() => {
  lang = generateES();
} );
it("esp1", () => {
  const expected = "Do";
  const actual = lang.diatonic.C;

  expect(actual).toBe(expected);
} );
