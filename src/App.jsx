import { useState } from "react";
import { NavBar } from "./components/NavBar";
import { Toast } from "./components/Toast";
import { initialEvents } from "./data/events";
import { AdminView } from "./features/admin/AdminView";
import { ClientView } from "./features/client/ClientView";
import "./styles/boletos.css";

export default function App() {
  const [tab, setTab] = useState("cliente");
  const [events, setEvents] = useState(initialEvents);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="app">
      <NavBar activeTab={tab} eventsCount={events.length} onTabChange={setTab} />

      {tab === "cliente" ? (
        <ClientView events={events} setEvents={setEvents} showToast={showToast} />
      ) : (
        <AdminView events={events} setEvents={setEvents} showToast={showToast} />
      )}

      <Toast message={toast} />
    </div>
  );
}
