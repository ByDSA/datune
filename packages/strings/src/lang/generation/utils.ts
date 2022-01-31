export const sharp = "♯";

export const flat = "♭";

export function alts(n: number): string {
  if (n < 0)
    return flat.repeat(-n);

  if (n > 0)
    return sharp.repeat(n);

  return "";
}

export const b9 = `${alts(-1)}9`;

export const a9 = `${alts(1)}9`;

export const b5 = `${alts(-1)}5`;

export const a5 = `${alts(1)}5`;

export const a11 = `${alts(1)}11`;

export const add = "ADD";
