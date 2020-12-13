/**
 *
 * ActItem
 *
 */
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { messages } from './messages';

interface Props {
  artistName: string;
  songName: string;
}

export function ActItem({ artistName, songName }: Props) {
  const { t } = useTranslation();

  return (
    <Info>
      <ArtistName>
        <div>{t(...messages.artistNameLabel)}</div>
        <div>{artistName}</div>
      </ArtistName>
      <SongName>
        <div>{t(...messages.songNameLabel)}</div>
        <div>{songName}</div>
      </SongName>
    </Info>
  );
}

const Info = styled.div``;

const ArtistName = styled.div``;

const SongName = styled.div``;
