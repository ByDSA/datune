import { ParsingProcess } from "./ParsingProcess";

type F = (str: string)=> any;
type Table = { [key: string]: F };
export class ParserBottomUp {
  table: Table = {};

  expectedTypes: string[] = [];

  fromString: string = "";

  add(name: string, f: F): ParserBottomUp {
    this.table[name] = f;

    return this;
  }

  expected(expectedTypes: string[]): ParserBottomUp {
    this.expectedTypes = expectedTypes;

    return this;
  }

  from(str: string): ParserBottomUp {
    this.fromString = str;

    return this;
  }

  parse(): any[] | null {
    const process = new ParsingProcess();

    process.start(this);

    if (!process.result)
      return null;

    return process.result.objects;
  }
}
