const STORAGE_KEY = 'vh-todomvc-superfine';

function serialize(state) {
  let data = {...state};

  data.todos = Array.from(data.todos.entries());
  data.completed = Array.from(data.completed.values());

  return JSON.stringify(data);
}

function deserialize(state) {
  if(state.length === 0) {
    return false;
  }

  let data = JSON.parse(state);
  data.todos = new Map(data.todos);
  data.completed = new Set(data.completed);

  return data;
}

export function save(state) {
  localStorage.setItem(STORAGE_KEY, serialize(state));
}

export function load() {
  return deserialize(localStorage.getItem(STORAGE_KEY) || '');
}
