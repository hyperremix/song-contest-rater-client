/**
 *
 * NavBar
 *
 */

import * as React from 'react';
import styled from 'styled-components/macro';
import { StyleConstants } from '../../../styles';
import { PageWrapper } from '../../components/PageWrapper';
import { Logo } from './Logo';

export function NavBar() {
  return (
    <>
      <Wrapper>
        <PageWrapper>
          <Logo />
        </PageWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.header`
  box-shadow: 0 1px 0 0;
  height: ${StyleConstants.NAV_BAR_HEIGHT};
  display: flex;
  width: 100%;
  ${PageWrapper} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
