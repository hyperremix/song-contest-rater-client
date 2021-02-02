import { Rating } from '@hyperremix/song-contest-rater-model';

export const ratingSum = (rating?: Rating): number => {
  return rating
    ? rating.song + rating.singing + rating.show + rating.looks + rating.clothes
    : 0;
};
