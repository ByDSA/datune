import SimpleTime from "time/SimpleTime";
import EventTest from "../../../TemporalNode/spec/EventTest";
import ParallelSequence from "../ParallelSequence";

export default class ParalelSequenceTest extends ParallelSequence<EventTest, SimpleTime> {
  constructor() {
    super( {
      startTime: new SimpleTime(0),
      cellSize: new SimpleTime(10),
    } );
  }
}
