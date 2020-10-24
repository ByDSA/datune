import { Degree } from '../degrees/Degree';
import { RelativePitch } from './RelativePitch';
import { Voicing } from './Voicing';

export abstract class VoicingGenerator<D extends Degree> {
    static CLOSED: VoicingGenerator<Degree> = new (class V<D extends Degree> extends VoicingGenerator<D> {
        process(): Voicing<D> {
            this.sort();
            this.removeDuplicates();

            let ret: Voicing<D> = [];
            let previous: Degree = null;
            let octave: number = 0;
            for (let current of this.degrees) {
                if (previous != null && current < previous)
                    octave++;

                let relativeVoice: RelativePitch<D> = RelativePitch.from(current, octave);
                ret.push(relativeVoice);

                previous = current;
            }
            return ret;
        }
    });

    static CLOSED_UNSORTED: VoicingGenerator<Degree> = new (class V<D extends Degree> extends VoicingGenerator<D> {
        process(): Voicing<D> {
            this.removeDuplicates();

            let ret: Voicing<D> = [];
            let previous: Degree = null;
            let octave: number = 0;
            for (let current of this.degrees) {
                if (previous != null && current < previous)
                    octave++;

                let relativeVoice: RelativePitch<D> = RelativePitch.from(current, octave);
                ret.push(relativeVoice);

                previous = current;
            }
            return ret;
        }
    });

    private degrees: D[];

    make(degrees: D[]): Voicing<D> {
        this.degrees = degrees;
        return this.process();
    }

    abstract process(): Voicing<D>;

    protected sort(): void {
        this.degrees.sort(function (a: D, b: D) { return a.valueOf() - b.valueOf() });
    }

    protected removeDuplicates(): void {
        this.degrees = this.degrees.filter((element, index, array) => array.indexOf(element) === index);
    }
}
