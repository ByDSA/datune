import fs from "node:fs";
import { Language } from "../Language";

export type Params = {
  folder?: string;
  lang: Language;
};

export function save(params: Params): void {
  const folder = params.folder || ".";

  fs.writeFileSync(`${folder}/${params.lang.id}.json`, JSON.stringify(params.lang));
}
