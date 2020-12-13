/**
 *
 * Asynchronously loads the component for ActsPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ActsPage = lazyLoad(
  () => import('./index'),
  module => module.ActsPage,
);
