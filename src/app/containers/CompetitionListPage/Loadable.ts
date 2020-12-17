/**
 *
 * Asynchronously loads the component for CompetitionListPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const CompetitionListPage = lazyLoad(
  () => import('./index'),
  module => module.CompetitionListPage,
);
