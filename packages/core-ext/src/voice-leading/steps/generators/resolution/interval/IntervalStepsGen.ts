/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { Arrays } from "@datune/utils";
import { Array as SPNArray, SPN } from "@datune/core/spns/chromatic";
import { fromRootIntervals, inv, MAJOR_SECOND, TRIAD_AUGMENTED, TRITONE, Voicing as ChromaticVoicing } from "@datune/core/voicings/chromatic";
import { CompositeStep } from "../../../composite/CompositeStep";
import { compactStepsArray } from "../../../forward/multi/Utils";
import { Array as SingleStepArray, index, SingleStep } from "../../../single";
import { Step } from "../../../Step";
import { FilterStepFunction, StepsGeneratorInterface } from "../../StepsGenerator";
import { DEFAULT_AUGMENTED_RESOLUTION, DEFAULT_TRITONE_RESOLUTION } from "./constants";
import IntervalResults from "./IntervalResults";

export default class IntervalStepsGen implements StepsGeneratorInterface {
  private _intervalResolutionsMap = new Map<ChromaticVoicing, SingleStep[][]>();

  private _results: IntervalResults | undefined;

  private _notes: SPNArray | undefined;

  private _indexes: Arrays.Number | undefined;

  private _filterFunction: FilterStepFunction | undefined;

  private constructor() {
  }

  static create(): IntervalStepsGen {
    return new IntervalStepsGen();
  }

  notes(...notes: SPNArray): IntervalStepsGen {
    this._notes = notes;

    return this;
  }

  indexes(...indexes: Arrays.Number): IntervalStepsGen {
    this._indexes = indexes;

    return this;
  }

  filter(f: FilterStepFunction): IntervalStepsGen {
    this._filterFunction = f;

    return this;
  }

  private _solveVoicing(voicing: ChromaticVoicing): Step[] {
    let resolutionSteps = this._intervalResolutionsMap.get(voicing)
            || this._getDefaultResolutionsForVoicing(voicing);

    resolutionSteps = this._getFixedIndexes(resolutionSteps);

    if (resolutionSteps.length === 0)
      return [];

    return <Step[]>compactStepsArray(<SingleStepArray[]>resolutionSteps);
  }

  private _getDefaultResolutionsForVoicing(voicing: ChromaticVoicing): SingleStep[][] {
    switch (voicing) {
      case MAJOR_SECOND:
        return [
          CompositeStep.fromIntervalsKeepZero(-1, 0).singleSteps,
          CompositeStep.fromIntervalsKeepZero(-2, 0).singleSteps,
          CompositeStep.fromIntervalsKeepZero(0, 1).singleSteps,
          CompositeStep.fromIntervalsKeepZero(0, 2).singleSteps,
        ];
      case inv(MAJOR_SECOND):
        return [
          CompositeStep.fromIntervalsKeepZero(1, 0).singleSteps,
          CompositeStep.fromIntervalsKeepZero(2, 0).singleSteps,
          CompositeStep.fromIntervalsKeepZero(0, -1).singleSteps,
          CompositeStep.fromIntervalsKeepZero(0, -2).singleSteps,
        ];
      case TRITONE:
      {
        let ret = DEFAULT_TRITONE_RESOLUTION;

        if (this._filterFunction)
          ret = ret.filter(this._filterFunction);

        return ret;
      }
      case TRIAD_AUGMENTED:
        if (!this._filterFunction)
          return DEFAULT_AUGMENTED_RESOLUTION;

        return DEFAULT_AUGMENTED_RESOLUTION.filter(this._filterFunction);
      default: return [];
    }
  }

  private _getFixedIndexes(motions: SingleStep[][]): SingleStep[][] {
    const ret = [];

    for (const m of motions) {
      const retM = [];

      for (let i = 0; i < m.length; i++) {
        const sm = m[i];
        const newIndex = (<number[]> this._indexes)[sm.index];

        if (newIndex === undefined)
          throw new Error(`Invalid newIndex. indexes=${this._indexes} sm.index=${sm.index}`);

        retM.push(index(sm, newIndex));
      }

      ret.push(retM);
    }

    return ret;
  }

  generateSteps(): Step[] {
    if (!this._notes)
      throw new Error();

    if (!this._indexes)
      this._indexes = <Arrays.Number> this._notes.map((n, i) => i);

    const firstNote = this._notes[this._indexes[0]];
    const voicingInt = <Arrays.Number> this._indexes.map((indexx) => {
      const noteIndex = (<SPN[]> this._notes)[indexx];

      return noteIndex.valueOf() - firstNote.valueOf();
    } );
    const voicing = fromRootIntervals(...voicingInt);

    this._results = {
      voicing,
      possibilities: this._solveVoicing(voicing),
    };

    return this._results.possibilities;
  }

  // eslint-disable-next-line accessor-pairs
  get results(): IntervalResults | undefined {
    return this._results;
  }
}
