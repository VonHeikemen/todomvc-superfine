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

const deleteTodo = id => dispatch => {
  dispatch(removeCompleted(id));
  dispatch(removeTodo(id));
};

const deleteCompleted = () => (dispatch, getState) => {
  let state = getState();
  let completed = Array.from(state.completed.values());

  dispatch(removeTodos(completed));
  dispatch(clearCompleted());
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
};

export const todoActions = {
  addTodo,
  updateTodo,
  toggleTodo,
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
