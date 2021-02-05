/**
 *
 * Asynchronously loads the component for UserAvatarGroup
 *
 */

import { lazyLoad } from 'utils/loadable';

export const UserAvatarGroup = lazyLoad(
  () => import('./index'),
  module => module.UserAvatarGroup,
);
