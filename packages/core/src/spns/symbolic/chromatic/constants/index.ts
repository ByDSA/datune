import { initializeAll } from "./set";
import { initializeValues } from "./values";

export function initialize() {
  initializeValues();

  initializeAll();
}

export * from "./set";

export * from "./values";
