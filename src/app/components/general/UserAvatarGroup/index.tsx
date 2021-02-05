/**
 *
 * UserAvatarGroup
 *
 */
import { User } from '@hyperremix/song-contest-rater-model';
import { useTheme } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import * as React from 'react';
import { UserAvatar } from '../UserAvatar/Loadable';

interface Props {
  users: (User | undefined | null)[];
  max: number;
  size?: number;
}

export function UserAvatarGroup({ users, max, size }: Props) {
  const length = users.length;
  const theme = useTheme();

  return (
    <AvatarGroup max={max}>
      {users.map((user, index) => (
        <UserAvatar
          user={user}
          size={size}
          style={{
            zIndex: length - 1 - index,
            marginLeft: index > 0 ? theme.spacing(-0.5) : '0',
          }}
        />
      ))}
    </AvatarGroup>
  );
}
