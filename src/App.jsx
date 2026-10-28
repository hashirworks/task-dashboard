import React, { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { ThemeContext } from "./context/ThemeContext";
import TaskForm from "./components/functional/TaskForm";
import TaskList from "./components/functional/TaskList";
import CardWrapper from "./components/functional/CardWrapper";
import ActivityLogger from "./components/class/ActivityLogger";
import Header from "./components/functional/Header";
import MetricsSummary from "./components/functional/MetricsSummary";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const { theme } = useContext(ThemeContext);
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [latest, setLatest] = useState("");

  const pending = tasks.filter((t) => !t.done).length;
  const done = tasks.length - pending;

  useEffect(() => {
    document.title = "Pending Tasks: " + pending;
  }, [pending]);

  useEffect(() => {
    document.body.style.background = theme == "dark" ? "black" : "white";
    document.body.style.color = theme == "dark" ? "white" : "black";
  }, [theme]);

  const addTask = useCallback((title, priority) => {
    const t = { id: Date.now(), title: title, priority: priority, done: false };
    setTasks((old) => [...old, t]);
    setLatest("Added task: " + title + " @ " + Date.now());
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((old) => old.filter((t) => t.id != id));
    setLatest("Deleted a task @ " + Date.now());
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks((old) => old.map((t) => (t.id == id ? { ...t, done: !t.done } : t)));
    setLatest("Toggled a task @ " + Date.now());
  }, []);

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      if (statusFilter == "done" && !t.done) return false;
      if (statusFilter == "pending" && t.done) return false;
      if (priorityFilter != "all" && t.priority != priorityFilter) return false;
      return true;
    });
  }, [tasks, statusFilter, priorityFilter]);

  function changeStatus(e) {
    setStatusFilter(e.target.value);
    setLatest("Changed status filter to " + e.target.value + " @ " + Date.now());
  }

  function changePriority(e) {
    setPriorityFilter(e.target.value);
    setLatest("Changed priority filter to " + e.target.value + " @ " + Date.now());
  }

  return (
    <div>
      <Header title="Task Management Dashboard" />
      <MetricsSummary total={tasks.length} pending={pending} done={done} />
      <hr />
      <CardWrapper title="Add Task">
        <TaskForm onAdd={addTask} />
      </CardWrapper>
      <hr />
      <CardWrapper title="Tasks">
        Status:{" "}
        <select value={statusFilter} onChange={changeStatus}>
          <option value="all">all</option>
          <option value="pending">pending</option>
          <option value="done">done</option>
        </select>{" "}
        Priority:{" "}
        <select value={priorityFilter} onChange={changePriority}>
          <option value="all">all</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <TaskList tasks={filtered} onToggle={toggleTask} onDelete={deleteTask} />
      </CardWrapper>
      <hr />
      <CardWrapper title="Activity Log">
        <ActivityLogger latest={latest} />
      </CardWrapper>
    </div>
  );
}

export default App;
