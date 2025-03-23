import { MusicalSequence } from "./musical-sequence/MusicalSequence";

export enum MainFunc {
  TONIC, SUBDOMINANT, DOMINANT
}

export class MainFuncSequence extends MusicalSequence<MainFunc> {
}
