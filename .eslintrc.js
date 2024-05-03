//
// ROOT ESLint Configuration
//

/* eslint-env node */

// @see https://eslint.org/docs/latest/use/configure/language-options#specifying-parser-options
const parserOptions = {
  ecmaFeatures: {
    impliedStrict: true,
  },
  ecmaVersion: 'latest', // probably overridden by `env.esXXXX` setting (docs are unclear)
  sourceType: 'module', // ESM
};

// for use with https://typescript-eslint.io/users/configs#projects-with-type-checking
// @see https://typescript-eslint.io/getting-started/typed-linting
const typedParserOptions = {
  ...parserOptions,
  ecmaFeatures: {
    ...parserOptions.ecmaFeatures,
    jsx: false,
  },
  project: true,
  tsconfigRootDir: __dirname,
};

// @see https://eslint.org/docs/latest/use/configure/language-options#specifying-environments
const env = {
  es2024: true, // automatically sets `parserOptions.ecmaVersion` parser option to 15
  node: true,
};

const browserEnv = {
  ...env,
  browser: true,
  node: false,
};

const jestEnv = {
  ...browserEnv,
  'jest/globals': true,
};

// globals injected/processed by Webpack's `DefinePlugin`
const webpackGlobals = {
  /**
   * __[Webpack Injected]__
   * Dev server port.
   */
  WP_PORT: 'readonly',
};

// for all JavaScript files
const jsExtends = [
  'eslint:recommended',

  // @see https://typescript-eslint.io/troubleshooting/formatting#suggested-usage---prettier
  'prettier', // ALWAYS LAST: disable style rules that conflict with prettier
];

// for all TypeScript files
const typedExtends = [
  'eslint:recommended',

  // @see https://typescript-eslint.io/users/configs#projects-with-type-checking
  'plugin:@typescript-eslint/recommended-type-checked',

  // @see https://typescript-eslint.io/troubleshooting/formatting#suggested-usage---prettier
  'prettier', // ALWAYS LAST: disable style rules that conflict with prettier
];

// for JS files with React/JSX code
const reactExtends = [
  'eslint:recommended',

  'plugin:react/recommended',
  'plugin:react-hooks/recommended',
  // from eslint-plugin-react; disables rules no longer applicable when using React 17's
  //  new JSX Transform (react/jsx-uses-react, react/react-in-jsx-scope)
  'plugin:react/jsx-runtime',

  // @see https://typescript-eslint.io/troubleshooting/formatting#suggested-usage---prettier
  'prettier', // ALWAYS LAST: disable style rules that conflict with prettier
];

// for TypeScript files with React/JSX code
const typedReactExtends = [
  'eslint:recommended',

  // @see https://typescript-eslint.io/users/configs#projects-with-type-checking
  'plugin:@typescript-eslint/recommended-type-checked',

  'plugin:react/recommended',
  'plugin:react-hooks/recommended',
  // from eslint-plugin-react; disables rules no longer applicable when using React 17's
  //  new JSX Transform (react/jsx-uses-react, react/react-in-jsx-scope)
  'plugin:react/jsx-runtime',

  // @see https://typescript-eslint.io/troubleshooting/formatting#suggested-usage---prettier
  'prettier', // ALWAYS LAST: disable style rules that conflict with prettier
];

// for JS test modules run by Jest and in which RTL is used
const jestExtends = [
  'eslint:recommended',

  'plugin:react/recommended',
  'plugin:react-hooks/recommended',
  // from eslint-plugin-react; disables rules no longer applicable when using React 17's
  //  new JSX Transform (react/jsx-uses-react, react/react-in-jsx-scope)
  'plugin:react/jsx-runtime',

  'plugin:jest-dom/recommended',
  'plugin:testing-library/react',

  // @see https://typescript-eslint.io/troubleshooting/formatting#suggested-usage---prettier
  'prettier', // ALWAYS LAST: disable style rules that conflict with prettier
];

// for TypeScript test modules run by Jest and in which RTL is used
const typedJestExtends = [
  'eslint:recommended',

  // @see https://typescript-eslint.io/users/configs#projects-with-type-checking
  'plugin:@typescript-eslint/recommended-type-checked',

  'plugin:react/recommended',
  'plugin:react-hooks/recommended',
  // from eslint-plugin-react; disables rules no longer applicable when using React 17's
  //  new JSX Transform (react/jsx-uses-react, react/react-in-jsx-scope)
  'plugin:react/jsx-runtime',

  'plugin:jest-dom/recommended',
  'plugin:testing-library/react',

  // @see https://typescript-eslint.io/troubleshooting/formatting#suggested-usage---prettier
  'prettier', // ALWAYS LAST: disable style rules that conflict with prettier
];

