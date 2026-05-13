export function NavBar({ activeTab, eventsCount, onTabChange }) {
  return (
    <nav className="nav">
      <div className="nav-logo">
        Boleta<span>Ya</span>
      </div>
      <div className="nav-tabs">
        <button
          className={`nav-tab${activeTab === "cliente" ? " active" : ""}`}
          onClick={() => onTabChange("cliente")}
        >
          🎟️ Comprar boletos <span className="nav-badge">{eventsCount}</span>
        </button>
        <button
          className={`nav-tab${activeTab === "admin" ? " active" : ""}`}
          onClick={() => onTabChange("admin")}
        >
          ⚙️ Gestionar eventos
        </button>
      </div>
    </nav>
  );
}
