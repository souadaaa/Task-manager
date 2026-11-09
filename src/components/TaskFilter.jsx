import { STATUSES } from "../constants.js";

export default function TaskFilter({ activeFilter, onChange }) {
  return (
    <div className="filters" role="group" aria-label="Filtrer par statut">
      {["Toutes", ...STATUSES].map((option) => (
        <button
          key={option}
          className={option === activeFilter ? "chip active" : "chip"}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}