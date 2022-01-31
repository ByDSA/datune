import { initializeConstants } from "./constants";
import { initializeSets } from "./sets";

export * from "./constants";

export * from "./sets";

export function initialize() {
  initializeConstants();
  initializeSets();
}
