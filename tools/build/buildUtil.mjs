import fs from 'fs';
import url from 'url';
import path from 'path';
import { createRequire } from 'module';
import { cloneDeep } from 'lodash-es';

/**
 * Gets a modules's directory name (e.g. the old `__dirname` from CJS node modules).
 * @param {ImportMeta} meta From `import.meta` in the module whose directory name is sought.
 * @returns {string} Module's absolute directory __path__.
 */
export const getModuleDirname = function (meta) {
  return path.dirname(url.fileURLToPath(meta.url));
};

/**
 * Generates a module-specific CJS `require()` function for loading CJS modules.
 * @param {ImportMeta} meta From `import.meta` in the module that needs to load a CJS module
 *  using a `require()` function.
 * @returns {function} Module's require function.
 */
export const mkModuleRequire = function (meta) {
  return createRequire(meta.url);
};

const __dirname = getModuleDirname(import.meta);
const require = mkModuleRequire(import.meta);

/**
 * Loads JSON from a given file, parsing it as JSON.
 * @param {string} filePath Path to file.
 * @returns {any} JSON value from file.
 * @throws {Error} If a parsing error occurs or the file isn't found.
 */
export const loadJsonFile = function (filePath) {
  return JSON.parse(fs.readFileSync(filePath));
};

// TODO: This should be adapted to take a path to the directory of the package whose
//  Babel config is sought, and then if the file doesn't exist, follow a `node_module`
//  lookup model where parent directories are checked until the repo root is reached
//  and the root Babel config is loaded. For now, KISS and just always load from root
//  since we don't have package-specific configs in the POC.
/**
 * Loads a unique copy of the repo's root Babel config file.
 * @returns {Record<string, string>} Babel config.
 */
export const loadBabelConfig = function () {
  // NOTE: must clone deep what we get because `require()` will continue to return the same
  //  memory instance once it loads the module the first time, and we want unique babel configs
  return cloneDeep(require(path.resolve(__dirname, '../../babel.config.js')));
};
