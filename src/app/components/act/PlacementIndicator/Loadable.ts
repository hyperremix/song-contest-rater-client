/**
 *
 * Asynchronously loads the component for PlacementIndicator
 *
 */

import { lazyLoad } from 'utils/loadable';

export const PlacementIndicator = lazyLoad(
  () => import('./index'),
  module => module.PlacementIndicator,
);
