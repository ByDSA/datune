import fs from "fs";
import serialize from "../../types/serialize";
import SaveSettings, { DEFAULT_SETTINGS as SAVE_DEFAULT_SETTINGS } from "./SaveSettings";

export default function save(saveSettings: SaveSettings = SAVE_DEFAULT_SETTINGS) {
  const saveJson = serialize();
  const stringifiedJson = JSON.stringify(saveJson);

  return fs.promises.writeFile(saveSettings.path, stringifiedJson);
}