// for all JS files
const jsRules = {
  //
  // Rules: pull-in ESLint's recommended set, then tweak as necessary
  // @see http://eslint.org/docs/rules/&lt;rule-name>
  //

  //// possible errors

  'no-regex-spaces': 'off',
  'no-await-in-loop': 'error',
  'no-async-promise-executor': 'error',
  'no-misleading-character-class': 'error',
  'no-unsafe-optional-chaining': 'error',

  //// best practices

  curly: 'error',
  'default-case': 'error',
  eqeqeq: 'error',
  'guard-for-in': 'error',
  'no-alert': 'error',
  'no-caller': 'error',
  'no-console': 'error',
  'no-else-return': 'error',
  'no-eq-null': 'error',
  'no-eval': 'error',
  'no-lone-blocks': 'error',
  'no-loop-func': 'error',
  'no-multi-spaces': 'error',
  'no-new': 'off', // OFF to allow `myFunction(new RegExp('foo'))`, for example
  'no-new-func': 'error', // disallow `new Function(...)` to declare a new function
  'no-new-wrappers': 'error', // disallow `new Number/String/Boolean()`
  'no-throw-literal': 'error',
  'no-warning-comments': [
    'error',
    {
      terms: ['DEBUG', 'FIXME', 'HACK'],
      location: 'start',
    },
  ],

  //// strict mode

  strict: ['error', 'function'],

  //// variables

  'no-catch-shadow': 'error',
  'no-shadow': 'error',
  'no-unused-vars': [
    'error',
    {
      args: 'none',
      caughtErrors: 'none',
      vars: 'local', // allow unused globals because they're often AppsScript hooks/triggers like `onOpen`
    },
  ],
  'no-use-before-define': 'error',

  //// stylistic issues

  // NONE: Prettier will take care of these by reformatting the code on commit,
  //  save a few exceptions.

  // Prettier will format using single quotes per .prettierrc.js settings, but
  //  will not require single quotes instead of backticks/template strings
  //  when interpolation isn't used, so this rule will catch those cases
  quotes: [
    'error',
    'single',
    {
      avoidEscape: true,
      allowTemplateLiterals: false,
    },
  ],

  //// ECMAScript 6 (non-stylistic issues only)

  'no-duplicate-imports': ['error', { includeExports: true }],
  'no-useless-constructor': 'error',
  'no-var': 'error',
  'prefer-arrow-callback': 'off',
  'prefer-const': 'error',
};

// for TypeScript modules
const tsRules = {};

// for modules with React/JSX code
const reactRules = {
  //// React Plugin

  // not needed because we don't pre-compile React code, it just runs in the browser
  'react/react-in-jsx-scope': 'off',

  // referring to another component's `.propTypes` is dangerous because that
  //  property doesn't exist in in production builds as an optimization
  //  (this rule isn't enabled in 'plugin:react/recommended')
  'react/forbid-foreign-prop-types': 'error',

  //// React-Hooks Plugin

  // default is 'warn', prefer errors (warnings just get ignored)
  'react-hooks/exhaustive-deps': 'error',
};

// for test modules run by Jest in which RTL is used
const jestRules = {
  //// jest plugin

  'jest/no-disabled-tests': 'error',
  'jest/no-focused-tests': 'error',
  'jest/no-identical-title': 'error',
  'jest/valid-expect': 'error',
  'jest/valid-title': 'error',

  //// jest-dom plugin

  // this rule is buggy, and doesn't seem to work well with the Testing Library's queries
  'jest-dom/prefer-in-document': 'off',

  //// RTL plugin

  // this prevents expect(document.querySelector('foo')), which is useful because not
  //  all elements can be found using RTL queries (sticking to RTL queries probably
  //  means less fragile tests, but then there are things we wouldn't be able to
  //  test like whether something renders in Light mode or Dark mode as expected)
  'testing-library/no-node-access': 'off',

  // we use custom queries, which don't get added to `screen` (that's a miss in RTL, IMO),
  //  which means we _must_ destructure the result from `render()` in order to get to
  //  our custom queries
  'testing-library/prefer-screen-queries': 'off',

  // not much value in this one, and it's not sophisticated enough to detect all usage
  //  scenarios so we get false-positives
  'testing-library/await-async-utils': 'off',
};

// for React/JSX files
const reactSettings = {
  //// React Plugin

  // a version must be specified; here it's set to detect the current version
  react: {
    version: 'detect',
  },
};

// for test modules run by Jest
const jestSettings = {
  ...reactSettings,
  react: {
    ...reactSettings.react,
  },
};

// where packages are located in the repo; does NOT end with a slash
const pkgGlobs = ['apps/*', 'libraries/*'];

