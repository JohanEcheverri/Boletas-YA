import { useState } from "react";
import { fmtCOP, fmtDate } from "../../utils/formatters";

export function TicketModal({ event, onClose, onCompra }) {
  const [qty, setQty] = useState(event.boletos.map(() => 0));
  const [step, setStep] = useState("select");

  const total = qty.reduce((acc, cantidad, index) => acc + cantidad * event.boletos[index].precio, 0);
  const items = qty.map((cantidad, index) => ({ ...event.boletos[index], qty: cantidad })).filter((boleto) => boleto.qty > 0);

  const handleComprar = () => {
    setStep("success");
    onCompra(event.id, qty);
  };

  const updateQty = (index, change) => {
    setQty((currentQty) => currentQty.map((value, currentIndex) => (currentIndex === index ? value + change : value)));
  };

  return (
    <div className="modal-overlay" onClick={(eventClick) => eventClick.target === eventClick.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-banner">
          {event.imagen}
          <button className="modal-close" onClick={onClose}>
            x
          </button>
        </div>
        <div className="modal-body">
          {step === "success" ? (
            <>
              <div className="success-banner">
                <div className="success-icon">🎉</div>
                <div className="success-title">Compra exitosa!</div>
                <div className="success-sub">Tus boletos han sido enviados a tu correo electronico.</div>
              </div>
              <PurchaseSummary items={items} total={total} title="Resumen de compra" totalLabel="Total pagado" />
              <button className="btn-comprar" onClick={onClose}>
                Cerrar
              </button>
            </>
          ) : (
            <>
              <div className="modal-cat">{event.categoria}</div>
              <div className="modal-title">{event.nombre}</div>
              <div className="modal-meta">
                <span>📍 {event.lugar}</span>
                <span>
                  📅 {fmtDate(event.fecha)} a las {event.hora}
                </span>
              </div>
              {event.descripcion && <div className="modal-desc">{event.descripcion}</div>}

              <div className="ticket-section-title">Selecciona boletos</div>
              <div className="boleto-selector">
                {event.boletos.map((boleto, index) => (
                  <div key={index} className="boleto-option">
                    <div className="boleto-option-info">
                      <div className="boleto-tipo">{boleto.tipo}</div>
                      <div className="boleto-disp">{boleto.disponibles - qty[index]} disponibles</div>
                    </div>
                    <div className="boleto-option-right">
                      <div className="boleto-precio">{fmtCOP(boleto.precio)}</div>
                      <div className="qty-control">
                        <button className="qty-btn" disabled={qty[index] === 0} onClick={() => updateQty(index, -1)}>
                          -
                        </button>
                        <span className="qty-val">{qty[index]}</span>
                        <button
                          className="qty-btn"
                          disabled={qty[index] >= boleto.disponibles}
                          onClick={() => updateQty(index, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {total > 0 && <PurchaseSummary items={items} total={total} title="Resumen" totalLabel="Total" />}
              <button className="btn-comprar" disabled={total === 0} onClick={handleComprar}>
                {total === 0 ? "Selecciona al menos un boleto" : `Comprar - ${fmtCOP(total)}`}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PurchaseSummary({ items, total, title, totalLabel }) {
  return (
    <div className="resumen">
      <div className="resumen-title">{title}</div>
      {items.map((boleto, index) => (
        <div key={index} className="resumen-row">
          <span>
            {boleto.qty}x {boleto.tipo}
          </span>
          <span>{fmtCOP(boleto.qty * boleto.precio)}</span>
        </div>
      ))}
      <div className="resumen-total">
        <span>{totalLabel}</span>
        <span>{fmtCOP(total)}</span>
      </div>
    </div>
  );
}
