// Implementación limpia y funcional de Adam y Momentum
type Vec = number[];
type Fx = (x: Vec)=> number;

type BoundFn = (initValue: number)=> [number, number];

// Operaciones vectoriales básicas
function clone(v: Vec): Vec {
  return [...v];
}
function dot(a: Vec, b: Vec): number {
  return a.reduce((s, x, i) => s + (x * b[i]), 0);
}
function norm(a: Vec): number {
  return Math.sqrt(dot(a, a));
}

// Cálculo numérico del gradiente
function computeGradient(f: Fx, x: Vec, h = 1e-6): Vec {
  const grad = new Array(x.length);

  for (let i = 0; i < x.length; i++) {
    const xi = x[i];
    const step = Math.max(h, Math.abs(xi) * h);

    x[i] = xi + step;
    const fplus = f(x);

    x[i] = xi - step;
    const fminus = f(x);

    x[i] = xi; // restaurar

    grad[i] = (fplus - fminus) / (2 * step);
  }

  return grad;
}

// Aplicar restricciones a las variables
function applyConstraints(
  x: Vec,
  bounds?: BoundFn | BoundFn[],
  x0?: Vec,
): Vec {
  let result = clone(x);

  if (!x0 || !bounds)
    return result;

  // Aplicar bounds por variable o globales
  for (let i = 0; i < result.length; i++) {
    let min = -Infinity;
    let max = Infinity;

    // Primero intentar bounds específicos de variable
    if (Array.isArray(bounds)) {
      if (i < bounds.length)
        [min, max] = bounds[i](x0[i]);
    } else { // Si no hay bounds específicos, usar bounds globales
      [min, max] = bounds(x0[i]);
    }

    result[i] = Math.max(min, Math.min(max, result[i]));
  }

  return result;
}

// Detectar convergencia por parámetros idénticos (clipping perfecto)
function hasConvergedByIdenticalParameters(xPrev: Vec, xCurrent: Vec): boolean {
  return xPrev.every((prev, i) => prev === xCurrent[i]);
}

// Opciones generales
interface GeneralOptions {
  maxIter?: number;
  tolerance?: number;
  gradientStep?: number;
  bounds?: BoundFn | BoundFn[]; // Bounds por variable
}

interface MomentumOptions {
  lr: number;
  momentum?: number;
}

interface AdamOptions {
  lr: number;
  beta1?: number;
  beta2?: number;
}

interface OptimizationResult {
  x: Vec;
  fx: number;
  iterations: number;
  gradientNorm: number;
  converged: boolean;
  convergenceReason?: "gradient" | "parameter_change";
}

// Implementación de Momentum
function momentumOptimize(
  f: Fx,
  x0: Vec,
  momentumOpts: MomentumOptions,
  generalOpts: GeneralOptions = {},
): OptimizationResult {
  // Opciones por defecto
  const maxIter = generalOpts.maxIter ?? 1000;
  const tolerance = generalOpts.tolerance ?? 1e-6;
  const gradientStep = generalOpts.gradientStep ?? 1e-6;
  const momentum = momentumOpts.momentum ?? 0.9;
  const { lr } = momentumOpts;
  let x = clone(x0);
  let xPrev = clone(x0);
  let velocity = new Array(x0.length).fill(0);
  let bestX = clone(x0);
  let bestFx = f(x0);

  for (let iter = 1; iter <= maxIter; iter++) {
    const fx = f(x);
    const grad = computeGradient(f, x, gradientStep);
    const gradNorm = norm(grad);

    // Actualizar mejor solución
    if (fx < bestFx) {
      bestX = clone(x);
      bestFx = fx;
    }

    // Criterio de convergencia por gradiente
    if (gradNorm < tolerance) {
      return {
        x: bestX,
        fx: bestFx,
        iterations: iter,
        gradientNorm: gradNorm,
        converged: true,
        convergenceReason: "gradient",
      };
    }

    // Criterio de convergencia por parámetros idénticos (clipping perfecto)
    if (iter > 1 && hasConvergedByIdenticalParameters(xPrev, x)) {
      return {
        x: bestX,
        fx: bestFx,
        iterations: iter,
        gradientNorm: gradNorm,
        converged: true,
        convergenceReason: "parameter_change",
      };
    }

    // Guardar estado anterior
    xPrev = clone(x);

    // Actualización de momentum
    for (let i = 0; i < x.length; i++) {
      velocity[i] = (momentum * velocity[i]) - (lr * grad[i]);
      x[i] += velocity[i];
    }

    // Aplicar restricciones
    x = applyConstraints(x, generalOpts.bounds, x0);

    // Verificar valores finitos
    if (!x.every(isFinite)) {
      console.warn("Valores no finitos detectados");
      break;
    }
  }

  const finalGrad = computeGradient(f, bestX, gradientStep);

  return {
    x: bestX,
    fx: bestFx,
    iterations: maxIter,
    gradientNorm: norm(finalGrad),
    converged: false,
  };
}

