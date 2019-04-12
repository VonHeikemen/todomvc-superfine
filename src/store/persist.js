const STORAGE_KEY = 'vh-todomvc-superfine';

function setToArray(data) {
  return Array.from(data.entries());
}

function serialize(state) {
  let data = {...state};

  data.todos = setToArray(data.todos);
  data.completed = setToArray(data.completed);

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
