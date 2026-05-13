import { useState } from "react";
import { categorias } from "../../data/events";
import { EventCard } from "./EventCard";
import { TicketModal } from "./TicketModal";

export function ClientView({ events, setEvents, showToast }) {
  const [filtro, setFiltro] = useState("Todos");
  const [modal, setModal] = useState(null);

  const filteredEvents = filtro === "Todos" ? events : events.filter((event) => event.categoria === filtro);
  const visibleCategories = ["Todos", ...categorias.filter((categoria) => events.some((event) => event.categoria === categoria))];

  const handleCompra = (eventId, qty) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) => {
        if (event.id !== eventId) return event;

        return {
          ...event,
          boletos: event.boletos.map((boleto, index) => ({
            ...boleto,
            disponibles: boleto.disponibles - qty[index],
          })),
        };
      }),
    );
    showToast("🎟️ Boletos comprados! Revisa tu correo");
  };

  return (
    <div className="client-layout">
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">Plataforma de eventos</div>
          <div className="hero-title">
            Vive experiencias
            <br />
            <em>inolvidables</em>
          </div>
          <div className="hero-sub">{events.length} eventos disponibles en Colombia</div>
        </div>
      </div>

      <div className="client-content">
        <div className="filter-bar">
          {visibleCategories.map((categoria) => (
            <button
              key={categoria}
              className={`filter-btn${filtro === categoria ? " active" : ""}`}
              onClick={() => setFiltro(categoria)}
            >
              {categoria}
            </button>
          ))}
        </div>

        {filteredEvents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <div className="empty-state-text">No hay eventos en esta categoria aun</div>
          </div>
        ) : (
          <div className="events-catalog">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} onSelect={setModal} />
            ))}
          </div>
        )}
      </div>

      {modal && <TicketModal event={modal} onClose={() => setModal(null)} onCompra={handleCompra} />}
    </div>
  );
}
