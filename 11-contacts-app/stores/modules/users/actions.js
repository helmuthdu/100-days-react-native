import { usersApi } from '../../../api/users.api';
import { types } from './types';

export const actionGetAllUsers = () => {
  return async dispatch => {
    dispatch({
      type: types.USERS_GET_ALL,
      payload: await usersApi.getAll()
    })
  }
};

export const actions = {
  actionGetAllUsers
};
