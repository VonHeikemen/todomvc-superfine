export function createConnect(store) {
  return (
    mapStateToProps = state => state,
    mapDispatchToProps = () => ({})
  ) => component => (...args) =>
    component({
      dispatch: store.dispatch,
      ...mapStateToProps(store.getState(), ...args),
      ...mapDispatchToProps(store.dispatch, ...args)
    });
}

export function bindActionCreators(actionCreators, dispatch) {
  let boundActions = {};
  const bindAction = function(key) {
    boundActions[key] = (...args) => dispatch(actionCreators[key](...args));
  };

  Object.keys(actionCreators).forEach(bindAction);

  return boundActions;
}

export function thunk(store) {
  return next => action => 
    typeof action == 'function' 
      ? action(next, store.getState) 
      : next(action);
}
