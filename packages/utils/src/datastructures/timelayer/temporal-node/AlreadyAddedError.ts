export default class AlreadyAddedError extends Error {
  constructor() {
    super("Node already added in another time layer.");
  }
}
