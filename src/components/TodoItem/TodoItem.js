/** @jsx h*/
import { h } from 'superfine';
import classcat from 'classcat';

const ESCAPE_KEY = 27;

export function TodoItem({ actions, isEditing, todo }) {
  let itemClassList = {
    todo: true,
    completed: todo.completed,
    editing: isEditing
  };

  const selectText = event => () => {
    event.target.closest('li').lastElementChild[0].select();
  };

  const beginEdit = function(event) {
    actions.setEdit(todo.id);
    setTimeout(selectText(event), 0);
  };

  const finishEdit = function(event) {
    event.preventDefault();
    let value = event.target[0].value;
    actions.updateTodo(todo.id, value);
    actions.leaveEdit();
  };

  const abortEdit = function(event) {
    event.target.value = todo.text;
    actions.leaveEdit();
  };

  const captureEscape = function(event) {
    if (event.which === ESCAPE_KEY) {
      abortEdit(event);
    }
  };

  return (
    <li class={classcat(itemClassList)}>
      <div class='view'>
        <input
          class='toggle'
          type='checkbox'
          checked={todo.completed}
          onchange={() => actions.toggleTodo(todo.id)}
        />
        <label ondblclick={beginEdit}>
          {todo.text}
        </label>
        <button
          onclick={() => actions.deleteTodo(todo.id)}
          class='destroy'
        ></button>
      </div>
      <form onsubmit={finishEdit}>
        <input
          class='edit'
          type='text'
          onkeyup={captureEscape}
          onblur={abortEdit}
          value={todo.text}
        />
      </form>
    </li>
  );
}
