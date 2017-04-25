const HYDRATE = 'utils/hydrate';
export function hydrate(newState) {
  return {
    type: HYDRATE,
    state: JSON.parse(newState)
  };
}

export function createReducer(initialState, reducers, hydrator) {
  if (typeof(hydrator) === 'string') {
    const subname = hydrator;
    hydrator = state => state[subname];
  }

  return (state = initialState, action) => {
    if (action.type === HYDRATE) {
      return hydrator(action.state);
    }

    const reducer = reducers[action.type];
    if (!reducer) {
      return state;
    }
    return reducer(state, action);
  };
}
