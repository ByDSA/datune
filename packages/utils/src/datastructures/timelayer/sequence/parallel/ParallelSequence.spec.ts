import { SimpleTime } from "../../../../time/SimpleTime";
import { TemporalNodeBuilder } from "../../temporalnode/building/TemporalNodeBuilder";
import { AlreadyAddedError, TemporalNode } from "../../temporalnode/TemporalNode";
import { ParallelSequence } from "./ParallelSequence";

class EventTest {
}

class ParalelSequenceTest extends ParallelSequence<EventTest, SimpleTime> {
    constructor() {
        super(new SimpleTime(0), new SimpleTime(10));
    }
}

function nodeCreator(from: SimpleTime, to: SimpleTime, ev: EventTest): TemporalNode<EventTest, SimpleTime> {
    return new TemporalNodeBuilder<EventTest, SimpleTime>()
        .from(from)
        .to(to)
        .event(ev)
        .create();
}

it(`initial state - nodes`, () => {
    const expected = 0;
    const seq = new ParalelSequenceTest();
    const actual = seq.nodes.length;

    expect(actual).toStrictEqual(expected);
});

it(`initial state - duration`, () => {
    const expected = new SimpleTime(0);
    const seq = new ParalelSequenceTest();
    const actual = seq.duration;

    expect(actual).toStrictEqual(expected);
});

it(`add event - node info`, () => {
    const seq = new ParalelSequenceTest();
    const ev = new EventTest();
    const node = seq.addEvent(ev);

    expect(node.from).toStrictEqual(new SimpleTime(0));
    expect(node.to).toStrictEqual(new SimpleTime(0));
    expect(node.event).toBe(ev);
});

it(`add event - length nodes`, () => {
    const expected = 2;
    const seq = new ParalelSequenceTest();
    seq.addEvent(new EventTest());
    seq.addEvent(new EventTest());
    const actual = seq.nodes.length;

    expect(actual).toBe(expected);
});

it(`add event - duration`, () => {
    const expected = new SimpleTime(2);
    const seq = new ParalelSequenceTest();
    seq.addEvent(new EventTest(), new SimpleTime(0), new SimpleTime(1));
    seq.addEvent(new EventTest(), seq.duration, seq.duration.withAdd(new SimpleTime(1)));
    const actual = seq.duration;

    expect(actual).toStrictEqual(expected);
});


it(`add node - node info`, () => {
    const seq = new ParalelSequenceTest();
    const ev = new EventTest();
    const node = new TemporalNodeBuilder<EventTest, SimpleTime>()
        .from(new SimpleTime(5))
        .to(new SimpleTime(10))
        .event(ev)
        .create();
    seq.addNode(node);

    expect(node.from).toStrictEqual(new SimpleTime(5));
    expect(node.to).toStrictEqual(new SimpleTime(10));
    expect(node.event).toBe(ev);
});

it(`add node - length nodes`, () => {
    const expected = 1;
    const seq = new ParalelSequenceTest();
    const ev = new EventTest();
    const node = new TemporalNodeBuilder<EventTest, SimpleTime>()
        .from(new SimpleTime(5))
        .to(new SimpleTime(10))
        .event(ev)
        .create();
    seq.addNode(node);
    const actual = seq.nodes.length;

    expect(actual).toBe(expected);
});

it(`remove - length nodes`, () => {
    const expected = 0;
    const seq = new ParalelSequenceTest();
    const ev = new EventTest();
    const node = seq.addEvent(ev);
    seq.removeNode(node);
    const actual = seq.nodes.length;

    expect(actual).toBe(expected);
});

it(`node.remove - length nodes`, () => {
    const expected = 0;
    const seq = new ParalelSequenceTest();
    const ev = new EventTest();
    const node = seq.addEvent(ev);
    node.remove();
    const actual = seq.nodes.length;

    expect(actual).toBe(expected);
});

it(`node.remove - timeLayer=null`, () => {
    const seq = new ParalelSequenceTest();
    const ev = new EventTest();
    const node = seq.addEvent(ev);
    node.remove();

    expect(node.timeLayer).toBeNull();
});

it(`node.timeLayer - node added at sequence`, () => {
    const seq = new ParalelSequenceTest();
    const ev = new EventTest();
    const node = seq.addEvent(ev);

    expect(node.timeLayer).toBe(seq);
});

