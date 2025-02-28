type Module = Record<string, unknown>;
const moduleCache: Record<string, Module> = {}; // Cache de módulos cargados

// Función para cargar un módulo si no está en cache
function loadModule(modulePath: string) {
  if (!moduleCache[modulePath])
    // eslint-disable-next-line no-undef
    moduleCache[modulePath] = require(modulePath);

  return moduleCache[modulePath];
}

type Props = {
  paths: string[];
  staticModule?: object;
};

export function createProxyBarrel<T>(
  { paths: modulePaths, staticModule }: Props,
): T {
// Cache de propiedad -> módulo que la contiene
  const propertyCache: Record<string, string> = {};

  return new Proxy( {
    ...staticModule,
  }, {
    get(target: any, prop: string) {
      if (!(prop in target)) {
      // Si la propiedad no se ha cacheado, buscamos en los módulos disponibles
        if (!propertyCache[prop]) {
          for (const modulePath of modulePaths) {
            const module = loadModule(modulePath);

            if (prop in module) {
            // Si encontramos la propiedad, la cacheamos junto con el módulo correspondiente
              propertyCache[prop] = modulePath;
              const value = module[prop];

              if (value === undefined)
                throw new Error(`prop=${prop} for module=${modulePath} is undefined`);

              target[prop] = value;
              break; // Salimos cuando encontramos la propiedad
            }
          }
        } else {
        // Si ya está cacheada, simplemente la obtenemos del módulo correspondiente
          const cachedModulePath = propertyCache[prop];
          const module = moduleCache[cachedModulePath];

          target[prop] = module[prop];
        }
      }

      return target[prop]; // Devuelve la propiedad encontrada
    },
  } );
}
