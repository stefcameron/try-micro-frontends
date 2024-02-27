//
// Rollup Build Configurations
//

import path from 'path';
import jsonPlugin from '@rollup/plugin-json';
import resolvePlugin from '@rollup/plugin-node-resolve';
import cjsPlugin from '@rollup/plugin-commonjs';
import {
  babel as babelPlugin,
  getBabelOutputPlugin,
} from '@rollup/plugin-babel';
import replacePlugin from '@rollup/plugin-replace';
import { terser as terserPlugin } from 'rollup-plugin-terser';

import { loadBabelConfig, loadJsonFile } from './buildUtil.mjs';
import {
  RU_FORMAT_CJS,
  RU_FORMAT_ESM,
  RU_FORMAT_UMD,
  OUTPUT_DEV,
  DIR_SRC,
  DIR_DIST,
} from './rollupUtil.mjs';

const pkg = loadJsonFile(path.resolve('./package.json'));

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * @license https://github.com/stefcameron/try-micro-frontends/blob/master/libraries/${path.basename(path.resolve('.'))}/LICENSE
 */`;

// Determines the primary/default export path.
// - format {string}: (REQUIRED) set to Rollup build format
// - isDev {boolean}: Optional true to indicate a Dev build, or false to indicate a Prod build
const getOutputFilepath = function ({ format, isDev } = {}) {
  if (
    !format ||
    ![RU_FORMAT_CJS, RU_FORMAT_ESM, RU_FORMAT_UMD].includes(format)
  ) {
    throw new Error(`A valid output format is required, format=${format}`);
  }

  return `${DIR_DIST}/index.${format.toLowerCase()}${isDev === true ? `.${OUTPUT_DEV}` : ''}.js`;
};

// base Babel configuration
// - format {string}: (REQUIRED) set to Rollup build format
const getBabelConfig = function ({ format } = {}) {
  if (
    !format ||
    ![RU_FORMAT_CJS, RU_FORMAT_ESM, RU_FORMAT_UMD].includes(format)
  ) {
    throw new Error(`A valid output format is required, format=${format}`);
  }

  const config = loadBabelConfig();

  // TODO: In a non-POC scenario, we'd need to handle (1) no presets so we have to add one,
  //  (2) presets exists but preset-env isn't defined so have to add it, (3) it's defined
  //  but just as a string so needs options, (4) exists as an array without options so need
  //  to define those, and (5) exists as an array with options so need to modify those.
  // for the POC, we assume the preset exists in an array and has some options already including
  //  the `targets`
  const presetEnv = config.presets.find((p) => p[0] === '@babel/preset-env');
  presetEnv[1].modules = format === RU_FORMAT_UMD ? 'umd' : false;

  config.plugins ||= [];

  // TODO: Similar to presets TODO above, we'd have to consider whether the transform-runtime
  //  plugin is already defined in the list or not and what to do if it is.
  // slim builds (except for UMD) rely on external Babel helpers
  if (format !== RU_FORMAT_UMD) {
    // NOTE: because of this, @babel/runtime must also be installed to use this build,
    //  and we build it with 'runtime' Babel helpers using `@rollup/plugin-babel`
    config.plugins.push('@babel/plugin-transform-runtime');
  }

  return config;
};

// base config with NO outputs, relative to the repo root
// - format {string}: (REQUIRED) set to Rollup build format
// - isDev: set to true for a development (i.e. non-minified) build
const getBaseConfig = function (
  { isDev, format } = {
    isDev: false,
  }
) {
  if (
    !format ||
    ![RU_FORMAT_CJS, RU_FORMAT_ESM, RU_FORMAT_UMD].includes(format)
  ) {
    throw new Error(`A valid output format is required, format=${format}`);
  }

  // {Array<string>} package's `peerDependencies` are assumed to express the external dependencies
  const externals = [
    ...Object.keys(pkg.peerDependencies || {}),
    // avoid errors like, 'RollupError: "jsxs" is not exported by ... imported by ...'
    // @see https://stackoverflow.com/questions/67068355/error-jsxs-is-not-exported-by-node-modules-react-jsx-runtime-js-on-building-p
    'react/jsx-runtime',
  ];

  if (format === RU_FORMAT_UMD) {
    // never mark @babel/runtime dependencies as external for UMD because
    //  that package isn't meant to be used directly in the browser (i.e. it's
    //  meant to be bundled, or referenced externally in a CJS/ESM scenario
    //  where some other build will bundle them)
    const idx = externals.indexOf('@babel/runtime');
    if (idx >= 0) {
      externals.splice(idx, 1);
    }
  }

  const replaceTokens = {};
  const babelConfig = getBabelConfig({ format });

  if (format === RU_FORMAT_UMD) {
    replaceTokens['process.env.NODE_ENV'] = JSON.stringify(
      isDev ? 'development' : 'production'
    );
  }
  // else, for CJS and ESM, `process.env.NODE_ENV` stays in the code for a combined
  //  Dev/Prod build that expects the consumer to define the global

  const config = {
    input: `${DIR_SRC}/index.js`,
    output: null,
    external(moduleName) {
      // NOTE: if we just provided an array of module names, Rollup would do
      //  an exact match, but would then miss treating as external any imports
      //  that are deeper into the package, like 'lodash/merge', for example,
      //  if we just stated that 'lodash' should be an external package, so we
      //  have to treat the list of externals as substrings of the module name
      // @see https://rollupjs.org/guide/en/#peer-dependencies
      const result = !!externals.find((ex) => moduleName.includes(ex));
      return result;
    },
    plugins: [
      // ALWAYS FIRST: string token replacement
      replacePlugin({
        ...replaceTokens,
        preventAssignment: true,
      }),

      jsonPlugin(),
      resolvePlugin(),
      cjsPlugin({
        include: 'node_modules/**',
      }),
    ],
    watch: {
      include: `${DIR_SRC}/**`,
      exclude: ['node_modules/**', `${DIR_DIST}/**`],
    },
  };

  // for CJS and ESM, we transpile during the bundling process
  // for UMD, we transpile AFTER bundling (see `output` config)
  if (format !== RU_FORMAT_UMD) {
    config.plugins.push(
      // NOTE: As of Babel 7, this plugin now ensures that Babel helpers are not
      //  repeated, and are inserted at the top of the generated bundle:
      //  "This rollup plugin automatically de-duplicates those helpers, keeping
      //  only one copy of each one used in the output bundle. Rollup will combine
      //  the helpers in a single block at the top of your bundle."
      //  @see https://github.com/rollup/rollup-plugin-babel#helpers
      babelPlugin({
        ...babelConfig,
        exclude: 'node_modules/**',

        // for CJS and ESM builds, IIF SLIM, have all Babel helpers reference an external
        //  @babel/runtime dependency that consumers can provide and bundle into their
        //  app code; this is the recommendation for library modules, which is what
        //  this package is, and we use this in conjunction with `@babel/plugin-transform-runtime`
        // @see https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
        babelHelpers: 'runtime',
      })
    );
  }
  // else, for UMD, we transpile the bundle as a whole (i.e. post-bundling)

  return config;
};

// terser plugin configuration
const getTerserConfig = function () {
  return {
    output: {
      // comments: /^\/\*!/
      comments(node, comment) {
        const text = comment.value;
        const type = comment.type;
        if (type === 'comment2') {
          // multiline comment: keep if it starts with a bang or contains
          //  some common preservation keywords
          return (
            text.indexOf('!') === 0 || /@preserve|@license|@cc_on/i.test(text)
          );
        }
      },
    },
  };
};

// default/common options for all build outputs.
const baseOutput = function () {
  return {
    banner,
    sourcemap: true,
    preserveModules: false, // roll everything up into one file
  };
};

// UMD (ES5) build config
// - options.globalName: (required) Name of the global to expose on `window`
// - options.isDev: set to true for a development (i.e. non-minified) build
export const getUmdConfig = function (
  { isDev, globalName } = {
    isDev: false,
  }
) {
  if (!globalName) {
    throw new Error('The `globalName` option is required for UMD builds');
  }

  const format = RU_FORMAT_UMD;
  const config = getBaseConfig({ isDev, format });
  const babelConfig = getBabelConfig({ format });

  config.output = {
    ...baseOutput(),
    file: getOutputFilepath({ format, isDev }),
    format,
    name: globalName,
    noConflict: true,
    plugins: [
      getBabelOutputPlugin({
        ...babelConfig,

        // this is required in order to let Rollup do the UMD wrapper, and Babel
        //  do the transpiling, which will result in a single instance of all the
        //  necessary Babel Helpers defined as inner-module globals in the UMD
        //  bundle (meaning the browser will load them, but not on `window`, just
        //  for use in the closure that the UMD creates)
        allowAllFormats: true,
      }),
    ],
  };

  // provide Lodash-related globals for external references
  // NOTE: per https://unpkg.com/lodash, Lodash registers the `_` global
  config.output.globals = (id) => {
    // `id` is module name like 'lodash'
    if (id === 'lodash') {
      return '_';
    } else if (id.startsWith('lodash/')) {
      // a deep reference like `import isObjectLike from 'lodash/isObjectLike'`
      //  becomes `_.isObjectLike`
      return `_.${id.substr('lodash/'.length)}`;
    } else if (id === pkg.name) {
      return pkg.name;
    }

    throw new Error(`Unexpected external package reference, id="${id}"`);
  };

  if (!isDev) {
    const terserConfig = getTerserConfig();
    config.plugins.push(terserPlugin(terserConfig));
  }

  return config;
};

// CJS (ES5) build config
export const getCjsConfig = function () {
  const format = RU_FORMAT_CJS;
  const config = getBaseConfig({ format });

  config.output = {
    ...baseOutput(),
    file: getOutputFilepath({ format }),
    format,
    exports: 'named',
  };

  return config;
};

// ESM (ES6+) build config
export const getEsmConfig = function () {
  const format = RU_FORMAT_ESM;
  const config = getBaseConfig({ format });

  config.output = {
    ...baseOutput(),
    file: getOutputFilepath({ format }),
    format,
  };

  return config;
};
