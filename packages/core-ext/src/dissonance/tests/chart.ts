import * as fs from "node:fs";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import { ChartConfiguration } from "chart.js";
import { ComparisonResult, DissonanceResult, ModelResults } from "../utils/utils";
import { ratioToCents } from "../analysis";

type Props = ModelResults;

export class EnhancedChartGenerator {
  private chartJSNodeCanvas: ChartJSNodeCanvas;

  constructor() {
    this.chartJSNodeCanvas = new ChartJSNodeCanvas( {
      width: 1800,
      height: 1200,
      backgroundColour: "white",
    } );
  }

  // Configuración común de escalas
  private getCommonScales(maxFrequencyRatio: number) {
    const maxSemitones = ratioToCents(maxFrequencyRatio);

    return {
      x: {
        type: "linear" as const,
        title: {
          display: true,
          text: "Intervalo (cents)",
          font: {
            size: 18,
            weight: "bold" as const,
          },
          color: "#2c3e50",
        },
        min: 0,
        max: Math.ceil(maxSemitones),
        ticks: {
          stepSize: 100,
          font: {
            size: 14,
          },
          color: "#34495e",
        },
        grid: {
          color: "rgba(52, 73, 94, 0.1)",
        },
      },
      y: {
        type: "linear" as const,
        title: {
          display: true,
          text: "Disonancia Normalizada (0 = consonante, 1 = disonante)",
          font: {
            size: 18,
            weight: "bold" as const,
          },
          color: "#2c3e50",
        },
        min: 0,
        max: 1,
        ticks: {
          font: {
            size: 14,
          },
          color: "#34495e",
        },
        grid: {
          color: "rgba(52, 73, 94, 0.1)",
        },
      },
    };
  }

