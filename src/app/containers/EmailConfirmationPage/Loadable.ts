/**
 *
 * Asynchronously loads the component for EmailConfirmationPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const EmailConfirmationPage = lazyLoad(
  () => import('./index'),
  module => module.EmailConfirmationPage,
);
