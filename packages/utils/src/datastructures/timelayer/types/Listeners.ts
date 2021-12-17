import { ImmutableTime } from "index";
import TemporalNode from "../TemporalNode";

export type SequenceChangeListener<E, T extends ImmutableTime> = (
  oldNode: TemporalNode<E, T>,
  newNode: TemporalNode<E, T>
  )=> void;

export type SequenceAddListener<E, T extends ImmutableTime> = (node: TemporalNode<E, T>)=> void;

export type SequenceRemoveListener<E, T extends ImmutableTime> = (node: TemporalNode<E, T>)=> void;
