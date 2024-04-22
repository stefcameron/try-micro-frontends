//
// APP1 WEBPACK build configuration
//
// ENV:
//
// - PORT (number): If specified, the dev server will run on the specified port;
//     default is 3000.
//

import { mkConfig } from '../../tools/build/wpBuilds.mjs';

const config = mkConfig();

config.devServer.proxy = [
  {
    context: [
      '/api/films',
      '/api/people',
      '/api/species',
      '/api/planets',
      '/api/starships',
      '/api/vehicles',
    ],
    target: 'https://swapi.dev',
    secure: false,
  },
];

export default config;
