import { MusicalDuration, TimeSignature } from '@datune/core';
import { ChordSequence } from '../../sequences/chordsequence/ChordSequence';
import { ChordSequenceCalculator } from '../../sequences/ChordSequenceCalculator';
import { FuncSequence } from '../../sequences/functionssequence/FuncSequence';
import { KeySequence } from '../../sequences/keysequence/KeySequence';
import { MainFuncSequence } from '../../sequences/mainfuncseq/MainFuncSequence';
import { NotesSequence } from '../../sequences/notessequence/NotesSequence';
import { RhythmSequence } from '../../sequences/rhythmsequence/RhythmSequence';

export class TonalApproach {
    private _keySequence: KeySequence;
    private _keyChordSequence: KeySequence;
    private _mainFuncSequence: MainFuncSequence;
    private _funcSequence: FuncSequence;
    private _rhythmSequence: RhythmSequence;
    private _notesSequence: NotesSequence;
    private _chordSequence: ChordSequence;
    private _maxDuration: MusicalDuration;

    private constructor(initialTiemSignature: TimeSignature) {
        this._maxDuration = MusicalDuration.ZERO;
        this._mainFuncSequence = new MainFuncSequence();
        this._funcSequence = new FuncSequence();
        this._keyChordSequence = new KeySequence();
        this._keySequence = new KeySequence();
        this._notesSequence = new NotesSequence();
        this._chordSequence = new ChordSequence();
        this._rhythmSequence = new RhythmSequence();
        this._rhythmSequence.addEvent(initialTiemSignature, MusicalDuration.ZERO, MusicalDuration.WHOLE);
    }

    calculateChords() {
        let chordSequenceCalculator = new ChordSequenceCalculator(this._notesSequence, this._rhythmSequence);
        this._chordSequence = chordSequenceCalculator.calculate();
    }

    static create(initialTiemSignature: TimeSignature): TonalApproach {
        return new TonalApproach(initialTiemSignature);
    }

    set maxDuration(d: MusicalDuration) {
        this._maxDuration = d;
    }

    get maxDuration(): MusicalDuration {
        return this._maxDuration;
    }

    get notesSequence(): NotesSequence {
        return this._notesSequence;
    }

    get chordSequence(): ChordSequence {
        return this._chordSequence;
    }

    get keySequence(): KeySequence {
        return this._keySequence;
    }

    get keyChordSequence(): KeySequence {
        return this._keyChordSequence;
    }

    get funcSequence(): FuncSequence {
        return this._funcSequence;
    }

    get mainFuncSequence(): MainFuncSequence {
        return this._mainFuncSequence;
    }

    get rhythmSequence(): RhythmSequence {
        return this._rhythmSequence;
    }
}