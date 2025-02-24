/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-use-before-define */

import { Arrays } from "@datune/utils";
import OctavePitch from "pitches/OctavePitch";
import RelativePitch from "./¿¿/RelativePitch";
import Voicing from "./¿¿/Voicing";

type NonEmptyArray<T> = Arrays.NonEmpty<T>;
export default abstract class VoicingGenerator<D extends OctavePitch> {
  static CLOSED: VoicingGenerator<OctavePitch> = new (
    class V<D extends OctavePitch> extends VoicingGenerator<D> {
      apply(...degrees: NonEmptyArray<D>): Voicing<D> {
        degrees = removeDuplicates(degrees);
        degrees = sort(degrees);

        const ret: Voicing<D> = [];
        let previous: OctavePitch | null = null;
        let octave: number = 0;

        for (const current of degrees) {
          if (previous !== null && current < previous)
            octave++;

          const relativeVoice: RelativePitch<D> = RelativePitch.from(current, octave);

          ret.push(relativeVoice);

          previous = current;
        }

        return ret;
      }
    } )();

  static CLOSED_UNSORTED: VoicingGenerator<OctavePitch> = new (
    class V<D extends OctavePitch> extends VoicingGenerator<D> {
      apply(...degrees: NonEmptyArray<D>): Voicing<D> {
        degrees = removeDuplicates(degrees);

        const ret: Voicing<D> = [];
        let previous: OctavePitch | null = null;
        let octave: number = 0;

        for (const current of degrees) {
          if (previous !== null && current < previous)
            octave++;

          const relativeVoice: RelativePitch<D> = RelativePitch.from(current, octave);

          ret.push(relativeVoice);

          previous = current;
        }

        return ret;
      }
    } )();

    abstract apply(...degrees: NonEmptyArray<D>): Voicing<D>;
}

export function sort<T extends object>(degrees: NonEmptyArray<T>): NonEmptyArray<T> {
  return degrees.sort((a: T, b: T) => +a.valueOf() - +b.valueOf());
}

export function removeDuplicates<T>(degrees: NonEmptyArray<T>): NonEmptyArray<T> {
  return <NonEmptyArray<T>>degrees.filter(
    (element, index, array) => array.indexOf(element) === index,
  );
}
