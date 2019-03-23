import React from 'react';

import {
  StyledCarousel,
  StyledCounter,
  StyledInnerContent,
  StyledNextButton,
  StyledPreviousButton,
  StyledSlide,
  StyledSlides
} from './styled';

import { CarouselState } from './types';

import { animationTimeout } from './constants';
import { getCounterIndex } from './utils';

export class Carousel extends React.PureComponent<{}, CarouselState> {
  public state = {
    activeSlideIndex: 1
  };

  public render(): React.ReactNode {
    const { children } = this.props;
    const { activeSlideIndex } = this.state;
    const childrenList = React.Children.toArray(children);
    const childrenLength = childrenList.length;
    const counterIndex = getCounterIndex(activeSlideIndex, childrenLength);
    const slidesStyles = {
      transform: `translate3d(-${(100 / (childrenLength + 2)) * activeSlideIndex}%, 0, 0)`
    };

    return (
      <StyledCarousel>
        <StyledInnerContent>
          <StyledSlides slidesLength={childrenLength + 2} style={slidesStyles}>
            <StyledSlide>{childrenList[childrenLength - 1]}</StyledSlide>
            {childrenList.map((slide, index) => (
              <StyledSlide key={`slide-${index}`}>{slide}</StyledSlide>
            ))}
            <StyledSlide>{childrenList[0]}</StyledSlide>
          </StyledSlides>
        </StyledInnerContent>
        <StyledPreviousButton onClick={this.slideToPreviousSlide} />
        <StyledNextButton onClick={this.slideToNextSlide} />
        <StyledCounter>
          {counterIndex}/{childrenLength}
        </StyledCounter>
      </StyledCarousel>
    );
  }

  private readonly switchSlides = () => {
    const { activeSlideIndex } = this.state;

    setTimeout(() => {
      const childrenLength = React.Children.count(this.props.children);
      if (activeSlideIndex === 0) {
        this.changeSlide(childrenLength);
      } else if (activeSlideIndex === childrenLength + 1) {
        this.changeSlide(1);
      }
    }, animationTimeout);
  };

  private readonly changeSlide = (activeSlideIndex: number) => {
    this.setState(
      {
        activeSlideIndex
      },
      this.switchSlides
    );
  };

  private readonly slideToNextSlide = () => {
    const childrenLength = React.Children.count(this.props.children);
    const { activeSlideIndex } = this.state;
    const newIndex = Math.min(activeSlideIndex + 1, childrenLength + 1);
    this.changeSlide(newIndex);
  };

  private readonly slideToPreviousSlide = () => {
    const newIndex = Math.max(this.state.activeSlideIndex - 1, 0);
    this.changeSlide(newIndex);
  };
}
