import fs from "fs";
import Language from "../Language";

export type Params = {
  folder?: string;
  lang: Language;
};

export default function save(params: Params): void {
  const folder = params.folder || ".";

  fs.writeFileSync(`${folder}/${params.lang.id}.json`, JSON.stringify(params.lang));
}
