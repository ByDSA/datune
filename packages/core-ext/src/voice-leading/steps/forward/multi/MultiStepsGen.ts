import { Interval as ChromaticInterval } from "@datune/core/intervals/chromatic";
import { PitchArray as ChromaticArray } from "@datune/core/pitches/chromatic";
import { SPNArray } from "@datune/core/spns/chromatic";
import { NearStepsGen } from "../../generators/others/near/NearStepsGenerator";
import { RestingNotesStepsGen } from "../../generators/resolution";
import { FilterStepFunction } from "../../generators/StepsGenerator";
import { StepReason } from "../../reason/StepReason";
import { StepType } from "../../reason/StepType";
import { StepOrNull } from "../../Step";
import { MultiStepsGenInitializer } from "./MultiStepsGenInitializer";
import { checkAndFixInputSPN, MultiStepsGenResult } from "./Utils";

export type RequireFunction = (reason: StepReason, steps?: StepOrNull[])=> boolean;

export class MultiStepsGen {
  #initializer: MultiStepsGenInitializer;

  private constructor() {
    this.#initializer = new MultiStepsGenInitializer();
  }

  static create(): MultiStepsGen {
    return new MultiStepsGen();
  }

  notes(...notes: SPNArray): MultiStepsGen {
    checkAndFixInputSPN(notes);

    this.#initializer.notes = notes;

    return this;
  }

  disableResolutions(): MultiStepsGen {
    this.#initializer.doResolutions = false;

    return this;
  }

  enableNear(): MultiStepsGen {
    this.#initializer.nearStepsGen = NearStepsGen.create();

    return this;
  }

  maxStep(maxStep: ChromaticInterval): MultiStepsGen {
    this.#initializer.maxStep = maxStep;

    return this;
  }

  filter(f: FilterStepFunction): MultiStepsGen {
    this.#initializer.filterFunction = f;

    return this;
  }

  restingNotes(...notes: ChromaticArray): MultiStepsGen {
    if (notes && notes.length > 0) {
      this.#initializer.restingNotesStepsGen = RestingNotesStepsGen.create()
        .restingNotes(...notes);
    }

    return this;
  }

  addRequireFunction(f: RequireFunction): MultiStepsGen {
    if (!this.#initializer.requireFunctions)
      this.#initializer.requireFunctions = [];

    this.#initializer.requireFunctions.push(f);

    return this;
  }

  requireVoicingResolution(): MultiStepsGen {
    this.addRequireFunction((r) => {
      switch (r.type) {
        case StepType.RESOLUTION_PATTERN:
        case StepType.RESOLUTION_INTERVAL:
          return true;
        default:
          return false;
      }
    } );

    return this;
  }

  requireKeyResolution(): MultiStepsGen {
    this.addRequireFunction((r) => {
      switch (r.type) {
        case StepType.RESOLUTION_KEY:
          return true;
        default:
          return false;
      }
    } );

    return this;
  }

  toString() {
    if (!this.#initializer.notes)
      return null;

    return this.#initializer.notes.map((n, i) => (i === 0 ? n.toString() : `, ${n.toString()}`)).reduce((acc, current) => acc + current);
  }

  initializeCombiner(): MultiStepsGenResult {
    return this.#initializer.initialize();
  }
}
