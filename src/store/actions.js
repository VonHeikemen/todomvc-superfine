import * as persist from './persist';

const addTodo = value => ({
  type: 'ADD_TODO',
  todo: {
    text: value,
    completed: false,
    id: Date.now()
  }
});

const toggleTodo = id => ({
  type: 'TOGGLE_TODOS',
  items: [id]
});

const toggleTodos = items => ({
  type: 'TOGGLE_TODOS',
  items
});

const removeTodo = id => ({
  type: 'REMOVE_TODOS',
  items: [id]
});

const removeTodos = items => ({
  type: 'REMOVE_TODOS',
  items
});

const updateTodo = (id, text) => ({
  type: 'UPDATE_TODO',
  text,
  id
});

const setEdit = id => ({
  type: 'SET_EDIT',
  id
});

const leaveEdit = () => ({
  type: 'SET_EDIT',
  id: 0
});

const appendCompleted = id => ({
  type: 'APPEND_COMPLETED',
  id
});

const removeCompleted = id => ({
  type: 'REMOVE_COMPLETED',
  id
});

const clearCompleted = () => ({
  type: 'CLEAR_COMPLETED'
});

const deleteTodo = id => (dispatch, getState) => {
  dispatch(removeCompleted(id));
  dispatch(removeTodo(id));
  persist.save(getState());
};

const deleteCompleted = () => (dispatch, getState) => {
  let state = getState();
  let completed = Array.from(state.completed.values());

  dispatch(removeTodos(completed));
  dispatch(clearCompleted());
  persist.save(getState());
};

const markAll = () => (dispatch, getState) => {
  let state = getState();
  let shouldMarkAll = state.completed.size === state.todos.size;

  if (shouldMarkAll) {
    let items = Array.from(state.todos.keys());
    return dispatch(toggleTodos(items));
  }

  const filterItems = (acc, item) =>
    item.completed ? acc : acc.concat(item.id);

  let items = Array.from(state.todos.values()).reduce(filterItems, []);

  dispatch(toggleTodos(items));
  persist.save(getState());
};

function withSave(actionCreator) {
  return (...args) => (dispatch, getState) => {
    dispatch(actionCreator(...args));
    persist.save(getState());
  };
}

export const todoActions = {
  addTodo: withSave(addTodo),
  updateTodo: withSave(updateTodo),
  toggleTodo: withSave(toggleTodo),
  deleteTodo,
  deleteCompleted,
  markAll
};

export const editActions = {
  setEdit,
  leaveEdit
};

export const completedListActions = {
  appendCompleted,
  removeCompleted
};
