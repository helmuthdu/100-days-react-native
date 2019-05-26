import { photosApi } from '../../../api/photos.api';
import { types } from './types';

export const actionGetAllPhotos = () => {
  return async dispatch => {
    dispatch({
      type: types.PHOTOS_GET_ALL,
      payload: await photosApi.getAll()
    })
  }
};

export const actions = {
  actionGetAllPhotos
};
