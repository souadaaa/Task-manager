import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, onEdit, onDelete, onStatusChange }) {
  if (tasks.length === 0) {
    return <p className="empty">Aucune tâche ici. Ajoutez-en une avec le formulaire.</p>;
  }
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </ul>
  );
}