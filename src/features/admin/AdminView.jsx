import { AdminCard } from "./AdminCard";
import { AdminForm } from "./AdminForm";

export function AdminView({ events, setEvents, showToast }) {
  const handleAdd = (event) => {
    setEvents((currentEvents) => [event, ...currentEvents]);
    showToast("✓ Evento publicado exitosamente");
  };

  const handleDelete = (eventId) => {
    if (confirm("Eliminar este evento?")) {
      setEvents((currentEvents) => currentEvents.filter((event) => event.id !== eventId));
    }
  };

  return (
    <div className="admin-layout">
      <AdminForm onAdd={handleAdd} />
      <div className="admin-list-panel">
        <div className="panel-title">Eventos publicados</div>
        <div className="panel-sub admin-count">
          {events.length} evento{events.length !== 1 ? "s" : ""} en la plataforma
        </div>
        {events.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🎟️</div>
            <div className="empty-state-text">Aun no hay eventos publicados</div>
          </div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <AdminCard key={event.id} event={event} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
