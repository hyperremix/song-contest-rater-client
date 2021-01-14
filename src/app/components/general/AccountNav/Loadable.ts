/**
 *
 * Asynchronously loads the component for AccountNav
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AccountNav = lazyLoad(
  () => import('./index'),
  module => module.AccountNav,
);
