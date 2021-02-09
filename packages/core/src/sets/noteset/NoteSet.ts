import { ChromaticArray } from "../../chords";
import { Chromatic } from "../../pitches";
import { NoteSetStaticNames } from "./building/staticnames/NoteSetStaticNames";

export class NoteSet extends NoteSetStaticNames {
    private constructor(private _set: Set<Chromatic>) {
        super();
    }

    static from(...notes: ChromaticArray): NoteSet {
        const set = notes2Set(...notes);
        const setHash = set2HashCode(set);
        const cached = _cache.get(setHash);
        if (cached)
            return cached;

        const newNoteSet = new NoteSet(set);
        _cache.set(setHash, newNoteSet);
        return newNoteSet;
    }

    withShift(n: number): NoteSet {
        let array: ChromaticArray = this.array;
        array = <ChromaticArray>array.map((note: Chromatic) => note.withShift(n));

        return NoteSet.from(...array);
    }

    get array(): ChromaticArray {
        return <ChromaticArray>[...this._set];
    }

    has(note: Chromatic): boolean {
        return this._set.has(note);
    }
}

const _cache = new Map<number, NoteSet>();

function notes2Set(...notes: ChromaticArray): Set<Chromatic> {
    let set = new Set<Chromatic>();
    for (const n of notes)
        set.add(n);
    return set;
}

function set2HashCode(set: Set<Chromatic>): number {
    const hasC = set.has(Chromatic.C) ? 1 : 0;
    const hasCC = set.has(Chromatic.CC) ? 1 : 0;
    const hasD = set.has(Chromatic.D) ? 1 : 0;
    const hasDD = set.has(Chromatic.DD) ? 1 : 0;
    const hasE = set.has(Chromatic.E) ? 1 : 0;
    const hasF = set.has(Chromatic.F) ? 1 : 0;
    const hasFF = set.has(Chromatic.FF) ? 1 : 0;
    const hasG = set.has(Chromatic.G) ? 1 : 0;
    const hasGG = set.has(Chromatic.GG) ? 1 : 0;
    const hasA = set.has(Chromatic.A) ? 1 : 0;
    const hasAA = set.has(Chromatic.AA) ? 1 : 0;
    const hasB = set.has(Chromatic.B) ? 1 : 0;

    return hasC * 2
        + hasCC * 3
        + hasD * 5
        + hasDD * 7
        + hasE * 11
        + hasF * 13
        + hasFF * 17
        + hasG * 19
        + hasGG * 23
        + hasA * 29
        + hasAA * 31
        + hasB * 37;
}