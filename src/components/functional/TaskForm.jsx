import React, { useState, useRef, useEffect } from "react";

function TaskForm(props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (title == "") {
      alert("enter title");
      return;
    }
    props.onAdd(title, priority);
    setTitle("");
    inputRef.current.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;
