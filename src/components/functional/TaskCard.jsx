import React from "react";

function TaskCard(props) {
  const t = props.task;
  return (
    <li>
      <input
        type="checkbox"
        checked={t.done}
        onChange={() => props.onToggle(t.id)}
      />
      {t.done ? <s>{t.title}</s> : <span>{t.title}</span>}
      {" "}({t.priority})
      {t.priority == "high" && <b> !!! HIGH</b>}
      {" "}
      <button onClick={() => props.onDelete(t.id)}>Delete</button>
    </li>
  );
}

export default React.memo(TaskCard);
