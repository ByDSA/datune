import { Action } from "./Action";

// eslint-disable-next-line no-use-before-define
export class ActionManager<A extends Action<T>, T> {
  actions: A[];

  end: boolean;

  constructor() {
    this.end = false;
    this.actions = [];
  }

  addAndDo(action: A): void {
    this.actions.push(action);
    console.log(`Added action nº ${this.actions.length}`);

    this.doLast();
  }

  private doLast() {
    let done = false;

    do {
      const lastAction = this.actions[this.actions.length - 1];

      console.log(`Do action nº ${this.actions.length}`);
      done = lastAction.do();

      if (!done) {
        console.log(`Undo action nº ${this.actions.length}`);
        lastAction.undo();
        this.actions.splice(this.actions.indexOf(lastAction));
      }
    } while (!done && this.actions.length > 0);

    if (done)
      console.log(`Done action nº ${this.actions.length}`);

    if (this.actions.length === 0)
      throw new Error("Impossible!");
  }
}
