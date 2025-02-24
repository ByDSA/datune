import { flat, sharp } from "lang/generation/utils";

export function removeSpaces(input: string): string {
  return input.replaceAll(" ", "");
}

export function removeMarks(input: string): string {
  return input
    .replaceAll(/Á|À|Ä|Â/g, "A")
    .replaceAll(/É|È|Ë|Ê/g, "E")
    .replaceAll(/Í|Ì|Ï|Î/g, "I")
    .replaceAll(/Ó|Ò|Ö|Ô/g, "O")
    .replaceAll(/Ú|Ù|Ü|Û/g, "U")
    .replaceAll(/á|à|ä|â/g, "a")
    .replaceAll(/é|è|ë|ê/g, "e")
    .replaceAll(/í|ì|ï|î/g, "i")
    .replaceAll(/ó|ò|ö|ô/g, "o")
    .replaceAll(/ú|ù|ü|û/g, "u")
    .replaceAll(/Ñ/g, "N")
    .replaceAll(/ñ/g, "ñ")
    .replaceAll(/ç/g, "c")
    .replaceAll(/Ç/g, "C");
}

export function toPascalCase(input: string): string {
  return input.replace(
    /\S+/g,
    (w) => w[0].toLocaleUpperCase() + w.slice(1).toLocaleLowerCase(),
  );
}

export function specializeAlts(input: string) {
  let fixed = input
    .replace(/#/g, sharp)
    .replace(/(b)([0-9])/g, `${flat}$2`);

  while (fixed.match(`b${flat}`))
    fixed = fixed.replace(`b${flat}`, flat + flat);

  return fixed;
}

export function normalizeAlts(input: string) {
  return input
    .replaceAll(sharp, "#")
    .replaceAll(flat, "b");
}
