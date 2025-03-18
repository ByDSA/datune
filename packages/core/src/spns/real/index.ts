import type { Arrays } from "@datune/utils";
import { Spn } from "../Spn";
import { overtones } from "./calcs";

type SpnArray = Arrays.NonEmpty<Spn>;

const mod = {
  overtones,
};

export {
  Spn,
  SpnArray,
  mod as Spns,
};
