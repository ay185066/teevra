import * as actionTypes from "../actions/actionTypes";

import { batches } from "../../fixtures/data";

const addBatch = (state, action) => {
  return state.concat(action.batch);
};

const editBatch = (state, action) => {
  return state.map((batch) => {
    if (batch.id === action.id) {
      // TODO  update properties change to lowercase
      return { ...batch, ...action.updates };
    } else {
      return batch;
    }
  });
};

const removeBatch = (state, action) => {
  return state.filter(({ id }) => id !== action.id);
};

const initialState = [...batches];
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BATCH:
      return addBatch(state, action);
    case actionTypes.EDIT_BATCH:
      return editBatch(state, action);
    case actionTypes.REMOVE_BATCH:
      return removeBatch(state, action);
    default:
      return state;
  }
};

export default reducer;
