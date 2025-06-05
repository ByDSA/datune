/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-use-before-define */
import type { Voicing } from "./Voicing";
import { NonEmptyArray } from "datils";
import { OctavePitch } from "pitches/OctavePitch";
import { RelativePitch } from "./RelativePitch";

export abstract class VoicingGenerator<I, D extends OctavePitch<I>> {
  static CLOSED: VoicingGenerator<any, OctavePitch<any>> = new (
    class V<I, D extends OctavePitch<I>> extends VoicingGenerator<I, D> {
      apply(...degrees: NonEmptyArray<D>): Voicing<I, D> {
        degrees = removeDuplicates(degrees);
        degrees = sort(degrees);

        const ret: Voicing<I, D> = [];
        let previous: OctavePitch<I> | null = null;
        let octave: number = 0;

        for (const current of degrees) {
          if (previous !== null && current < previous)
            octave++;

          const relativeVoice: RelativePitch<I, D> = RelativePitch.from(current, octave);

          ret.push(relativeVoice);

          previous = current;
        }

        return ret;
      }
    } )();

  static CLOSED_UNSORTED: VoicingGenerator<any, OctavePitch<any>> = new (
    class V<I, D extends OctavePitch<I>> extends VoicingGenerator<I, D> {
      apply(...degrees: NonEmptyArray<D>): Voicing<I, D> {
        degrees = removeDuplicates(degrees);

        const ret: Voicing<I, D> = [];
        let previous: OctavePitch<I> | null = null;
        let octave: number = 0;

        for (const current of degrees) {
          if (previous !== null && current < previous)
            octave++;

          const relativeVoice: RelativePitch<I, D> = RelativePitch.from(current, octave);

          ret.push(relativeVoice);

          previous = current;
        }

        return ret;
      }
    } )();

    abstract apply(...degrees: NonEmptyArray<D>): Voicing<I, D>;
}

export function sort<T extends object>(degrees: NonEmptyArray<T>): NonEmptyArray<T> {
  return degrees.sort((a: T, b: T) => +a.valueOf() - +b.valueOf());
}

export function removeDuplicates<T>(degrees: NonEmptyArray<T>): NonEmptyArray<T> {
  return <NonEmptyArray<T>>degrees.filter(
    (element, index, array) => array.indexOf(element) === index,
  );
}
