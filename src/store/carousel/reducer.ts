import {
  CarouselActionTypes,
  CarouselState,
  CHANGE_SLIDE_INDEX,
  SET_INITIAL_X_POSITION,
  SET_SLIDE_OFFSET,
  TOGGLE_MOUSE_DRAGGING
} from './types';

export const initialState: CarouselState = {
  activeSlideIndex: 1,
  slideOffset: 1,
  interactionStartTime: Date.now(),
  animate: true,
  initialXPosition: 0,
  enableDragging: false
};

export const carouselReducer = (state = initialState, action: CarouselActionTypes): CarouselState => {
  switch (action.type) {
    case CHANGE_SLIDE_INDEX:
      return {
        ...state,
        animate: action.payload.animate,
        activeSlideIndex: action.payload.newSlideIndex,
        initialXPosition: 0,
        enableDragging: false
      };
    case TOGGLE_MOUSE_DRAGGING:
      return {
        ...state,
        enableDragging: action.enableDragging
      };
    case SET_INITIAL_X_POSITION:
      return {
        ...state,
        initialXPosition: action.initialXPosition,
        animate: false,
        interactionStartTime: Date.now()
      };
    case SET_SLIDE_OFFSET:
      return {
        ...state,
        slideOffset: action.slideOffset
      };
    default:
      return state;
  }
};