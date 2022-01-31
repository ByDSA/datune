import EventTest from "../../../temporal-node/spec/EventTest";
import ParallelSequence from "../ParallelSequence";

export default class ParalelSequenceTest extends ParallelSequence<EventTest> {
  constructor() {
    super( {
      startTime: 0,
      cellSize: 10,
    } );
  }
}
