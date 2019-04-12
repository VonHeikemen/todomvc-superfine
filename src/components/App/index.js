import { connect } from '../../store';

import { bindActionCreators } from '../../store/utils';
import { todoActions } from '../../store/actions';
import { filterItems } from './filters';

import { App } from './App';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        addTodo: todoActions.addTodo,
        deleteCompleted: todoActions.deleteCompleted,
        markAll: todoActions.markAll
      },
      dispatch
    )
  };
}

function mapStateToProps(state, { filter }) {
  return ({
    ...state,
    filter,
    todos: filterItems(Array.from(state.todos.values()), filter),
    itemsLeft: state.todos.size - state.completed.size,
    totalItems: state.todos.size
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

