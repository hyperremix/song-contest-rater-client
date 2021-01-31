/**
 *
 * Asynchronously loads the component for RatingForm
 *
 */

import { lazyLoad } from 'utils/loadable';

export const RatingForm = lazyLoad(
  () => import('./index'),
  module => module.RatingForm,
);
