import { MainInit } from "./main/MainInit";

export default class Initializer {
  static loadLocal() {
    MainInit.singleton.load();
  }

  static save() {
    MainInit.singleton.save();
  }
}
