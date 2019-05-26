import { initialState } from './state';
import { types } from './types';

// Reducer
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PHOTOS_GET_ALL:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
