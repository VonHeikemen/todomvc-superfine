import {
  createStore,
  withSubscribe,
  withMiddleware,
  applyMiddleware
} from 'pico-redux';

import { createConnect, thunk } from './utils';
import * as persist from './persist';
import { reducer } from './reducer';

function configureStore(state) {
  const factory = withSubscribe(withMiddleware(createStore));
  const middlewares = applyMiddleware(thunk);
  const store = factory(reducer, state, middlewares);
  const connect = createConnect(store);

  return {store, connect};
}

function getInitState() {
  let state = {
    todos: new Map(),
    completed: new Set(),
    editingTodo: 0
  };

  return persist.load() || state;
}

export const {store, connect} = configureStore(getInitState());

