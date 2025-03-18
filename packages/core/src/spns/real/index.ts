import { NonEmptyArray } from "datils";
import { Spn } from "../Spn";
import { overtones } from "./calcs";

type SpnArray = NonEmptyArray<Spn>;

const mod = {
  overtones,
};

export {
  Spn,
  SpnArray,
  mod as Spns,
};
