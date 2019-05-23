import faker from 'faker';
import { range } from 'lodash';

const getAll = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(
      range(0, 100).map(i => ({
        id: faker.random.uuid(),
        name: faker.name.findName(),
        username: faker.internet.userName(),
        phoneNumber: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        avatar: faker.internet.avatar(),
        notes: faker.lorem.sentence()
      }))
    );
  }, 1000);
});

export const usersApi = { getAll };
