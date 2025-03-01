import { ParserBottomUp } from "./ParserBottomUp";

it("test", () => {
  const expected = ["A", 1];
  const parser = new ParserBottomUp()
    .from("A1")
    .expected(["str", "num"])
    .add("str", (str: string): string => str)
    .add("num", (str: string): number => +str);
  const actual = parser.parse();

  expect(actual).toStrictEqual(expected);
} );

it("with null ret", () => {
  const expected = ["A", 1];
  const parser = new ParserBottomUp()
    .from("A1")
    .expected(["str", "num"])
    .add("str", (str: string): string | null => str)
    .add("num", (str: string): number | null => +str);
  const actual = parser.parse();

  expect(actual).toStrictEqual(expected);
} );
