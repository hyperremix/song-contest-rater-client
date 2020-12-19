/**
 *
 * Asynchronously loads the component for CompetitionItem
 *
 */

import { lazyLoad } from 'utils/loadable';

export const CompetitionItem = lazyLoad(
  () => import('./index'),
  module => module.CompetitionItem,
);
