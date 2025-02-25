import { CstParser } from "chevrotain";
import { ParserTokens, toArray } from "./ParserTokens";

export type ParserType = {
  keyStatement: ()=> any;
  pitchStatement: ()=> any;
  scaleStatement: ()=> any;
};

export default class Parser extends CstParser {
  constructor(tokens: ParserTokens) {
    super(toArray(tokens));

    const $ = this;

    $.RULE("keyStatement", () => {
      $.SUBRULE(($ as any).pitchClause);
      $.OPTION(() => {
        $.SUBRULE(($ as any).scaleClause);
      } );
    } );

    $.RULE("pitchStatement", () => {
      $.SUBRULE(($ as any).pitchClause);
    } );

    $.RULE("pitchClause", () => {
      $.CONSUME(tokens.lang.pitch);
    } );

    $.RULE("scaleStatement", () => {
      $.SUBRULE(($ as any).scaleClause);
    } );

    $.RULE("scaleClause", () => {
      $.CONSUME(tokens.lang.scale);
    } );

    this.performSelfAnalysis();
  }
}
