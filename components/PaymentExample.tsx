"use client";

import React, { useState } from "react";

export default function PaymentExample() {
  // Estado para inputs del usuario
  const [lecturaActual, setLecturaActual] = useState(5250);
  const [lecturaAnterior, setLecturaAnterior] = useState(5000);

  // Cálculo del consumo en kWh
  const consumo = lecturaActual - lecturaAnterior;

  // Tarifa 1A (residencial) - Bloques de consumo
  const precioBasico = 4.50; // Primeros 150 kWh
  const precioIntermedio = 5.50; // De 150 a 300 kWh
  const precioExcedente = 9.50; // Más de 300 kWh

  const LIMITE_BASICO = 150;
  const LIMITE_INTERMEDIO = 300;

  // Cálculo por bloques
  let kwBasico = 0;
  let kwIntermedio = 0;
  let kwExcedente = 0;

  if (consumo <= LIMITE_BASICO) {
    kwBasico = consumo;
  } else if (consumo <= LIMITE_INTERMEDIO) {
    kwBasico = LIMITE_BASICO;
    kwIntermedio = consumo - LIMITE_BASICO;
  } else {
    kwBasico = LIMITE_BASICO;
    kwIntermedio = LIMITE_INTERMEDIO - LIMITE_BASICO;
    kwExcedente = consumo - LIMITE_INTERMEDIO;
  }

  // Cálculo de montos por bloque
  const montoBasico = kwBasico * precioBasico;
  const montoIntermedio = kwIntermedio * precioIntermedio;
  const montoExcedente = kwExcedente * precioExcedente;
  const subtotal = montoBasico + montoIntermedio + montoExcedente;

  // Cargos adicionales
  const cargoFijo = 45.00;
  const impuesto = subtotal * 0.16; // IVA 16%
  const total = subtotal + cargoFijo + impuesto;

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", padding: "2rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Cálculo del consumo de luz (CFE - Tarifa 1A)
      </h2>

      {/* Sección 1: Lectura del medidor */}
      <div style={{ backgroundColor: "#f8f9fa", padding: "1.5rem", borderRadius: 8, marginBottom: "2rem" }}>
        <h4>Paso 1: Obtener la lectura del medidor</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              Lectura actual (kWh):
            </label>
            <input
              type="number"
              value={lecturaActual}
              onChange={(e) => setLecturaActual(Number(e.target.value))}
              style={{ width: "100%", padding: "0.5rem", border: "1px solid #ccc", borderRadius: 4 }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              Lectura anterior (kWh):
            </label>
            <input
              type="number"
              value={lecturaAnterior}
              onChange={(e) => setLecturaAnterior(Number(e.target.value))}
              style={{ width: "100%", padding: "0.5rem", border: "1px solid #ccc", borderRadius: 4 }}
            />
          </div>
        </div>
      </div>

      {/* Sección 2: Cálculo de consumo */}
      <div style={{ backgroundColor: "#e7f3ff", padding: "1.5rem", borderRadius: 8, marginBottom: "2rem", border: "2px solid #0066cc" }}>
        <h4>Paso 2: Calcular consumo en kWh</h4>
        <p style={{ marginTop: "1rem", fontSize: "1.1em" }}>
          <strong>Fórmula:</strong> Consumo = Lectura actual − Lectura anterior
        </p>
        <p style={{ fontSize: "1.1em", marginTop: "0.5rem" }}>
          Consumo = {lecturaActual} − {lecturaAnterior} = <strong>{consumo} kWh</strong>
        </p>
      </div>

      {/* Sección 3: Desglose por bloques */}
      <div style={{ backgroundColor: "#f8f9fa", padding: "1.5rem", borderRadius: 8, marginBottom: "2rem" }}>
        <h4>Paso 3: Aplicar tarifa por bloques (Tarifa 1A Residencial)</h4>
        <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#0066cc", color: "white" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", borderBottom: "2px solid #0066cc" }}>Bloque</th>
              <th style={{ padding: "0.75rem", textAlign: "center", borderBottom: "2px solid #0066cc" }}>kWh</th>
              <th style={{ padding: "0.75rem", textAlign: "center", borderBottom: "2px solid #0066cc" }}>Precio/kWh</th>
              <th style={{ padding: "0.75rem", textAlign: "right", borderBottom: "2px solid #0066cc" }}>Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "0.75rem" }}>Básico (0-150 kWh)</td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>{kwBasico.toFixed(2)}</td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>${precioBasico.toFixed(2)}</td>
              <td style={{ padding: "0.75rem", textAlign: "right" }}>${montoBasico.toFixed(2)}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "0.75rem" }}>Intermedio (151-300 kWh)</td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>{kwIntermedio.toFixed(2)}</td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>${precioIntermedio.toFixed(2)}</td>
              <td style={{ padding: "0.75rem", textAlign: "right" }}>${montoIntermedio.toFixed(2)}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "0.75rem" }}>Excedente (300+ kWh)</td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>{kwExcedente.toFixed(2)}</td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>${precioExcedente.toFixed(2)}</td>
              <td style={{ padding: "0.75rem", textAlign: "right" }}>${montoExcedente.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Sección 4: Desglose final del recibo */}
      <div style={{ backgroundColor: "#fff3cd", padding: "1.5rem", borderRadius: 8, marginBottom: "2rem", border: "2px solid #ffc107" }}>
        <h4>Paso 4: Desglose del recibo final</h4>
        <div style={{ marginTop: "1rem" }}>
          <p style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span>Subtotal por consumo:</span>
            <span><strong>${subtotal.toFixed(2)} MXN</strong></span>
          </p>
          <p style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span>Cargo fijo:</span>
            <span><strong>${cargoFijo.toFixed(2)} MXN</strong></span>
          </p>
          <hr style={{ margin: "0.75rem 0" }} />
          <p style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span>Subtotal antes de IVA:</span>
            <span><strong>${(subtotal + cargoFijo).toFixed(2)} MXN</strong></span>
          </p>
          <p style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span>IVA (16%):</span>
            <span><strong>${impuesto.toFixed(2)} MXN</strong></span>
          </p>
          <hr style={{ margin: "0.75rem 0", borderTop: "2px solid #000" }} />
          <p style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2em" }}>
            <span><strong>Total a pagar:</strong></span>
            <span style={{ color: "#d32f2f", fontSize: "1.3em" }}><strong>${total.toFixed(2)} MXN</strong></span>
          </p>
        </div>
      </div>

      {/* Nota informativa */}
      <div style={{ backgroundColor: "#e8f5e9", padding: "1.5rem", borderRadius: 8, border: "1px solid #4caf50" }}>
        <h5>📌 Notas importantes:</h5>
        <ul style={{ marginLeft: "1.5rem", lineHeight: "1.8" }}>
          <li>Este es un ejemplo basado en la tarifa 1A (residencial) de CFE</li>
          <li>Los precios y bloques pueden variar según tu zona geográfica y tarifa</li>
          <li>Tu recibo real puede incluir otros cargos como impuestos locales o ajustes</li>
          <li>Puedes modificar las lecturas arriba para ver cómo cambia el cálculo</li>
          <li>Consulta tu recibo oficial para ver los precios exactos de tu tarifa</li>
        </ul>
      </div>
    </div>
  );
}
