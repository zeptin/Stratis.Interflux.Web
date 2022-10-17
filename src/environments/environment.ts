// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from 'src/app/Environment';
import { ChainName } from 'src/app/services/chain';

export const environment: Environment = {
  production: false,
  apiEndpoint: 'https://cirrushelperapi-testnet.azurewebsites.net',
  wstraxaddress: '0xf128715b5AF562b2B45BBc8ede79973Ff48C3815',
  wstraxaddressprefix: 120,
  chain: ChainName.Sepolia,
  alchemyApiKey: 'demo'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
