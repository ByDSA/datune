import { Funcs as F, Degrees as D, IntervalSets as IS, Intervals as I, Degree } from "@datune/core/alt";
import { DegreeFunc } from "@datune/core/functions/alt/degree-function/DegreeFunc";

// movimientos simples hardcodeados
const parallelMap: Map<DegreeFunc, DegreeFunc> = new Map([
  [F.I, F.Im],
  [F.Im, F.I],
  [F.bII, F.bIIm],
  [F.bIIm, F.bII],
  [F.II, F.IIm],
  [F.IIm, F.II],
  [F.bIII, F.bIIIm],
  [F.bIIIm, F.bIII],
  [F.III, F.IIIm],
  [F.IIIm, F.III],
  [F.IV, F.IVm],
  [F.IVm, F.IV],
  [F.bV, F.bVm],
  [F.bVm, F.bV],
  [F.V, F.Vm],
  [F.Vm, F.V],
  [F.bVI, F.bVIm],
  [F.bVIm, F.bVI],
  [F.VI, F.VIm],
  [F.VIm, F.VI],
  [F.bVII, F.bVIIm],
  [F.bVIIm, F.bVII],
  [F.VII, F.VIIm],
  [F.VIIm, F.VII],
]);
const circleRightMap: Map<DegreeFunc, DegreeFunc> = new Map([
  [F.I, F.V],
  [F.Im, F.Vm],
  [F.bII, F.bVI],
  [F.bIIm, F.bVIm],
  [F.II, F.VI],
  [F.IIm, F.VIm],
  [F.bIII, F.bVII],
  [F.bIIIm, F.bVIIm],
  [F.III, F.VII],
  [F.IIIm, F.VIIm],
  [F.IV, F.I],
  [F.IVm, F.Im],
  [F.bV, F.bII],
  [F.bVm, F.bIIm],
  [F.V, F.II],
  [F.Vm, F.IIm],
  [F.bVI, F.bIII],
  [F.bVIm, F.bIIIm],
  [F.VI, F.III],
  [F.VIm, F.IIIm],
  [F.bVII, F.IV],
  [F.bVIIm, F.IVm],
]);
// Reverse of circleRightMap
const circleLeftMap: Map<DegreeFunc, DegreeFunc> = new Map(
  Array.from(circleRightMap.entries()).map(([key, value]) => [value, key]),
);
const relativeMap: Map<DegreeFunc, DegreeFunc> = new Map([
  [F.I, F.VIm],
  [F.VIm, F.I],
  [F.Im, F.bIII],
  [F.bIII, F.Im],
]);

function getCircleRight(func: DegreeFunc): DegreeFunc {
  let ret = circleRightMap.get(func);

  if (ret === undefined) {
    const degree: Degree = I.shift(func.baseDegree, I.P5).toDegree();

    ret = F.fromDegreeIntervalSet(degree, func.intervalSet);
  }

  return ret;
}
function getCircleLeft(func: DegreeFunc): DegreeFunc {
  let ret = circleLeftMap.get(func);

  if (ret === undefined) {
    const degree: Degree = I.shiftDown(func.baseDegree, I.P5).toDegree();

    ret = func.withBaseDegree(degree);
  }

  return ret;
}

function getRelative(func: DegreeFunc): DegreeFunc {
  let ret = relativeMap.get(func);

  if (ret === undefined) {
    const { intervalSet } = func;

    if (intervalSet === IS.TRIAD_MAJOR) {
      const baseDegree: Degree = I.shiftDown(func.baseDegree, I.m3).toDegree();

      ret = F.fromDegreeIntervalSet(baseDegree, IS.TRIAD_MINOR);
    } else if (intervalSet === IS.TRIAD_MINOR) {
      const baseDegree: Degree = I.shift(func.baseDegree, I.m3).toDegree();

      ret = F.fromDegreeIntervalSet(baseDegree, IS.TRIAD_MAJOR);
    }

    if (ret === undefined)
      throw new Error(`No relative for ${func}.`);
  }

  return ret;
}

function getParallel(func: DegreeFunc): DegreeFunc {
  let ret = parallelMap.get(func);

  if (ret === undefined) {
    const { intervalSet } = func;

    if (intervalSet === IS.TRIAD_MAJOR)
      ret = func.withIntervalSet(IS.TRIAD_MINOR);
    else if (intervalSet === IS.TRIAD_MINOR)
      ret = func.withIntervalSet(IS.TRIAD_MAJOR);

    if (ret === undefined)
      throw new Error(`No parallel for ${func}.`);
  }

  return ret;
}

const allNeighborsMap = new Map<DegreeFunc, DegreeFunc[]>();

export function getAllNeighbors(f: DegreeFunc): DegreeFunc[] {
  const fReseted = F.fromDegreeIntervalSet(D.I, f.intervalSet);
  let retRelativeToI = allNeighborsMap.get(fReseted);

  if (retRelativeToI === undefined) {
    const rel = getRelative(fReseted);
    const par = getParallel(fReseted);
    const simples = [
      rel,
      par,
      getCircleRight(fReseted),
      getCircleLeft(fReseted),
    ];
    const composites = [
      getCircleRight(rel), // relative + circleRight
      getCircleLeft(rel), // relative + circleLeft
      // Se han quitado las operaciones parallel + circle, porque el
      // resultado no está en la pivot region para Major o Minor
    ];

    retRelativeToI = [...simples, ...composites];
  }

  const interval = f.baseDegree;
  const ret = retRelativeToI.map(rf=> {
    const degree = I.shift(rf.baseDegree, interval).toDegree();

    return rf.withBaseDegree(degree);
  } );

  return ret;
}

type Props = {
  start: DegreeFunc;
  goal: DegreeFunc;
};
export function findAllShortestPaths(
  { goal, start }: Props,
): DegreeFunc[][] {
  if (start === goal)
    return [[start]];

  // Cola de BFS: cada elemento lleva su path y la profundidad (depth)
  const queue: { path: DegreeFunc[];
depth: number; }[] = [
  {
    path: [start],
    depth: 0,
  },
];
  // Guardamos el depth mínimo en que visitamos cada nodo
  const visitedDepth = new Map<DegreeFunc, number>();

  visitedDepth.set(start, 0);

  let foundDepth: number | null = null;
  const results: DegreeFunc[][] = [];

  while (queue.length) {
    const { path, depth } = queue.shift()!;

    // Si ya encontramos el goal en un nivel D y
    // estamos procesando depth > D, salimos del loop
    if (foundDepth !== null && depth > foundDepth)
      break;

    const last = path[path.length - 1];
    const nextDepth = depth + 1;

    for (const v of getAllNeighbors(last)) {
      // 1) evitamos ciclos
      if (path.includes(v))
        continue;

      // 2) si ya hallamos goal en nivel D, no generamos nada a depth > D
      if (foundDepth !== null && nextDepth > foundDepth)
        continue;

      const prev = visitedDepth.get(v);

      // 3) solo expandimos v si nunca lo vimos, o lo vimos a la misma distancia
      if (prev !== undefined && prev < nextDepth)
        continue;

      // actualizamos distancia mínima conocida de v
      visitedDepth.set(v, nextDepth);

      const newPath = [...path, v];

      if (v === goal) {
        // hallamos un camino mínimo de longitud nextDepth
        foundDepth = nextDepth;
        results.push(newPath);
      } else {
        // seguimos explorando en siguientes niveles
        queue.push( {
          path: newPath,
          depth: nextDepth,
        } );
      }
    }
  }

  return results;
}
