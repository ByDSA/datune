import { TokensParserOptions } from "./Options";
import { Parser, ParserType } from "./Parser";
import { getParserTokens } from "./ParserTokens";
import { getLangIdFromOptions } from "lang";
import { IRecognitionException } from "chevrotain";

type InnerOptions = TokensParserOptions & {
  statement: (parser: ParserType)=> any;
};

export function innerParse(options: InnerOptions) {
  const langId = getLangIdFromOptions(options);
  const parserTokens = getParserTokens(langId);
  const parser = new Parser(parserTokens);

  // "input" is a setter which will reset the parser's state.
  parser.input = options.inputTokens;
  const result = options.statement((parser as any));

  if (parser.errors.length > 0)
    throwErrors(parser.errors);

  return result;
}

function throwErrors(errors: IRecognitionException[]) {
  throw new Error(errors.map((e) => e.message).join("\n"));
}
