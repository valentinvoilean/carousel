import styled from 'styled-components';

import { StyledSlidesProps } from './types';

import arrowIcon from '../../images/arrow.svg';

import { animationTimeout } from './constants';

export const StyledCarousel = styled.div`
  position: relative;
  width: ${({ theme }) => theme.gallery.width}px;
  overflow: hidden;
  box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.35);
  background: ${({ theme }) => theme.gallery.background};

  &::before {
    display: block;
    content: '';
    width: 100%;
    padding-top: calc(100% / (${({ theme }) => theme.gallery.aspectRatio}));
  }
`;

export const StyledInnerContent = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  outline: none;
`;

export const StyledSlides = styled.div<StyledSlidesProps>`
  display: flex;
  height: 100%;
  width: ${props => 100 * props.slidesLength}%;
  transition: ${props => {
    return props.animate ? `transform ${animationTimeout}ms` : 'none';
  }};

  * {
    user-select: none; // disable selection
    pointer-events: none; // disable dragging
  }
`;

export const StyledSlide = styled.div`
  display: flex;
  flex: 1 0 0;
  align-items: center;
  
  img {
    width: 100%;
    height: 100%;
  }
`;

export const StyledNextButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: url(${arrowIcon}) no-repeat;
  outline: none;
  border: 0;
  cursor: pointer;
  width: 50px;
  height: 50px;
`;

export const StyledPreviousButton = styled(StyledNextButton)`
  left: 10px;
  right: auto;
  transform: translateY(-50%) rotate(180deg);
`;

export const StyledCounter = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-family: 'Raleway';
`;
