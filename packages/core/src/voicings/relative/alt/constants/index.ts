import { initializeN2, POWER_CHORD } from "./n2";
import { initializeN3 } from "./n3";
import { initializeN4 } from "./n4";
import { initializeN5 } from "./n5";
import { initializeN6 } from "./n6";
import { initializeN7 } from "./n7";
import { initializeSets } from "./sets";

export function initialize() {
  if (POWER_CHORD)
    throw new Error("Already initialized");

  initializeN2();
  initializeN3();
  initializeN4();
  initializeN5();
  initializeN6();
  initializeN7();
  initializeSets();
}

export * from "./n2";

export * from "./n3";

export * from "./n4";

export * from "./n5";

export * from "./n6";

export * from "./n7";

export * from "./sets";
