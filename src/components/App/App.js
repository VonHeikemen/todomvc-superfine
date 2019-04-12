import React from '../../createElement';

import { TodoForm } from '../TodoForm';
import { TodoList } from '../TodoList';
import { Footer } from '../Footer';

export function App({ itemsLeft, totalItems, filter, todos, actions }) {
  return (
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <TodoForm onsubmit={actions.addTodo} />
      </header>
      <TodoList items={todos} toggleItems={actions.markAll} />
      <Footer 
        itemsLeft={itemsLeft}
        totalItems={totalItems}
        selectedFilter={filter}
        onClear={actions.deleteCompleted}
      />
    </section>
  );
}
