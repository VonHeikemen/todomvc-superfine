/** @jsx h*/
import { h } from 'superfine';
import classcat from 'classcat';

function FilterLink({ text, filter, selectedFilter }) {
  return (
    <a
      class={classcat({ selected: filter === selectedFilter })}
      href={'#/' + filter}
    >
      {text}
    </a>
  );
}

export function Footer({ itemsLeft, totalItems, selectedFilter, onClear }) {
  return ( totalItems > 0 &&
    <footer class="footer">
      <span className="todo-count">
        <strong>{itemsLeft}</strong>
        &nbsp;items left
      </span>
      <ul class='filters'>
        <li>
          <FilterLink
            text='All'
            filter='all'
            selectedFilter={selectedFilter}
          />
        </li>
        <li>
          <FilterLink
            text='Active'
            filter='active'
            selectedFilter={selectedFilter}
          />
        </li>
        <li>
          <FilterLink
            text='Completed'
            filter='completed'
            selectedFilter={selectedFilter}
          />
        </li>
      </ul>
      {totalItems !== itemsLeft && (
        <button class='clear-completed' onclick={onClear}>
          clear completed
        </button>
      )}
    </footer>
  );
}