module.exports = {
  root: true,
  overrides: [
    // project JavaScript files (tooling, etc.)
    {
      // traditional CJS/require scripts
      files: ['**/*.js'],
      excludedFiles: pkgGlobs.map((glob) => `${glob}/src/**/*.*`),
      extends: jsExtends,
      parserOptions: {
        ...parserOptions,
        sourceType: 'script', // CJS
      },
      env,
      rules: {
        ...jsRules,
        'no-console': 'off',
      },
    },
    {
      // modern ESM/import scripts
      files: ['**/*.mjs'],
      excludedFiles: pkgGlobs.map((glob) => `${glob}/src/**/*.*`),
      extends: jsExtends,
      parserOptions,
      env,
      rules: {
        ...jsRules,
        'no-console': 'off',
      },
    },
    {
      // TypeScript
      files: ['**/*.m?ts'],
      excludedFiles: pkgGlobs.map((glob) => `${glob}/src/**/*.*`),
      extends: typedExtends,
      parser: '@typescript-eslint/parser',
      parserOptions: typedParserOptions,
      env,
      rules: {
        ...jsRules,
        ...tsRules,
        'no-console': 'off',
      },
    },

    // JavaScript source files
    {
      files: pkgGlobs.map((glob) => `${glob}/src/**/*.{js,jsx}`),

      // @see https://www.npmjs.com/package/@babel/eslint-plugin
      //  currently, none of the rules overridden in the plugin are enforced here
      plugins: ['@babel'],

      extends: reactExtends,
      parser: '@babel/eslint-parser',
      parserOptions: {
        ...parserOptions,
        ecmaFeatures: {
          ...parserOptions.ecmaFeatures,
          jsx: true,
        },
      },
      env: browserEnv,
      globals: {
        ...webpackGlobals,
      },
      rules: {
        ...jsRules,
        ...reactRules,
      },
      settings: reactSettings,
    },

    // TypeScript source files (plain TS and React-based TSX)
    {
      files: [
        ...pkgGlobs.map((glob) => `${glob}/src/**/*.ts`),
        'apps/*.ts', // global declarations
      ],

      // @see https://www.npmjs.com/package/@babel/eslint-plugin
      //  currently, none of the rules overridden in the plugin are enforced here
      plugins: ['@babel'],

      extends: typedExtends,
      parser: '@typescript-eslint/parser',
      parserOptions: typedParserOptions,
      env: browserEnv,
      globals: {
        ...webpackGlobals,
      },
      rules: {
        ...jsRules,
        ...tsRules,
      },
    },
    {
      files: pkgGlobs.map((glob) => `${glob}/src/**/*.tsx`),

      // @see https://www.npmjs.com/package/@babel/eslint-plugin
      //  currently, none of the rules overridden in the plugin are enforced here
      plugins: ['@babel'],

      extends: typedReactExtends,
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ...typedParserOptions,
        ecmaFeatures: {
          ...typedParserOptions.ecmaFeatures,
          jsx: true,
        },
      },
      env: browserEnv,
      globals: {
        ...webpackGlobals,
      },
      rules: {
        ...jsRules,
        ...tsRules,
        ...reactRules,
      },
      settings: reactSettings,
    },

    // JavaScript test files
    {
      // match any file with a suffix of .test, or .spec; and with .js or .jsx
      //  extension; and just test.<ext> or spec.<ext>; as long as the file is inside
      //  a __test__ directory at any depth within the base path
      files: [
        ...pkgGlobs.map(
          (glob) => `${glob}/src/**/__tests__/**/?(*.)+(spec|test).{js,jsx}`
        ),
        'tools/test/**/*.js',
      ],

      // @see https://www.npmjs.com/package/@babel/eslint-plugin
      //  currently, none of the rules overridden in the plugin are enforced here
      plugins: ['@babel', 'jest'],

      extends: jestExtends,
      parser: '@babel/eslint-parser',
      parserOptions: {
        ...parserOptions,
        ecmaFeatures: {
          ...parserOptions.ecmaFeatures,
          jsx: true,
        },
      },
      env: jestEnv,
      rules: {
        ...jsRules,
        ...reactRules,
        ...jestRules,
      },
      settings: jestSettings,
    },

    // TypeScript test files
    {
      // match any file with a suffix of .test, or .spec; and with .ts or .tsx
      //  extension; and just test.<ext> or spec.<ext>; as long as the file is inside
      //  a __test__ directory at any depth within the base path
      files: [
        ...pkgGlobs.map(
          (glob) => `${glob}/src/**/__tests__/**/?(*.)+(spec|test).{ts,tsx}`
        ),
        'tools/test/**/*.ts',
      ],

      // @see https://www.npmjs.com/package/@babel/eslint-plugin
      //  currently, none of the rules overridden in the plugin are enforced here
      plugins: ['@babel', 'jest'],

      extends: typedJestExtends,
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ...typedParserOptions,
        ecmaFeatures: {
          ...typedParserOptions.ecmaFeatures,
          jsx: true,
        },
      },
      env: jestEnv,
      rules: {
        ...jsRules,
        ...tsRules,
        ...reactRules,
        ...jestRules,
      },
      settings: jestSettings,
    },
  ],
};
