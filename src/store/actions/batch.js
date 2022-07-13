import * as actionTypes from "./actionTypes";
import moment from "moment";
import { v4 as uuid } from "uuid";

// ADD_BATCH
export const addBatch = ({
  id = uuid(),
  batchName = "",
  description = "",
  programs = [],
  isVisible = true,
  createdAt = moment().valueOf(),
} = {}) => {
  console.log("Called");
  return {
    type: actionTypes.ADD_BATCH,
    batch: {
      id,
      batchName,
      description,
      programs,
      isVisible,
      createdAt,
    },
  };
};

// EDIT_BATCH
export const editBatch = (id = "", updates = {}) => ({
  type: actionTypes.EDIT_BATCH,
  id,
  updates: updates,
});

// REMOVE_BATCH
export const removeBatch = (id = "") => ({
  type: actionTypes.REMOVE_BATCH,
  id,
});
