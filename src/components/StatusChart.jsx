import { STATUSES } from "../constants.js";

export default function StatusChart({ tasks }) {
  const total = tasks.length;
  const counts = STATUSES.map((s) => tasks.filter((t) => t.status === s).length);

  return (
    <section className="chart" aria-label="Répartition des tâches par statut">
      <h2>Répartition par statut</h2>
      {total === 0 ? (
        <p className="empty">Le graphique apparaîtra avec votre première tâche.</p>
      ) : (
        <>
          <div className="bar">
            {counts.map((count, i) =>
              count > 0 ? (
                <div
                  key={STATUSES[i]}
                  className={`segment status-${i}`}
                  style={{ width: `${(count / total) * 100}%` }}
                  title={`${STATUSES[i]} : ${count}`}
                />
              ) : null
            )}
          </div>
          <ul className="legend">
            {STATUSES.map((s, i) => (
              <li key={s}>
                <span className={`dot status-${i}`} />
                {s} : {counts[i]} ({Math.round((counts[i] / total) * 100)} %)
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}