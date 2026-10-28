import React from "react";

function MetricsSummary(props) {
  return (
    <p>
      Total: {props.total} | Pending: {props.pending} | Done: {props.done}
    </p>
  );
}

export default MetricsSummary;
