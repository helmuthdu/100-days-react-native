import { createSelector } from 'reselect';
import { sortBy } from 'lodash';

const photos = state => state.photos;

export const photosList = createSelector(
  photos,
  photos =>
    sortBy(photos, user => user.name).reduce((acc, user, index) => {
      let previous = acc[acc.length - 1];
      if (!previous || (!previous.header && previous.name[0] !== user.name[0])) {
        acc.push({ id: String(index), name: user.name[0], header: true });
      }
      acc.push({ ...user, header: false });
      return acc;
    }, [])
);

export const photosListHeadersIndex = createSelector(
  photosList,
  photos =>
    photos.reduce((acc, user, index) => {
      if (user.header) {
        acc.push(index);
      }
      return acc;
    }, [])
);

export const selectors = {
  photosList
};
