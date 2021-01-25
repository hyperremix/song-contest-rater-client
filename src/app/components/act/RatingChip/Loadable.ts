/**
 *
 * Asynchronously loads the component for RatingChip
 *
 */

import { lazyLoad } from 'utils/loadable';

export const RatingChip = lazyLoad(
  () => import('./index'),
  module => module.RatingChip,
);
