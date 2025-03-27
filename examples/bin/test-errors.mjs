#!/usr/bin/env zx
import path from "node:path";

const files = await glob("./[0-9][0-9]*.ts");

$.verbose = false;

for (const file of files) {
  try {
    console.log(`Executing ${file}...`);
    const absolutePath = path.resolve(file);
    const result = await $`npx tsx ${absolutePath}`;

    if (result.exitCode !== 0) {
      console.error(`Error executing ${file}`);
      console.error(result.stderr);
      process.exit(result.exitCode);
    }
  } catch (error) {
    console.error(`Error executing ${file}`);
    console.error(error.stderr || error.message);
    process.exit(error.exitCode || 1);
  }
}

console.log("All TypeScript files executed successfully");
