// Priority Queue mínima sobre valores numéricos
class MinHeap<T> {
  private heap: Array<{ item: T;
priority: number; }> = [];

  insert(item: T, priority: number) {
    this.heap.push( {
      item,
      priority,
    } );
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin(): { item: T;
priority: number; } | undefined {
    if (this.heap.length === 0)
      return undefined;

    const min = this.heap[0];
    const end = this.heap.pop()!;

    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }

    return min;
  }

  private bubbleUp(idx: number) {
    const element = this.heap[idx];

    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);

      if (this.heap[parentIdx].priority <= element.priority)
        break;

      this.heap[idx] = this.heap[parentIdx];
      idx = parentIdx;
    }

    this.heap[idx] = element;
  }

  private sinkDown(idx: number) {
    const { length } = this.heap;
    const element = this.heap[idx];

    while (true) {
      let leftIdx = (2 * idx) + 1;
      let rightIdx = (2 * idx) + 2;
      let swap: number | null = null;

      if (leftIdx < length) {
        if (this.heap[leftIdx].priority < element.priority)
          swap = leftIdx;
      }

      if (rightIdx < length) {
        if (
          (swap === null && this.heap[rightIdx].priority < element.priority)
          || (swap !== null && this.heap[rightIdx].priority < this.heap[leftIdx].priority)
        )
          swap = rightIdx;
      }

      if (swap === null)
        break;

      this.heap[idx] = this.heap[swap];
      idx = swap;
    }

    this.heap[idx] = element;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }
}

// Función genérica de búsqueda de distancia mínima
type Props<T> = {
  start: T;
  getNeighbors: (node: T)=> Array<{ node: T;
distance: number; }>;
  isTarget: (node: T)=> boolean;
  getKey: (node: T)=> string;
  maxDistance?: number;
};
type PathNode<T> = {
  item: T;
  accDistance: number;
};
interface Result<T> {
  found: PathNode<T>;
  path: PathNode<T>[];
}
type Ret<T> = {
  results: Result<T>[];
  minFoundDistance: number;
  meta: {
    allNodes: readonly T[];
  };
};
type AddProps = {
  key: string;
};

class NodesSet<T> {
  #nodes: T[] = [];

  private nodesMap = new Map<string, T>();

  #getKey: (node: T)=> string;

  #minDistances = new Map<string, number>(); // clave → distancia mínima conocida

  constructor(getKey: (node: T)=> string) {
    this.#getKey = getKey;
  }

  // Intenta agregar el nodo, solo lo añade si no existe ya.
  // Retorna true si se agregó, false si ya existía.
  add(node: T, dist: number, props?: AddProps): boolean {
    const key = props?.key ?? this.#getKey(node);

    if (!this.nodesMap.has(key)) {
      this.nodesMap.set(key, node);
      this.#nodes.push(node);
    }

    const oldDist = this.#minDistances.get(key);

    if (oldDist === undefined || dist < oldDist)
      this.#minDistances.set(key, dist);

    return true;
  }

  getByKey(key: string): T | null {
    return this.nodesMap.get(key) ?? null;
  }

  // Devuelve true si el nodo ya fue agregado.
  has(node: T): boolean {
    return this.hasKeyNode(this.#getKey(node));
  }

  hasKeyNode(key: string): boolean {
    return this.nodesMap.has(key);
  }

  getMinDistance(node: T): number | null {
    const key = this.#getKey(node);

    if (!this.nodesMap.has(key))
      return null;

    return this.#minDistances.get(key) ?? null;
  }

  // Retorna todos los nodos visitados.
  getAll(): readonly T[] {
    return [...this.#nodes];
  }
}
export function findManyByDistance<T>(
  { getKey, getNeighbors, isTarget, start, maxDistance }: Props<T>,
): Ret<T> {
  const visitedNodes: NodesSet<T> = new NodesSet<T>(getKey);
  const pq = new MinHeap<T>();
  const prevNode = new Map<T, PathNode<T>>();

  pq.insert(start, 0);

  let minFoundDistance: number | null = null;
  const found: PathNode<T>[] = [];

  while (!pq.isEmpty()) {
    const { item: current, priority: dist } = pq.extractMin()!;

    if (visitedNodes.has(current))
      continue; // Evitar revisitar nodos

    // Si ya hemos encontrado un target y la distancia actual excede:
    if (
      (maxDistance === undefined && minFoundDistance !== null && dist > minFoundDistance)
       || (maxDistance !== undefined && dist > maxDistance))
      break;

    // Comprobación de parada
    if (isTarget(current)) {
      if (minFoundDistance === null)
        minFoundDistance = dist;

      // recogemos todos los targets a la misma distancia mínima
      found.push( {
        item: current,
        accDistance: dist,
      } );
      continue;
    }

    visitedNodes.add(current, dist);

    // Generamos vecinos
    const neighbors = getNeighbors(current);

    for (const { node: neighbor, distance: w } of neighbors) {
      prevNode.set(neighbor, {
        item: current,
        accDistance: dist,
      } );
      const newDist = dist + w;

      pq.insert(neighbor, newDist);
    }
  }

  function buildPath(node: PathNode<T>): PathNode<T>[] {
    const path: PathNode<T>[] = [];
    let current: PathNode<T> | undefined = node;

    do {
      path.unshift(current);
      current = prevNode.get(current.item);
    } while (current !== undefined);

    return path;
  }

  const results: Result<T>[] = found.map(f => {
    return {
      found: f,
      path: buildPath(f),
    } as Result<T>;
  } );

  return {
    results,
    minFoundDistance: minFoundDistance === null ? Infinity : minFoundDistance,
    meta: {
      allNodes: visitedNodes.getAll(),
    },
  };
}
