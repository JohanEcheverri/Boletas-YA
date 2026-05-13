import { fmtCOP, fmtDate } from "../../utils/formatters";

export function AdminCard({ event, onDelete }) {
  return (
    <div className="event-admin-card">
      <div className="event-card-banner">{event.imagen}</div>
      <div className="event-card-body">
        <span className="event-cat">{event.categoria}</span>
        <div className="event-card-title">{event.nombre}</div>
        <div className="event-meta">
          <span>📍 {event.lugar}</span>
          <span>
            📅 {fmtDate(event.fecha)} - {event.hora}
          </span>
        </div>
        <div className="boleto-pills">
          {event.boletos.map((boleto, index) => (
            <span key={index} className="boleto-pill">
              {boleto.tipo} · {fmtCOP(boleto.precio)} · {boleto.disponibles} cupos
            </span>
          ))}
        </div>
        <button className="btn-delete" onClick={() => onDelete(event.id)}>
          Eliminar evento
        </button>
      </div>
    </div>
  );
}
