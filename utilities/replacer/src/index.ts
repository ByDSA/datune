import { AliasReplacer } from "../node_modules/tsc-alias/dist";
import replaceAlias from "./replaceAlias";
import replaceIndex from "./replaceIndex";
import { getOnlyUrl, getOrigType } from "./utils";

const replacer: AliasReplacer = ( { orig,
  file,
  config } ): string => {
  const origType = getOrigType(orig);

  if (origType === undefined)
  return orig;

  const url = getOnlyUrl(orig, origType);

  const replacers = [replaceIndex, replaceAlias];

  for(const replacer of replacers) {
    const replaced = replacer({url: url, origType, file, config});

    if (replaced)
      return replaced;
  }

  return orig;
};

export default replacer;
