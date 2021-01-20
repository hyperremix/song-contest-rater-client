/**
 *
 * Asynchronously loads the component for UserAvatar
 *
 */

import { lazyLoad } from 'utils/loadable';

export const UserAvatar = lazyLoad(
  () => import('./index'),
  module => module.UserAvatar,
);