it(`node.timeLayer - node not added yet`, () => {
    const node = new TemporalNodeBuilder()
        .event(new EventTest())
        .from(new SimpleTime(0))
        .to(new SimpleTime(3))
        .create();

    expect(node.timeLayer).toBeNull();
});

it(`node.remove - re-add in same time layer`, () => {
    const expected = 1;
    const seq = new ParalelSequenceTest();
    const ev = new EventTest();
    const node = seq.addEvent(ev);
    node.remove();
    seq.addNode(node);
    const actual = seq.nodes.length;

    expect(actual).toBe(expected);
});

it(`node.remove - re-add in different time layer`, () => {
    const expected = 1;
    const seq = new ParalelSequenceTest();
    const seq2 = new ParalelSequenceTest();
    const ev = new EventTest();
    const node = seq.addEvent(ev);
    node.remove();
    seq2.addNode(node);
    const actual = seq2.nodes.length;

    expect(actual).toBe(expected);
});

it(`node - re-add in different time layer`, () => {
    const expected = 1;
    const seq = new ParalelSequenceTest();
    const seq2 = new ParalelSequenceTest();
    const ev = new EventTest();
    const node = seq.addEvent(ev);
    expect(() => seq2.addNode(node)).toThrow(AlreadyAddedError);
});

it(`remove - returns old node`, () => {
    const seq = new ParalelSequenceTest();
    const ev = new EventTest();
    const expected = seq.addEvent(ev);
    const actual = seq.removeNode(expected);

    expect(actual).toBe(expected);
});

it(`onremove - removeNode`, () => {
    const expected = 1;
    let count = 0;
    const seq = new ParalelSequenceTest();
    const node = seq.addEvent(new EventTest());
    seq.onRemove(old => count++)
    seq.removeNode(node);

    expect(count).toBe(expected);
});

it(`onremove - clear`, () => {
    const expected = 2;
    let count = 0;
    const seq = new ParalelSequenceTest();
    seq.addEvent(new EventTest());
    seq.addEvent(new EventTest());
    seq.onRemove(old => count++);
    seq.clear();

    expect(count).toBe(expected);
});

it(`onremove - clear - cleared before call listeners`, () => {
    const expected = 0;
    let count = 0;
    const seq = new ParalelSequenceTest();
    seq.addEvent(new EventTest());
    seq.addEvent(new EventTest());
    seq.onRemove(old => count += seq.nodes.length);
    seq.clear();

    expect(count).toBe(expected);
});

it(`clear - length nodes`, () => {
    const expected = 0;
    const seq = new ParalelSequenceTest();
    const ev = new EventTest();
    seq.addEvent(ev);
    seq.clear();
    const actual = seq.nodes.length;

    expect(actual).toBe(expected);
});

it(`move node begin`, () => {
    const expectedFrom = new SimpleTime(3);
    const expectedTo = new SimpleTime(5);
    const seq = new ParalelSequenceTest();
    const oldNode = seq.addEvent(new EventTest());
    oldNode.to = expectedTo;
    const newNode = seq.moveNodeBeginTo(oldNode, new SimpleTime(3));
    const actualFrom = newNode.from;
    const actualTo = newNode.to;

    expect(actualFrom).toStrictEqual(expectedFrom);
    expect(actualTo).toBe(expectedTo);
});

it(`move node end`, () => {
    const expectedFrom = new SimpleTime(3);
    const expectedTo = new SimpleTime(5);
    const seq = new ParalelSequenceTest();
    const oldNode = seq.addEvent(new EventTest());
    oldNode.from = expectedFrom;
    const newNode = seq.moveNodeEndTo(oldNode, new SimpleTime(5));
    const actualFrom = newNode.from;
    const actualTo = newNode.to;

    expect(actualTo).toStrictEqual(expectedTo);
    expect(actualFrom).toBe(expectedFrom);
});

it(`onchange`, () => {
    const expected = 1;
    const seq = new ParalelSequenceTest();
    let actual = 0;
    seq.onChange((oldNode, newNode) => {
        actual++;
    });
    const node = seq.addEvent(new EventTest());
    seq.moveNodeBeginTo(node, new SimpleTime(3));

    expect(actual).toBe(expected);
});