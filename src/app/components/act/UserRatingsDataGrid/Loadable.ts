/**
 *
 * Asynchronously loads the component for UserRatingsDataGrid
 *
 */

import { lazyLoad } from 'utils/loadable';

export const UserRatingsDataGrid = lazyLoad(
  () => import('./index'),
  module => module.UserRatingsDataGrid,
);
