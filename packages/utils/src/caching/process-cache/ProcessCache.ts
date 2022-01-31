import AfterProcess from "./AfterProcess";
import Process from "./Process";

export default class ProcessCache<I, O> {
  private _map: Map<I, O>;

  private _process: Process<I, O>;

  private _afterProcess?: AfterProcess<I, O>;

  constructor(process: Process<I, O>, afterProcess?: AfterProcess<I, O>) {
    this._process = process;
    this._map = new Map<I, O>();
    this._afterProcess = afterProcess;
  }

  put(input: I, output: O): ProcessCache<I, O> {
    this._map.set(input, output);

    return this;
  }

  get(obj: I): O | undefined {
    return this._map.get(obj);
  }

  getOrProcess(obj: I, afterProcess?: AfterProcess<I, O>): O {
    let result = this.get(obj);

    if (result === undefined) {
      result = this._process(obj);
      this._map.set(obj, result);

      if (this._afterProcess)
        this._afterProcess(obj, result);

      if (afterProcess)
        afterProcess(obj, result);
    }

    return result;
  }

  clear() {
    this._map.clear();
  }

  serialize() {
    return [...this._map.entries()];
  }

  putAll(entries: [I, O][]) {
    entries.forEach(([key, value]) => this.put(key, value));
  }

  initialize(entries: [I, O][]) {
    this._map = new Map(entries);
  }
}
