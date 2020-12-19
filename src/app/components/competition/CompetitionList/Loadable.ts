/**
 *
 * Asynchronously loads the component for CompetitionList
 *
 */

import { lazyLoad } from 'utils/loadable';

export const CompetitionList = lazyLoad(
  () => import('./index'),
  module => module.CompetitionList,
);
