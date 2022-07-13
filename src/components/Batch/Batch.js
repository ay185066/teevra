import React from "react";
import moment from "moment";

const Batch = (props) => {
  const { id, batchName, description, programs, isVisible, createdAt } =
    props.batch;

  return (
    <div>
      id: {id} <br />
      Name: {batchName}
      <br />
      description: {description}
      <br />
      programs: {programs === undefined ? "No programs" : programs.length}
      <br />
      isVisible: {isVisible}
      <br />
      createdAt: {moment(createdAt).format()}
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Batch;
