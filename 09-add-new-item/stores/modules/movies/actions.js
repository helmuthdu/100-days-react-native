import { types } from './types';

export const actionAddMovie = name => ({
  type: types.MOVIES_ADD,
  payload: name
});

export const actions = {
  actionAddMovie
};
