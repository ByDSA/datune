import EventTest from "../../../temporal-node/spec/EventTest";
import LinearSequence from "../LinearSequence";

export default class LinearSequenceTest extends LinearSequence<EventTest> {
  constructor() {
    super( {
      startTime: 0,
      cellSize: 10,
    } );

    this.add( {
      event: new EventTest(),
      from: 1,
      to: 9,
    } );
  }
}
