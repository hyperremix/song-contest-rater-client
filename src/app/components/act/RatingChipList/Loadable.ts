/**
 *
 * Asynchronously loads the component for RatingChipList
 *
 */

import { lazyLoad } from 'utils/loadable';

export const RatingChipList = lazyLoad(
  () => import('./index'),
  module => module.RatingChipList,
);
