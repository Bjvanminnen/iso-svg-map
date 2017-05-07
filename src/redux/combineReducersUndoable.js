import Immutable from 'immutable';
import { combineReducers } from 'redux';

const UNDO = 'undo';
export const undo = () => ({ type: UNDO });

export default function combineReducersUndoable(reducers) {
  const combined = combineReducers(reducers);
  let undoStack = Immutable.List();

  return (state, action) => {
    if (action.type === UNDO) {
      if (undoStack.size === 0) {
        return state;
      }
      undoStack = undoStack.pop();
      return undoStack.get(undoStack.size - 1);
    } else {
      const nextState = combined(state, action);
      undoStack = undoStack.push(nextState);
      return nextState;
    }
  };
}
