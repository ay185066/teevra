import React from "react";

import Batch from "./Batch";

const BatchList = (props) => {
  return (
    <div>
      {props.batches.length === 0 ? (
        <p>No batches to show... Why not create it ?</p>
      ) : (
        props.batches.map((batch) => <Batch key={batch.id} batch={batch} />)
      )}
    </div>
  );
};

export default BatchList;
