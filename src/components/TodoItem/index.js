import { connect } from '../../store';
import * as Actions from '../../store/actions';
import { bindActionCreators } from '../../store/utils';
import { TodoItem } from './TodoItem';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...Actions.todoActions,
        ...Actions.editActions,
        ...Actions.completedListActions
      },
      dispatch
    )
  };
};

function mapStateToProps(state, todo) {
  return {
    todo,
    isEditing: state.editingTodo === todo.id
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItem);
