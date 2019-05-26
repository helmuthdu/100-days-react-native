import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { all, spawn } from 'redux-saga/effects';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

let storeInstance;

export default (
  stores,
  onCompletion
) => {
  if (storeInstance) {
    return storeInstance;
  }

  const sagaMiddleware = createSagaMiddleware();
  const middleware = [thunkMiddleware, sagaMiddleware];

  const composedEnhancers = (__DEV__ ? composeWithDevTools({ realtime: true }) : compose)(
    applyMiddleware(...middleware)
  );

  // Create the store
  const store = createStore(
    combineReducers({
      form: formReducer,
      ...stores.filter(str => str.reducer).reduce((acc, str) => ({ ...acc, [str.name]: str.reducer }), {})
    }),
    composedEnhancers
  );

  sagaMiddleware.run(function*() {
    yield all(stores.filter(str => str.sagas).map(str => spawn(str.sagas)));
  });

  if (onCompletion) {
    persistStore(store, {}, onCompletion);
  }

  storeInstance = store;

  return storeInstance;
};
