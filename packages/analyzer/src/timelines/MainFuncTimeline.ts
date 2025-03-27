import { MusicalTimeline } from "./musical-timeline/MusicalTimeline";

export enum MainFunc {
  TONIC, SUBDOMINANT, DOMINANT
}

export class MainFuncTimeline extends MusicalTimeline<MainFunc> {
}
