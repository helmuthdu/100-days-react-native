import createStore from '..';

describe('store', () => {
  const store = createStore();

  it('should create a initial store', () => {
    expect(store).toBeDefined();
  });
});