  // Configuración común de plugins
  private getCommonPlugins(title: string, subtitle?: string) {
    return {
      title: {
        display: true,
        text: title,
        font: {
          size: 24,
          weight: "bold" as const,
        },
        padding: 35,
        color: "#2c3e50",
      },
      ...(subtitle && {
        subtitle: {
          display: true,
          text: subtitle,
          font: {
            size: 16,
          },
          color: "#7f8c8d",
          padding: {
            bottom: 30,
          },
        },
      } ),
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          font: {
            size: 14,
          },
          padding: 25,
          usePointStyle: true,
        },
      },
    };
  }

  // Crear dataset con datos convertidos a semitonos
  private createDataset(results: DissonanceResult[]) {
    return results.map(r => ( {
      x: ratioToCents(r.frequencyRatio),
      y: r.dissonance,
    } ));
  }

  // Calcular el rango máximo común
  private getMaxFrequencyRatio(props: Props): number {
    let maxRatio = 1;

    if (props.sethares) {
      for (const r of props.sethares)
        maxRatio = Math.max(maxRatio, r.frequencyRatio);
    }

    if (props.harmonicEntropy) {
      for (const r of props.harmonicEntropy)
        maxRatio = Math.max(maxRatio, r.frequencyRatio);
    }

    if (props.mezcla) {
      for (const r of props.mezcla)
        maxRatio = Math.max(maxRatio, r.frequencyRatio);
    }

    return maxRatio;
  }

  async generate(props: Props) {
    const { harmonicEntropy, mezcla, sethares, vassilakis } = props;
    const maxFrequencyRatio = this.getMaxFrequencyRatio(props);

    if (sethares)
      await this.generateSetharesChart(sethares, maxFrequencyRatio);

    if (vassilakis)
      await this.generateVassilakisChart(vassilakis, maxFrequencyRatio);

    if (harmonicEntropy)
      await this.generateHarmonicEntropyChart(harmonicEntropy, maxFrequencyRatio);

    // Generar comparación solo si hay más de un modelo
    if (Object.entries(props).length > 1) {
      const referenceResults = sethares || harmonicEntropy || vassilakis;

      if (!referenceResults) {
        console.log("❌ Error: No hay modelos activos");
        // eslint-disable-next-line no-undef
        process.exit(1);
      }

      const comparisonResults: ComparisonResult[] = referenceResults.map((ref, i) => {
        const result: ComparisonResult = {
          frequencyRatio: ref.frequencyRatio,
        };

        if (sethares)
          result.sethares = sethares[i]?.dissonance;

        if (harmonicEntropy)
          result.harmonicEntropy = harmonicEntropy[i]?.dissonance;

        if (vassilakis)
          result.vassilakis = vassilakis[i]?.dissonance;

        if (mezcla)
          result.mezcla = mezcla[i]?.dissonance;

        return result;
      } );

      await this.generateComparisonChart(comparisonResults, maxFrequencyRatio);
    }
  }

  async generateSetharesChart(
    results: DissonanceResult[],
    maxFrequencyRatio: number,
    outputPath: string = "out/roughness_sethares.png",
  ): Promise<void> {
    const outputDir = outputPath.substring(0, outputPath.lastIndexOf("/"));

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, {
        recursive: true,
      } );
    }

    const configuration: ChartConfiguration = {
      type: "line",
      data: {
        datasets: [
          {
            label: "Disonancia de Sethares",
            data: this.createDataset(results),
            borderColor: "rgb(52, 152, 219)",
            backgroundColor: "rgba(52, 152, 219, 0.1)",
            borderWidth: 4,
            fill: true,
            tension: 0.1,
            pointRadius: 0,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: this.getCommonPlugins(
          "Modelo de Disonancia de Sethares",
          "Basado en rugosidad sensorial (roughness)",
        ),
        scales: this.getCommonScales(maxFrequencyRatio),
      },
    };
    const imageBuffer = await this.chartJSNodeCanvas.renderToBuffer(configuration);

    fs.writeFileSync(outputPath, imageBuffer);
    console.log(`✓ Gráfica Sethares generada: ${outputPath}`);
  }

  async generateVassilakisChart(
    results: DissonanceResult[],
    maxFrequencyRatio: number,
    outputPath: string = "out/roughness_vassilakis.png",
  ): Promise<void> {
    const outputDir = outputPath.substring(0, outputPath.lastIndexOf("/"));

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, {
        recursive: true,
      } );
    }

    const configuration: ChartConfiguration = {
      type: "line",
      data: {
        datasets: [
          {
            label: "Roughness de Vassilakis",
            data: this.createDataset(results),
            borderColor: "rgb(152, 52, 219)",
            backgroundColor: "rgba(152, 52, 219, 0.1)",
            borderWidth: 4,
            fill: true,
            tension: 0.1,
            pointRadius: 0,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: this.getCommonPlugins(
          "Modelo de Roughness de Vassilakis",
        ),
        scales: this.getCommonScales(maxFrequencyRatio),
      },
    };
    const imageBuffer = await this.chartJSNodeCanvas.renderToBuffer(configuration);

    fs.writeFileSync(outputPath, imageBuffer);
    console.log(`✓ Gráfica Vassilakis generada: ${outputPath}`);
  }

  async generateHarmonicEntropyChart(
    results: DissonanceResult[],
    maxFrequencyRatio: number,
    outputPath: string = "out/harmonic_entropy_model.png",
  ): Promise<void> {
    const outputDir = outputPath.substring(0, outputPath.lastIndexOf("/"));

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, {
        recursive: true,
      } );
    }

    const configuration: ChartConfiguration = {
      type: "line",
      data: {
        datasets: [
          {
            label: "Entropía Armónica de Paul Erlich",
            data: this.createDataset(results),
            borderColor: "rgb(46, 204, 113)",
            backgroundColor: "rgba(46, 204, 113, 0.1)",
            borderWidth: 4,
            fill: true,
            tension: 0.1,
            pointRadius: 0,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: this.getCommonPlugins(
          "Modelo de Entropía Armónica de Paul Erlich",
          "Basado en Series de Farey y Teoría de Información (r > 0.85)",
        ),
        scales: this.getCommonScales(maxFrequencyRatio),
      },
    };
    const imageBuffer = await this.chartJSNodeCanvas.renderToBuffer(configuration);

    fs.writeFileSync(outputPath, imageBuffer);
    console.log(`✓ Gráfica Entropía Armónica generada: ${outputPath}`);
  }

  async generateComparisonChart(
    comparisonResults: ComparisonResult[],
    maxFrequencyRatio: number,
    outputPath: string = "out/complete_models_comparison.png",
  ): Promise<void> {
    const outputDir = outputPath.substring(0, outputPath.lastIndexOf("/"));

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, {
        recursive: true,
      } );
    }

    // Crear datasets dinámicamente basado en qué modelos están disponibles
    const datasets = [];
    // Verificar qué modelos están disponibles
    const hasSetahres = comparisonResults.some(r => r.sethares !== undefined);
    const hasVassilakis = comparisonResults.some(r => r.vassilakis !== undefined);
    const hasHarmonicEntropy = comparisonResults.some(r => r.harmonicEntropy !== undefined);
    const hasMezcla = comparisonResults.some(r => r.mezcla !== undefined);

    if (hasSetahres) {
      datasets.push( {
        label: "Disonancia Sethares",
        data: comparisonResults
          .filter(r => r.sethares !== undefined)
          .map(r => ( {
            x: ratioToCents(r.frequencyRatio),
            y: r.sethares!,
          } )),
        borderColor: "rgb(52, 152, 219)",
        backgroundColor: "rgba(52, 152, 219, 0.1)",
        borderWidth: 3,
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 6,
      } );
    }

    if (hasVassilakis) {
      datasets.push( {
        label: "Disonancia Vassilakis",
        data: comparisonResults
          .filter(r => r.vassilakis !== undefined)
          .map(r => ( {
            x: ratioToCents(r.frequencyRatio),
            y: r.vassilakis!,
          } )),
        borderColor: "rgb(152, 52, 219)",
        backgroundColor: "rgba(152, 52, 219, 0.1)",
        borderWidth: 3,
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 6,
      } );
    }

    if (hasHarmonicEntropy) {
      datasets.push( {
        label: "Entropía Armónica (Erlich)",
        data: comparisonResults
          .filter(r => r.harmonicEntropy !== undefined)
          .map(r => ( {
            x: ratioToCents(r.frequencyRatio),
            y: r.harmonicEntropy!,
          } )),
        borderColor: "rgb(46, 204, 113)",
        backgroundColor: "rgba(46, 204, 113, 0.1)",
        borderWidth: 3,
        borderDash: [8, 4],
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 6,
      } );
    }

    if (hasMezcla) {
      datasets.push( {
        label: "Modelo Mezcla",
        data: comparisonResults
          .filter(r => r.mezcla !== undefined)
          .map(r => ( {
            x: ratioToCents(r.frequencyRatio),
            y: r.mezcla!,
          } )),
        borderColor: "rgb(231, 76, 60)",
        backgroundColor: "rgba(231, 76, 60, 0.1)",
        borderWidth: 3,
        borderDash: [4, 4],
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 6,
      } );
    }

    // Generar título dinámico
    const activeModels = [];

    if (hasSetahres)
      activeModels.push("Sethares");

    if (hasHarmonicEntropy)
      activeModels.push("Entropía Armónica");

    if (hasMezcla)
      activeModels.push("Mezcla");

    const subtitle = activeModels.join(" vs ");
    const configuration: ChartConfiguration = {
      type: "line",
      data: {
        datasets,
      },
      options: {
        responsive: true,
        plugins: this.getCommonPlugins(
          "Comparación de Modelos de Disonancia Musical",
          subtitle,
        ),
        scales: this.getCommonScales(maxFrequencyRatio),
        interaction: {
          intersect: false,
          mode: "index",
        },
      },
    };
    const imageBuffer = await this.chartJSNodeCanvas.renderToBuffer(configuration);

    fs.writeFileSync(outputPath, imageBuffer);
    console.log(`✓ Gráfica de comparación generada: ${outputPath}`);
  }
}
