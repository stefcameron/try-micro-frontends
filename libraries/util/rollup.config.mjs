//
// Rollup Configuration
//

import * as builds from '../../tools/build/rollupBuilds.mjs';

export default [
  builds.getEsmConfig(), // Dev and Prod combined
];
