import { useState } from "react";
import { categorias, eventEmojis } from "../../data/events";

const emptyBoleto = { tipo: "", precio: "", disponibles: "" };
const emptyForm = {
  nombre: "",
  lugar: "",
  fecha: "",
  hora: "",
  descripcion: "",
  imagen: "🎟️",
  categoria: "Musica",
  boletos: [{ ...emptyBoleto }],
};

export function AdminForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm);

  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const setBoleto = (index, key, value) => {
    setForm((current) => {
      const boletos = [...current.boletos];
      boletos[index] = { ...boletos[index], [key]: value };
      return { ...current, boletos };
    });
  };

  const addBoleto = () => {
    setForm((current) => ({ ...current, boletos: [...current.boletos, { ...emptyBoleto }] }));
  };

  const removeBoleto = (index) => {
    setForm((current) => ({
      ...current,
      boletos: current.boletos.filter((_, currentIndex) => currentIndex !== index),
    }));
  };

  const handleSubmit = () => {
    if (!form.nombre || !form.fecha || !form.lugar) {
      alert("Nombre, lugar y fecha son obligatorios.");
      return;
    }

    const boletosValidos = form.boletos.filter((boleto) => boleto.tipo && boleto.precio && boleto.disponibles);

    if (!boletosValidos.length) {
      alert("Agrega al menos un tipo de boleto completo.");
      return;
    }

    onAdd({
      ...form,
      id: Date.now(),
      boletos: boletosValidos.map((boleto) => ({
        ...boleto,
        precio: Number(boleto.precio),
        disponibles: Number(boleto.disponibles),
      })),
    });

    setForm({ ...emptyForm, boletos: [{ ...emptyBoleto }] });
  };

  return (
    <div className="admin-form-panel">
      <div className="panel-title">Nuevo evento</div>
      <div className="panel-sub">Completa la informacion para publicar</div>

      <div className="form-group">
        <label className="form-label">Nombre del evento</label>
        <input
          className="form-input"
          placeholder="ej. Festival de Jazz Nocturno"
          value={form.nombre}
          onChange={(event) => set("nombre", event.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Lugar</label>
        <input
          className="form-input"
          placeholder="ej. Teatro Metropolitano, Bogota"
          value={form.lugar}
          onChange={(event) => set("lugar", event.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Fecha</label>
          <input
            className="form-input"
            type="date"
            value={form.fecha}
            onChange={(event) => set("fecha", event.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Hora</label>
          <input
            className="form-input"
            type="time"
            value={form.hora}
            onChange={(event) => set("hora", event.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Categoria</label>
          <select
            className="form-select"
            value={form.categoria}
            onChange={(event) => set("categoria", event.target.value)}
          >
            {categorias.map((categoria) => (
              <option key={categoria}>{categoria}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Icono</label>
          <select className="form-select" value={form.imagen} onChange={(event) => set("imagen", event.target.value)}>
            {eventEmojis.map((emoji) => (
              <option key={emoji} value={emoji}>
                {emoji}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Descripcion</label>
        <textarea
          className="form-textarea"
          placeholder="Describe el evento..."
          value={form.descripcion}
          onChange={(event) => set("descripcion", event.target.value)}
        />
      </div>

      <div className="section-divider">Tipos de boletos</div>

      {form.boletos.map((boleto, index) => (
        <div key={index} className="boleto-row">
          <input
            className="form-input"
            placeholder="Tipo (ej. General)"
            value={boleto.tipo}
            onChange={(event) => setBoleto(index, "tipo", event.target.value)}
          />
          <input
            className="form-input"
            placeholder="Precio"
            type="number"
            value={boleto.precio}
            onChange={(event) => setBoleto(index, "precio", event.target.value)}
          />
          <input
            className="form-input"
            placeholder="Cupos"
            type="number"
            value={boleto.disponibles}
            onChange={(event) => setBoleto(index, "disponibles", event.target.value)}
          />
          {form.boletos.length > 1 && (
            <button className="btn-icon" onClick={() => removeBoleto(index)}>
              x
            </button>
          )}
        </div>
      ))}

      <button className="btn-add" onClick={addBoleto}>
        + Agregar tipo de boleto
      </button>
      <button className="btn-primary" onClick={handleSubmit}>
        Publicar evento →
      </button>
    </div>
  );
}
