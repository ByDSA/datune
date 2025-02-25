Explicación del script "prepare": "cd .. && husky packages/.husky":

El binario 'husky' tiene que ejecutarse en el mismo directorio que está la carpeta .git. Por eso "cd .."
Para poder aplicar pretties/eslint, necesita acceder a los binarios, que están en el node_modules de /packages/. Por eso hay que poner la carpeta .husky en packages.
