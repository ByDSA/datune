import * as init from "@datune/core/initializer";
import { SPN } from "@datune/core/pitches/symbolic/SPN";
import { MusicalDuration } from "@datune/core/tempo/MusicalDuration";
import { NoteEvent } from "../events/NoteEvent";
import { NotesSequence } from "./NotesSequence";
init.musicalDurations.default();
init.spns.default();

function testNote(): NoteEvent {
    return NoteEvent.from(SPN.C4, MusicalDuration.QUARTER);
}

it("onAddListener - adding - listener is calling", () => {
    const timeSequence = new NotesSequence();
    let size = 0;
    timeSequence.addOnAddListener(n => {
        size++;
    })
    timeSequence.addEventAtEnd(testNote());
    expect(size).toBe(1);
})

it("onAddListener - adding - parameters of listener are correct", () => {
    const timeSequence = new NotesSequence();
    expect.assertions(4);
    const note = testNote();
    timeSequence.addOnAddListener(n => {
        expect(n.event.pitch).toEqual(SPN.C4);
        expect(n.from).toEqual(MusicalDuration.ZERO);
        expect(n.to).toEqual(MusicalDuration.QUARTER);
        expect(n.event).toEqual(note);
    })
    timeSequence.addEventAtEnd(note);
})

it("onAddListener - removing - listener is calling", () => {
    const timeSequence = new NotesSequence();
    let v = 0;
    timeSequence.addOnRemoveListener(n => {
        v++;
    })
    timeSequence.addEventAtEnd(testNote());
    timeSequence.addEventAtEnd(testNote());
    timeSequence.removeNodesAt(MusicalDuration.ZERO);
    expect(v).toBe(1);
})

it("onAddListener - removing - parameters of listener are correct", () => {
    const timeSequence = new NotesSequence();
    expect.assertions(4);
    const note = testNote();
    timeSequence.addOnRemoveListener(n => {
        expect(n.event.pitch).toEqual(SPN.C4);
        expect(n.from).toEqual(MusicalDuration.ZERO);
        expect(n.to).toEqual(MusicalDuration.QUARTER);
        expect(n.event).toEqual(note);
    })
    timeSequence.addEventAtEnd(note);
    timeSequence.addEventAtEnd(note);
    timeSequence.removeNodesAt(MusicalDuration.ZERO);
})

it("onChangeListener - adding - listener is not calling", () => {
    const timeSequence = new NotesSequence();
    let size = 0;
    timeSequence.addOnChangeListener(n => {
        size++;
    })
    timeSequence.addEventAtEnd(testNote());
    expect(size).toBe(0);
})

it("onChangeListener - moving - listener is calling", () => {
    const timeSequence = new NotesSequence();
    let size = 0;
    timeSequence.addOnChangeListener((oldNode, newNode) => {
        size++;
    })
    timeSequence.addEventAtEnd(testNote());
    const node = timeSequence.nodes[0];
    timeSequence.moveNodeTo(node, MusicalDuration.WHOLE);
    expect(size).toBe(1);
})

it("onChangeListener - moving - parameters of listener are correct", () => {
    const timeSequence = new NotesSequence();
    const note = testNote();
    expect.assertions(6);
    timeSequence.addOnChangeListener((oldNode, newNode) => {
        expect(oldNode).not.toEqual(newNode);
        expect(oldNode.event).toEqual(newNode.event);
        expect(oldNode.from).toEqual(MusicalDuration.ZERO);
        expect(newNode.from).toEqual(MusicalDuration.WHOLE);
        expect(newNode.to).toEqual(MusicalDuration.WHOLE.withAdd(MusicalDuration.QUARTER));
        expect(oldNode.to).toEqual(MusicalDuration.QUARTER);
    });
    timeSequence.addEventAtEnd(note);
    const node = timeSequence.nodes[0];
    timeSequence.moveNodeTo(node, MusicalDuration.WHOLE);
})