// Implementación de Adam
function adamOptimize(
  f: Fx,
  x0: Vec,
  adamOpts: AdamOptions,
  generalOpts: GeneralOptions = {},
): OptimizationResult {
  // Opciones por defecto
  const maxIter = generalOpts.maxIter ?? 1000;
  const tolerance = generalOpts.tolerance ?? 1e-6;
  const gradientStep = generalOpts.gradientStep ?? 1e-6;
  const { lr } = adamOpts;
  const beta1 = adamOpts.beta1 ?? 0.9;
  const beta2 = adamOpts.beta2 ?? 0.999;
  const eps = 1e-8;
  let x = clone(x0);
  let xPrev = clone(x0);
  let m = new Array(x0.length).fill(0); // Primer momento
  let v = new Array(x0.length).fill(0); // Segundo momento
  let bestX = clone(x0);
  let bestFx = f(x0);

  for (let iter = 1; iter <= maxIter; iter++) {
    const fx = f(x);
    const grad = computeGradient(f, x, gradientStep);
    const gradNorm = norm(grad);

    // Actualizar mejor solución
    if (fx < bestFx) {
      bestX = clone(x);
      bestFx = fx;
    }

    // Criterio de convergencia por gradiente
    if (gradNorm < tolerance) {
      return {
        x: bestX,
        fx: bestFx,
        iterations: iter,
        gradientNorm: gradNorm,
        converged: true,
        convergenceReason: "gradient",
      };
    }

    // Criterio de convergencia por parámetros idénticos (clipping perfecto)
    if (iter > 1 && hasConvergedByIdenticalParameters(xPrev, x)) {
      return {
        x: bestX,
        fx: bestFx,
        iterations: iter,
        gradientNorm: gradNorm,
        converged: true,
        convergenceReason: "parameter_change",
      };
    }

    // Guardar estado anterior
    xPrev = clone(x);

    // Actualización de Adam
    for (let i = 0; i < x.length; i++) {
      // Actualizar momentos
      m[i] = (beta1 * m[i]) + ((1 - beta1) * grad[i]);
      v[i] = (beta2 * v[i]) + ((1 - beta2) * grad[i] * grad[i]);

      // Corrección de sesgo
      const mHat = m[i] / (1 - (beta1 ** iter));
      const vHat = v[i] / (1 - (beta2 ** iter));

      // Actualización de parámetros
      x[i] += -lr * mHat / (Math.sqrt(vHat) + eps);
    }

    // Aplicar restricciones
    x = applyConstraints(x, generalOpts.bounds, x0);

    // Verificar valores finitos
    if (!x.every(isFinite)) {
      console.warn("Valores no finitos detectados");
      break;
    }
  }

  const finalGrad = computeGradient(f, bestX, gradientStep);

  return {
    x: bestX,
    fx: bestFx,
    iterations: maxIter,
    gradientNorm: norm(finalGrad),
    converged: false,
  };
}

// Clase principal del optimizador
class GradientOptimizer {
  private generalOptions: GeneralOptions;

  constructor(generalOptions: GeneralOptions = {} ) {
    this.generalOptions = generalOptions;
  }

  momentum(f: Fx, x0: Vec, options?: MomentumOptions): OptimizationResult {
    const opts = {
      lr: options?.lr ?? 0.025,
      momentum: options?.momentum ?? 0.9,
    };

    return momentumOptimize(f, x0, opts, this.generalOptions);
  }

  adam(f: Fx, x0: Vec, options?: AdamOptions): OptimizationResult {
    const opts: AdamOptions = {
      lr: 0.025,
      beta1: options?.beta1 ?? 0.9,
      beta2: options?.beta2 ?? 0.999,
    };

    return adamOptimize(f, x0, opts, this.generalOptions);
  }
}

export {
  GradientOptimizer,
  GeneralOptions,
  MomentumOptions,
  AdamOptions,
  OptimizationResult,
};
