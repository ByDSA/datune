import { Arrays } from "@datune/utils";
import { SPN } from "../SPN";
import { overtones } from "./calcs";

type SPNArray = Arrays.NonEmpty<SPN>;

const mod = {
  overtones,
};

export {
  SPN,
  SPNArray,
  mod as SPNs,
};
