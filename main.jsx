import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <div style={{ background: "#f7efe3", minHeight: "100vh", padding: 40, fontFamily: "Arial" }}>
      <h1>KT Trading Cards</h1>
      <p>De webshop werkt nu.</p>

      <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
        <div style={{ background: "white", padding: 20, borderRadius: 20 }}>
          <h2>Inferno X Boosterbox</h2>
          <p>€120</p>
          <img src="/inferno-x-side-2.jpeg" style={{ width: 220 }} />
        </div>

        <div style={{ background: "white", padding: 20, borderRadius: 20 }}>
          <h2>Mega Dream EX Boosterbox</h2>
          <p>€110</p>
          <img src="/mega-dream-front.jpeg" style={{ width: 220 }} />
        </div>

        <div style={{ background: "white", padding: 20, borderRadius: 20 }}>
          <h2>Terastal Festival Boosterbox</h2>
          <p>€110</p>
          <div style={{ fontSize: 80 }}>📦</div>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
