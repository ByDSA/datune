import { Interval } from "intervals/chromatic";
import { Interval as RealInterval } from "intervals/real";

type Temperament = (interval: Interval)=> RealInterval;

export default Temperament;
