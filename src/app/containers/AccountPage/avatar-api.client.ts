import { InitiateAvatarUploadResponse } from '@hyperremix/song-contest-rater-model';
import { request } from '../../../utils/request';
import { HttpMethod } from '../../../utils/types';

export async function uploadAvatar(
  userId: string | undefined,
  imageFile: any,
  contentType: string,
): Promise<void> {
  const { signedUrl } = await request<InitiateAvatarUploadResponse>(
    `/users/${userId}/avatar`,
    {
      method: HttpMethod.POST,
      body: { contentType },
    },
  );
  await fetch(signedUrl, {
    method: HttpMethod.PUT,
    body: imageFile,
    headers: {
      'Content-Type': contentType,
    },
  });
}
