import { STATUSES } from "../constants.js";

const formatDate = (iso) => new Date(iso).toLocaleDateString("fr-FR");
const statusClass = (status) => STATUSES.indexOf(status);

export default function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <li className={`task status-${statusClass(task.status)}`}>
      <div className="task-info">
        <strong>{task.title}</strong>
        <small>
          Du {formatDate(task.startDate)} au {formatDate(task.endDate)}
        </small>
      </div>
      <select
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value)}
        aria-label={`Statut de ${task.title}`}
      >
        {STATUSES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <div className="row">
        <button onClick={() => onEdit(task)}>Modifier</button>
        <button className="danger" onClick={() => onDelete(task.id)}>
          Supprimer
        </button>
      </div>
    </li>
  );
}