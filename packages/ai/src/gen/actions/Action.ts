import Picker from "../Picker";

export default abstract class Action<T> {
  protected picker: Picker<T>;

  constructor(possibilities: T[]) {
    this.picker = new Picker<T>(possibilities);
  }

    abstract check(): boolean;

    abstract do(): boolean;

    abstract undo(): void;
}
