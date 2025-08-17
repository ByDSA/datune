import { DissonanceResult, findExtrema } from "./utils/utils";

// Definición de intervalos base con sus valores en cents
const INTERVALS_BASE = [
  {
    name: "P1",
    cents: 0,
  },
  {
    name: "m2",
    cents: 100,
  },
  {
    name: "M2",
    cents: 200,
  },
  {
    name: "m3",
    cents: 300,
  },
  {
    name: "M3",
    cents: 400,
  },
  {
    name: "P4",
    cents: 500,
  },
  {
    name: "d5",
    cents: 600,
  },
  {
    name: "P5",
    cents: 700,
  },
  {
    name: "m6",
    cents: 800,
  },
  {
    name: "M6",
    cents: 900,
  },
  {
    name: "m7",
    cents: 1000,
  },
  {
    name: "M7",
    cents: 1100,
  },
  {
    name: "P8",
    cents: 1200,
  },
];

function getIntervalName(cents: number): string {
  // Normalizar a una octava (0-1200 cents)
  const normalizedCents = cents % 1200;
  // Buscar el intervalo más cercano
  let closestInterval = INTERVALS_BASE[0];
  let minDifference = Math.abs(normalizedCents - closestInterval.cents);

  for (const interval of INTERVALS_BASE) {
    const difference = Math.abs(normalizedCents - interval.cents);

    if (difference < minDifference) {
      minDifference = difference;
      closestInterval = interval;
    }
  }

  // Si la diferencia es mayor a 25 cents, expresar como microtonal
  if (minDifference > 25) {
    // Encontrar el intervalo base más cercano
    const deviation = normalizedCents - closestInterval.cents;
    // Redondear a cuartos de tono (25 cents)
    const quartersDeviation = Math.round(deviation / 25) % 4;

    if (quartersDeviation === 0)
      return closestInterval.name;

    // Convertir cuartos de tono a fracciones
    const sign = quartersDeviation > 0 ? "+" : "-";
    let fractionStr = "";

    if (Math.abs(quartersDeviation) === 1)
      fractionStr = "25¢";
    else if (Math.abs(quartersDeviation) === 2)
      fractionStr = "50¢";
    else if (Math.abs(quartersDeviation) === 3)
      fractionStr = "75¢";

    return `${closestInterval.name} ${sign}${fractionStr}`;
  }

  // Si está dentro de 25 cents, usar el nombre estándar
  return closestInterval.name;
}

interface TaggedDissonanceResult extends DissonanceResult {
  tag?: string;
}

interface TableColumn {
  header: string;
  getValue: (result: DissonanceResult)=> string;
  align: "left" | "right";
}

function createTableBase(
  results: TaggedDissonanceResult[],
  columns: TableColumn[],
  title: string,
): string {
  if (results.length === 0)
    throw new Error("No results");

  if (results.length > 100)
    return "Too many results: " + results.length;

  // Calcular el ancho máximo de cada columna
  const columnWidths = columns.map(col => {
    const headerWidth = col.header.length;
    const contentWidth = Math.max(...results.map(r => col.getValue(r).length));

    return Math.max(headerWidth, contentWidth);
  } );
  // Crear encabezados
  const headerRow = "| " + columns.map((col, i) => col.align === "left"
    ? col.header.padEnd(columnWidths[i])
    : col.header.padStart(columnWidths[i])).join(" | ") + " |";
  const separator = "|" + columnWidths.map(width => "-".repeat(width + 2)).join("|") + "|";
  // Crear filas
  const rows = results.map(result => {
    const cells = columns.map((col, i) => {
      const value = col.getValue(result);

      return col.align === "left"
        ? value.padEnd(columnWidths[i])
        : value.padStart(columnWidths[i]);
    } );

    return "| " + cells.join(" | ") + " |";
  } );

  return `\n## ${title}\n\n${headerRow}\n${separator}\n${rows.join("\n")}\n`;
}

function formatPeakTable(results: TaggedDissonanceResult[], title: string): string {
  const columns: TableColumn[] = [
    {
      header: "Tag",
      getValue: (r) => (r as TaggedDissonanceResult).tag || "",
      align: "left",
    },
    {
      header: "Name",
      getValue: (r) => getIntervalName(ratioToCents(r.frequencyRatio)),
      align: "left",
    },
    {
      header: "Cents",
      getValue: (r) => (ratioToCents(r.frequencyRatio)).toFixed(1),
      align: "right",
    },
    {
      header: "Ratio",
      getValue: (r) => r.frequencyRatio.toFixed(3),
      align: "right",
    },
    {
      header: "Dissonance",
      getValue: (r) => r.dissonance.toFixed(3),
      align: "right",
    },
  ];

  return createTableBase(results, columns, title);
}

function getDissonanceForIntervals(
  allResults: DissonanceResult[],
  targetCents: number[],
): DissonanceResult[] {
  // Crear un mapa para búsqueda eficiente O(1)
  const resultsMap = new Map<number, DissonanceResult>();

  for (const result of allResults) {
    const cents = Math.round(ratioToCents(result.frequencyRatio) * 10) / 10; // Redondear a 1 decimal

    resultsMap.set(cents, result);
  }

  // Buscar los intervalos solicitados en el orden dado - O(n)
  const foundResults: DissonanceResult[] = [];

  for (const targetCent of targetCents) {
    const rounded = Math.round(targetCent * 10) / 10; // Redondear a 1 decimal
    const result = resultsMap.get(rounded);

    if (result)
      foundResults.push(result);
    else {
      // Si no encuentra exacto, buscar el más cercano
      let closest: DissonanceResult | null = null;
      let minDiff = Infinity;

      for (const [cents, r] of resultsMap) {
        const diff = Math.abs(cents - rounded);

        if (diff < minDiff) {
          minDiff = diff;
          closest = r;
        }
      }

      if (closest)
        foundResults.push(closest);
    }
  }

  return foundResults;
}

export type SpecificIntervals = {cents: number[];
tag: string;};

export function analysisEach(
  results: DissonanceResult[],
  specificIntervals?: SpecificIntervals[],
) {
  const extrema = findExtrema(results);
  const specificIntervalsResults: TaggedDissonanceResult[] = specificIntervals
    ? specificIntervals.map(s => {
      const dissonanceResults = getDissonanceForIntervals(
        results,
        s.cents,
      );

      return dissonanceResults.map(r=> ( {
        ...r,
        tag: s.tag,
      } ));
    } ).flat()
    : [];
  const taggedResults: TaggedDissonanceResult[] = [
    ...specificIntervalsResults,
    ...extrema.maxima.map(r => ( {
      ...r,
      tag: "D",
    } )),
    ...extrema.minima.map(r => ( {
      ...r,
      tag: "C",
    } )),
  ];

  // Ordenar por cents para mejor legibilidad
  taggedResults.sort((a, b) => (a.frequencyRatio) - (b.frequencyRatio));

  if (taggedResults.length === 0)
    throw new Error("No results");

  console.log(formatPeakTable(taggedResults, "Picos de consonancia y disonancia"));
}

export const ratioToCents = (ratio: number) => 1200 * Math.log2(ratio);
