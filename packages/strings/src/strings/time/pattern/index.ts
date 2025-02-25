import { Pattern } from "@datune/core/time/symbolic/rhythm";

export default function stringify(obj: Pattern): string {
  let stringBuilder = "";

  stringBuilder += "[";
  let first = true;

  for (const i of obj.values) {
    if (first)
      first = false;
    else
      stringBuilder += ", ";

    stringBuilder += i;
  }

  stringBuilder += "]";

  return stringBuilder.toString();
}
