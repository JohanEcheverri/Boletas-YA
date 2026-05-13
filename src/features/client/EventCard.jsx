import { fmtCOP, fmtDate } from "../../utils/formatters";

export function EventCard({ event, onSelect }) {
  const minPrecio = Math.min(...event.boletos.map((boleto) => boleto.precio));

  return (
    <div className="event-client-card" onClick={() => onSelect(event)}>
      <div className="card-banner">
        {event.imagen}
        <span className="card-cat-tag">{event.categoria}</span>
      </div>
      <div className="card-body">
        <div className="card-title">{event.nombre}</div>
        <div className="card-meta">
          <span>📍 {event.lugar}</span>
          <span>
            📅 {fmtDate(event.fecha)} · {event.hora}
          </span>
        </div>
        <div className="card-footer">
          <div>
            <div className="price-from">Desde</div>
            <div className="price-amount">{fmtCOP(minPrecio)}</div>
          </div>
          <button className="btn-ver">Ver boletos →</button>
        </div>
      </div>
    </div>
  );
}
