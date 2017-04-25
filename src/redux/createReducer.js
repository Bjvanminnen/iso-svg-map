export default function createReducer(initialState, reducers) {
  return (state = initialState, action) => {
    const reducer = reducers[action.type];
    if (!reducer) {
      return state;
    }
    return reducer(state, action);
  };
}
