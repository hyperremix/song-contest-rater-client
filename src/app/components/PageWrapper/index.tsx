/**
 *
 * PageWrapper
 *
 */
import styled from 'styled-components/macro';
import { media } from 'styles';

export const PageWrapper = styled.div`
  width: 576px;
  ${media.medium`
    width: 960px;
  `}

  margin: 0 auto;
  padding: 0 1.5rem;
  box-sizing: content-box;
`;
