export function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: state.todos.set(action.todo.id, action.todo)
      };

    case 'TOGGLE_TODOS':
      const toggle = id => {
        let todo = state.todos.get(id);
        let todoState = !todo.completed;

        todoState ? state.completed.add(id) : state.completed.delete(id);

        state.todos.set(id, { ...todo, completed: todoState });
      };

      action.items.forEach(toggle);
      return state;

    case 'UPDATE_TODO':
      let todo = state.todos.get(action.id);
      return {
        ...state,
        todos: state.todos.set(todo.id, {
          ...todo,
          text: action.text
        })
      };

    case 'REMOVE_TODOS':
      const deleteItem = id => state.todos.delete(id);
      action.items.forEach(deleteItem);
      return state;

    case 'SET_EDIT':
      return {
        ...state,
        editingTodo: action.id
      };

    case 'APPEND_COMPLETED':
      return {
        ...state,
        completed: state.completed.add(action.id)
      };

    case 'REMOVE_COMPLETED':
      state.completed.delete(action.id);
      return state;

    case 'CLEAR_COMPLETED':
      state.completed.clear();
      return state;

    default:
      return state;
  }
}
