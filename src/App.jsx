import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskFilter from "./components/TaskFilter.jsx";
import TaskList from "./components/TaskList.jsx";
import StatusChart from "./components/StatusChart.jsx";
import { STORAGE_KEY } from "./constants.js";

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [activeFilter, setActiveFilter] = useState("Toutes");
  const [taskBeingEdited, setTaskBeingEdited] = useState(null);

  // Sauvegarde automatique à chaque modification
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function saveTask(taskData) {
    if (taskData.id) {
      setTasks(tasks.map((t) => (t.id === taskData.id ? taskData : t)));
    } else {
      setTasks([...tasks, { ...taskData, id: Date.now() }]);
    }
    setTaskBeingEdited(null);
  }

  function deleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
    if (taskBeingEdited?.id === taskId) setTaskBeingEdited(null);
  }

  function changeStatus(taskId, newStatus) {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
  }

  const visibleTasks =
    activeFilter === "Toutes" ? tasks : tasks.filter((t) => t.status === activeFilter);

  return (
    <main className="app">
      <h1>Mes tâches</h1>
      <StatusChart tasks={tasks} />
      <TaskForm
        key={taskBeingEdited?.id ?? "new"}
        taskToEdit={taskBeingEdited}
        onSave={saveTask}
        onCancel={() => setTaskBeingEdited(null)}
      />
      <TaskFilter activeFilter={activeFilter} onChange={setActiveFilter} />
      <TaskList
        tasks={visibleTasks}
        onEdit={setTaskBeingEdited}
        onDelete={deleteTask}
        onStatusChange={changeStatus}
      />
    </main>
  );
}