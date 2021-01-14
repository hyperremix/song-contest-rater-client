import Auth from '@aws-amplify/auth';
import { User } from '@hyperremix/song-contest-rater-model';
import getUuidByString from 'uuid-by-string';
import { request } from '../utils/request';

export const getUser = async (): Promise<User | null> => {
  try {
    const userInfo = await Auth.currentAuthenticatedUser();
    const userId = getUuidByString(userInfo.attributes.email);
    return (await request(
      `${process.env.REACT_APP_API_URL}/users/${userId}`,
    )) as User;
  } catch (error) {
    return null;
  }
};
