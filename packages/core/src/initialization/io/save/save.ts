import fs from "node:fs";
import { serialize } from "../../types/serialize";
import { type SaveSettings, DEFAULT_SETTINGS as SAVE_DEFAULT_SETTINGS } from "./SaveSettings";

export function save(saveSettings: SaveSettings = SAVE_DEFAULT_SETTINGS) {
  const saveJson = serialize();
  const stringifiedJson = JSON.stringify(saveJson);

  return fs.promises.writeFile(saveSettings.path, stringifiedJson);
}
