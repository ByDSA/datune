import { TemporalNode } from "../temporal-node";

export type SequenceChangeListener<E> = (
  oldNode: TemporalNode<E>,
  newNode: TemporalNode<E>
  )=> void;

export type SequenceAddListener<E> = (node: TemporalNode<E>)=> void;

export type SequenceRemoveListener<E> = (node: TemporalNode<E>)=> void;
