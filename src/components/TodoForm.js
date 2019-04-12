import React from '../createElement';

function handleSubmit(handler, event) {
  if (event === undefined) {
    return handleSubmit.bind(null, handler);
  }

  event.preventDefault();
  if (event.target[0].value.length <= 0) {
    return;
  }

  handler(event.target[0].value);
  event.target[0].value = '';
}

export function TodoForm({ onsubmit }) {
  return (
    <form onsubmit={handleSubmit(onsubmit)}>
      <input 
        class='new-todo'
        autocomplete='off'
        placeholder='what needs to be done?'
        autofocus='autofocus'
      />
    </form>
  );
}
