import fs from "fs";
import { checkDto, Data, deserialize, Dto } from "../../types";
import { DEFAULT_SETTINGS as LOAD_DEFAULT_SETTINGS } from "./LoadSettings";

export default function loadSync(loadSettings = LOAD_DEFAULT_SETTINGS): Data | null {
  const json = getJson(loadSettings);
  const dto: Dto | null = checkDto(json);

  if (!dto)
    return null;

  const data = deserialize(dto);

  return data;
}

function getJson(loadSettings = LOAD_DEFAULT_SETTINGS): Data | null {
  if (loadSettings.local) {
    const str = fs.readFileSync(loadSettings.path, "utf8");

    try {
      return JSON.parse(str);
    } catch (e) {
      return null;
    }
  }

  return null;
}
