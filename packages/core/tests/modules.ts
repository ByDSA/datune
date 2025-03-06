export async function classifyModuleExports(...paths: string[]) {
  const functions: string[] = [];
  const vars: string[] = [];
  const promises = paths.map(async (p)=> {
    const module = await import(p);

    Object.entries(module).forEach(([key, value]) => {
      if (typeof value === "function")
        functions.push(key);
      else
        vars.push(key); // incluye typeof value === "undefined", que son la mayoría
    } );
  } );

  await Promise.all(promises);

  return {
    functions,
    vars,
  };
}

type Props = {
  expected: {
    functions?: string[];
    vars?: string[];
  };
  modules: string[];
  dirname?: string;
  barrel: object;
};
export async function expectExportModulesAsync(props: Props) {
  let input = props.modules;

  if (props.dirname)
    input = input.map(i=>props.dirname + "/" + i);

  const { functions, vars } = await classifyModuleExports(...input);
  const actualFuncs = functions.filter(f=>(props.barrel as any)[f] !== undefined);
  const actualVars = vars.filter(v=>(props.barrel as any)[v] !== undefined);

  // Propiedades estáticas que tenga el barrel
  // pero que no se hayan importado desde los modules
  for (const k of Object.keys(props.barrel)) {
    if (
      !actualFuncs.includes(k) && !actualVars.includes(k)
      && (props.barrel as any)[k] !== undefined // Para descartar las propiedades "omit"
    )
      throw new Error(`Barrel object has static property '${k}' which has not been imported from the modules.`);
  }

  if (!props.expected.functions)
    expect(actualFuncs).toHaveLength(0);
  else {
    for (const f of actualFuncs)
      expect((props.barrel as any)[f]).toBeDefined();

    expect(actualFuncs.sort()).toEqual(props.expected.functions.sort());
  }

  if (!props.expected.vars)
    expect(actualVars).toHaveLength(0);
  else {
    for (const v of actualVars)
      expect((props.barrel as any)[v]).toBeDefined();

    expect(actualVars.sort()).toEqual(props.expected.vars.sort());
  }
}
