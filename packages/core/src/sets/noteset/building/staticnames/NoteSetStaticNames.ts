import { Chromatic } from "../../../../pitches";
import { NoteSet } from "../../NoteSet";

export class NoteSetStaticNames {
    static get C5() {
        if (!_C5)
            _C5 = NoteSet.from(Chromatic.C, Chromatic.G);

        return _C5;
    }

    static get CC5() {
        if (!_CC5)
            _CC5 = NoteSet.C5.withShift(1);

        return _CC5;
    }

    static get D5() {
        if (!_D5)
            _D5 = NoteSet.C5.withShift(2);

        return _D5;
    }

    static get DD5() {
        if (!_DD5)
            _DD5 = NoteSet.C5.withShift(3);

        return _DD5;
    }

    static get E5() {
        if (!_E5)
            _E5 = NoteSet.C5.withShift(4);

        return _E5;
    }

    static get F5() {
        if (!_F5)
            _F5 = NoteSet.C5.withShift(5);

        return _F5;
    }

    static get FF5() {
        if (!_FF5)
            _FF5 = NoteSet.C5.withShift(6);

        return _FF5;
    }

    static get G5() {
        if (!_G5)
            _G5 = NoteSet.C5.withShift(7);

        return _G5;
    }

    static get GG5() {
        if (!_GG5)
            _GG5 = NoteSet.C5.withShift(8);

        return _GG5;
    }

    static get A5() {
        if (!_A5)
            _A5 = NoteSet.C5.withShift(9);

        return _A5;
    }

    static get AA5() {
        if (!_AA5)
            _AA5 = NoteSet.C5.withShift(10);

        return _AA5;
    }

    static get B5() {
        if (!_B5)
            _B5 = NoteSet.C5.withShift(11);

        return _B5;
    }
}

let _C5: NoteSet, _CC5: NoteSet, _D5: NoteSet, _DD5: NoteSet, _E5: NoteSet, _F5: NoteSet, _FF5: NoteSet, _G5: NoteSet, _GG5: NoteSet, _A5: NoteSet, _AA5: NoteSet, _B5: NoteSet;