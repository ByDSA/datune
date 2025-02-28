import { Arrays } from "@datune/utils";
import { SPNArray, SPN } from "@datune/core/spns/chromatic";
import { Voicing as ChromaticVoicing } from "@datune/core/voicings/chromatic";
import { fromRootIntervals } from "@datune/core/voicings/relative/chromatic/building/rootIntervals";
import { inv } from "@datune/core/voicings/relative/chromatic/modifiers";
import { MAJOR_SECOND, TRIAD_AUGMENTED, TRITONE } from "@datune/core/voicings/relative/chromatic/constants";
import { CompositeSteps } from "../../../composite";
import { compactStepsArray } from "../../../forward/multi/Utils";
import { Array as SingleStepArray, index, SingleStep } from "../../../single";
import { Step } from "../../../Step";
import { FilterStepFunction, StepsGeneratorInterface } from "../../StepsGenerator";
import { DEFAULT_AUGMENTED_RESOLUTION, DEFAULT_TRITONE_RESOLUTION } from "./constants";
import { IntervalResults } from "./IntervalResults";

export class IntervalStepsGen implements StepsGeneratorInterface {
  #intervalResolutionsMap = new Map<ChromaticVoicing, SingleStep[][]>();

  #results: IntervalResults | undefined;

  #notes: SPNArray | undefined;

  #indexes: Arrays.Number | undefined;

  #filterFunction: FilterStepFunction | undefined;

  private constructor() {
  }

  static create(): IntervalStepsGen {
    return new IntervalStepsGen();
  }

  notes(...notes: SPNArray): IntervalStepsGen {
    this.#notes = notes;

    return this;
  }

  indexes(...indexes: Arrays.Number): IntervalStepsGen {
    this.#indexes = indexes;

    return this;
  }

  filter(f: FilterStepFunction): IntervalStepsGen {
    this.#filterFunction = f;

    return this;
  }

  #solveVoicing(voicing: ChromaticVoicing): Step[] {
    let resolutionSteps = this.#intervalResolutionsMap.get(voicing)
            || this.#getDefaultResolutionsForVoicing(voicing);

    resolutionSteps = this.#getFixedIndexes(resolutionSteps);

    if (resolutionSteps.length === 0)
      return [];

    return <Step[]>compactStepsArray(<SingleStepArray[]>resolutionSteps);
  }

  #getDefaultResolutionsForVoicing(voicing: ChromaticVoicing): SingleStep[][] {
    switch (voicing) {
      case MAJOR_SECOND:
        return [
          CompositeSteps.fromIntervalsKeepZero(-1, 0).singleSteps,
          CompositeSteps.fromIntervalsKeepZero(-2, 0).singleSteps,
          CompositeSteps.fromIntervalsKeepZero(0, 1).singleSteps,
          CompositeSteps.fromIntervalsKeepZero(0, 2).singleSteps,
        ];
      case inv(MAJOR_SECOND):
        return [
          CompositeSteps.fromIntervalsKeepZero(1, 0).singleSteps,
          CompositeSteps.fromIntervalsKeepZero(2, 0).singleSteps,
          CompositeSteps.fromIntervalsKeepZero(0, -1).singleSteps,
          CompositeSteps.fromIntervalsKeepZero(0, -2).singleSteps,
        ];
      case TRITONE:
      {
        let ret = DEFAULT_TRITONE_RESOLUTION;

        if (this.#filterFunction)
          ret = ret.filter(this.#filterFunction);

        return ret;
      }
      case TRIAD_AUGMENTED:
        if (!this.#filterFunction)
          return DEFAULT_AUGMENTED_RESOLUTION;

        return DEFAULT_AUGMENTED_RESOLUTION.filter(this.#filterFunction);
      default: return [];
    }
  }

  #getFixedIndexes(motions: SingleStep[][]): SingleStep[][] {
    const ret = [];

    for (const m of motions) {
      const retM = [];

      for (let i = 0; i < m.length; i++) {
        const sm = m[i];
        const newIndex = (<number[]> this.#indexes)[sm.index];

        if (newIndex === undefined)
          throw new Error(`Invalid newIndex. indexes=${this.#indexes} sm.index=${sm.index}`);

        retM.push(index(sm, newIndex));
      }

      ret.push(retM);
    }

    return ret;
  }

  generateSteps(): Step[] {
    if (!this.#notes)
      throw new Error();

    if (!this.#indexes)
      this.#indexes = <Arrays.Number> this.#notes.map((_n, i) => i);

    const firstNote = this.#notes[this.#indexes[0]];
    const voicingInt = <Arrays.Number> this.#indexes.map((indexx) => {
      const noteIndex = (<SPN[]> this.#notes)[indexx];

      return noteIndex.valueOf() - firstNote.valueOf();
    } );
    const voicing = fromRootIntervals(...voicingInt);

    this.#results = {
      voicing,
      possibilities: this.#solveVoicing(voicing),
    };

    return this.#results.possibilities;
  }

  // eslint-disable-next-line accessor-pairs
  get results(): IntervalResults | undefined {
    return this.#results;
  }
}
