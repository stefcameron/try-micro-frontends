[![CI](https://github.com/stefcameron/try-micro-frontends/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/stefcameron/try-micro-frontends/actions/workflows/ci.yml) [![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE)

# Try Micro Frontends

An exploration of micro-frontend application architecture in a PNPM-based monorepo context, starting with an existing, not necessarily ideal, monorepo layout.

The focus is on:

- how PNPM manages the workspace;
- how to tweak the monorepo layout to make it work when transforming `//apps/app1` into a set of sub-packages; and
- how the various packages can be statically or dynamically imported to be composed into "applications".

> ❗️ The focus is __not on__ proper monorepo layout, tooling, deduplication of build configs, etc.

## Workspace

- Packages MUST have `build` and `ci:build` scripts. They MUST yield the prod build, one under local conditions and the other under CI.
- Packages MAY have a `ci:test` script. It SHOULD perform any additional test-related tasks that need to run under CI.
- For the purposes of this POC, it's not possible to format/lint code in an individual package; only from the root.

---

## Packages

Based on [React App Template](https://github.com/stefcameron/react-app-template).

A "create react app"-style repo with a stack that I find works well, is easy to
understand, and doesn't need to be ejected in order to get into its guts
and figure out why it isn't working if something comes up.

- Framework: [React](https://react.dev/)
- Typings: [TypeScript](https://www.typescriptlang.org/)
  - _OPTIONAL_: The template includes examples with/out typings.
- Styling: Pure CSS styles
  - Simply import your `.css` files into modules that use them.
  - Use the `classnames` package (`import classnames from 'classnames'`) to combine classes.
- Test runner: [Jest](https://jestjs.io/)
- Testing framework: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
  - All the tools come through the "global" `import { ... } from 'testingUtility'` module which
    can be imported from anywhere (path is aliased in Jest config).
  - Includes [jest-dom](https://testing-library.com/docs/ecosystem-jest-dom) extensions.
- Lint: [ESLint](https://eslint.org/)
  - Configured for the browser in `/src`, for Jest in `/src/**/__tests__` directories, and for
    node everywhere else.
  - Using the latest (currently `es2024`) syntax.
- Formatting: [Prettier](https://prettier.io/)
- Bundling: [Webpack](https://webpack.js.org/)

### Running

Using the latest stable version of Node (v20) and NPM (v9.6)...

```bash
$ pnpm install
# installs all dependencies
$ pnpm start
# opens a browser to localhost:3000
# set PORT=XXXX in env to run on a different port

$ pnpm fmt
# formats the code using Prettier
$ pnpm build
# builds the production bundle
$ pnpm build:dev
# builds the development bundle
```

> 💬 If your browser doesn't open, please open it manually to `localhost:3000`

### Testing

```bash
$ npm test
# checks formatting, linting, build, and tests
$ npm run test:unit
# runs unit tests only
$ npm run lint
# full format check (style, lint, typings)
$ npm run fmt:check
# runs Prettier in verification mode only
```

### Styles

Pure CSS: Just `import './MyComponent.css'` in your component's module. The styles will get loaded when/if ever the module is loaded at runtime.

See `./apps/app1/src/components/App/App.js` for an example.
