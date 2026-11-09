import { useState } from "react";
import { STATUSES } from "../constants.js";

export default function TaskForm({ taskToEdit, onSave, onCancel }) {
  const [title, setTitle] = useState(taskToEdit?.title ?? "");
  const [startDate, setStartDate] = useState(taskToEdit?.startDate ?? "");
  const [endDate, setEndDate] = useState(taskToEdit?.endDate ?? "");
  const [status, setStatus] = useState(taskToEdit?.status ?? STATUSES[0]);
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Le titre est obligatoire.";
    if (!startDate) newErrors.startDate = "Choisissez une date de début.";
    if (!endDate) newErrors.endDate = "Choisissez une date de fin.";
    if (startDate && endDate && endDate < startDate) {
      newErrors.endDate = "La date de fin doit être égale ou postérieure à la date de début.";
    }
    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSave({ id: taskToEdit?.id, title: title.trim(), startDate, endDate, status });
    if (!taskToEdit) {
      setTitle("");
      setStartDate("");
      setEndDate("");
      setStatus(STATUSES[0]);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <h2>{taskToEdit ? "Modifier la tâche" : "Nouvelle tâche"}</h2>

      <label>
        Titre
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        {errors.title && <span className="error">{errors.title}</span>}
      </label>

      <div className="row">
        <label>
          Début
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          {errors.startDate && <span className="error">{errors.startDate}</span>}
        </label>
        <label>
          Fin
          <input type="date" value={endDate} min={startDate} onChange={(e) => setEndDate(e.target.value)} />
          {errors.endDate && <span className="error">{errors.endDate}</span>}
        </label>
      </div>

      <label>
        Statut
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>

      <div className="row">
        <button type="submit" className="primary">
          {taskToEdit ? "Enregistrer" : "Ajouter la tâche"}
        </button>
        {taskToEdit && (
          <button type="button" onClick={onCancel}>
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}