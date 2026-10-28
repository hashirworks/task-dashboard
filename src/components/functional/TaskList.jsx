import React from "react";
import TaskCard from "./TaskCard";

function TaskList(props) {
  return (
    <div>
      {props.tasks.length == 0 ? (
        <p>No tasks found</p>
      ) : (
        <ul>
          {props.tasks.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              onToggle={props.onToggle}
              onDelete={props.onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
