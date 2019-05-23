import { createSelector } from 'reselect';
import { sortBy } from 'lodash';

const users = state => state.users;

export const usersList = createSelector(
  users,
  users =>
    sortBy(users, user => user.name).reduce((acc, user, index) => {
      let previous = acc[acc.length - 1];
      if (!previous || (!previous.header && previous.name[0] !== user.name[0])) {
        acc.push({ id: String(index), name: user.name[0], header: true });
      }
      acc.push({ ...user, header: false });
      return acc;
    }, [])
);

export const usersListHeadersIndex = createSelector(
  usersList,
  users =>
    users.reduce((acc, user, index) => {
      if (user.header) {
        acc.push(index);
      }
      return acc;
    }, [])
);

export const selectors = {
  usersList
};
