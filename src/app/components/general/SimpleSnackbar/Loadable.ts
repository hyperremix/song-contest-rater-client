/**
 *
 * Asynchronously loads the component for SimpleSnackbar
 *
 */

import { lazyLoad } from 'utils/loadable';

export const SimpleSnackbar = lazyLoad(
  () => import('./index'),
  module => module.SimpleSnackbar,
);
