/** @jsx h*/
import { h } from 'superfine';
import { Fragment } from './Fragment';
import TodoItem from './TodoItem';
 
export function TodoList({ items, toggleItems }) {
  return (
    <main class='main'>
      <Fragment show={items.length > 0}>
        <input
          onchange={toggleItems} 
          id='toggle-all'
          type='checkbox'
          class='toggle-all'
        />
        <label for='toggle-all'>
          Mark all as complete
        </label>
        <ul class='todo-list'>
          {items.map(TodoItem)}
        </ul>  
      </Fragment>
    </main>
  );
}
