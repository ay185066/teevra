import React from "react";
import { connect } from "react-redux";

import { addBatch } from "../../store/actions/index";

import BatchList from "./BatchList";

const BatchListPage = (props) => {
  const clickHandler = () => {
    console.log("Clicked", props.addBatch({}));
    // props.addBatch({});
  };

  return (
    <div>
      {/* TODO - Batch Filter */}
      <BatchList batches={props.batches} />
      <button onClick={clickHandler}>Add Batch</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addBatch: (batch) => {
    console.log(batch);
    return dispatch(addBatch(batch));
  },
});
const mapStateToProps = (state) => ({
  batches: state.batches,
});
export default connect(mapStateToProps, mapDispatchToProps)(BatchListPage);
