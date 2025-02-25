export default function splitArray(str: string): string[] | null {
  let splited: string[] = str.split(/\s|,|-|:/);

  splited = splited.filter((el) => el);

  if (splited.length > 1)
    return splited;

  return null;
}
