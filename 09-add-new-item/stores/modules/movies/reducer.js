import { initialState } from './state';
import { types } from './types';

// Reducer
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MOVIES_ADD:
      return [...state, action.payload];
    default:
      return state;
  }
};
