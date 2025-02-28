import fs from "node:fs";
import { checkDto, Data, deserialize, Dto } from "../../types";
import { DEFAULT_SETTINGS as LOAD_DEFAULT_SETTINGS } from "./LoadSettings";

export async function load(loadSettings = LOAD_DEFAULT_SETTINGS): Promise<Data | null> {
  const json = await getJson(loadSettings);
  const dto: Dto | null = checkDto(json);

  if (!dto)
    return null;

  const data = deserialize(dto);

  return data;
}

function getJson(loadSettings = LOAD_DEFAULT_SETTINGS): Promise<Data | null> {
  if (loadSettings.local) {
    return fs.promises.readFile(loadSettings.path, "utf8")
      .then((str) => JSON.parse(str))
      .catch(() => null);
  }

  return fetch(loadSettings.path)
    .then((response) => response.json())
    .catch(() => null);
}
