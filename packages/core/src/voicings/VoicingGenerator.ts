import { NonEmptyArray } from "@datune/utils";
import { SymbolicDegree } from "../pitches";
import { RelativePitch } from "./¿¿/RelativePitch";
import { Voicing } from "./¿¿/Voicing";

export abstract class VoicingGenerator<D extends SymbolicDegree> {
    static CLOSED: VoicingGenerator<SymbolicDegree> = new (class V<D extends SymbolicDegree> extends VoicingGenerator<D> {
        apply(...degrees: NonEmptyArray<D>): Voicing<D> {
            degrees = removeDuplicates(degrees);
            degrees = sort(degrees);

            let ret: Voicing<D> = [];
            let previous: SymbolicDegree | null = null;
            let octave: number = 0;
            for (let current of degrees) {
                if (previous != null && current < previous)
                    octave++;

                let relativeVoice: RelativePitch<D> = RelativePitch.from(current, octave);
                ret.push(relativeVoice);

                previous = current;
            }
            return ret;
        }
    });

    static CLOSED_UNSORTED: VoicingGenerator<SymbolicDegree> = new (class V<D extends SymbolicDegree> extends VoicingGenerator<D> {
        apply(...degrees: NonEmptyArray<D>): Voicing<D> {
            degrees = removeDuplicates(degrees);

            let ret: Voicing<D> = [];
            let previous: SymbolicDegree | null = null;
            let octave: number = 0;
            for (let current of degrees) {
                if (previous != null && current < previous)
                    octave++;

                let relativeVoice: RelativePitch<D> = RelativePitch.from(current, octave);
                ret.push(relativeVoice);

                previous = current;
            }
            return ret;
        }
    });

    abstract apply(...degrees: NonEmptyArray<D>): Voicing<D>;
}

export function sort<T extends Object>(degrees: NonEmptyArray<T>): NonEmptyArray<T> {
    return degrees.sort((a: T, b: T) => +a.valueOf() - +b.valueOf());
}

export function removeDuplicates<T>(degrees: NonEmptyArray<T>): NonEmptyArray<T> {
    return <NonEmptyArray<T>>degrees.filter((element, index, array) => array.indexOf(element) === index);
}