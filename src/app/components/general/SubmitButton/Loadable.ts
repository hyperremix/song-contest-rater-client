/**
 *
 * Asynchronously loads the component for SubmitButton
 *
 */

import { lazyLoad } from 'utils/loadable';

export const SubmitButton = lazyLoad(
  () => import('./index'),
  module => module.SubmitButton,
);
