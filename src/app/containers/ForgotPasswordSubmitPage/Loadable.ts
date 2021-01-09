/**
 *
 * Asynchronously loads the component for ForgotPasswordSubmitPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ForgotPasswordSubmitPage = lazyLoad(
  () => import('./index'),
  module => module.ForgotPasswordSubmitPage,
);
