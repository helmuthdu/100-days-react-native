import faker from 'faker';
import { range } from 'lodash';

const getAll = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        range(0, 100).map(i => ({
          id: faker.random.uuid(),
          name: faker.random.words(),
          likes: faker.random.number(),
          image: faker.image.image(),
          tags: ['tag1', 'tag2', 'tag3'],
          description: faker.lorem.paragraphs()
        }))
      );
    }, 1000);
  });

export const photosApi = { getAll };
