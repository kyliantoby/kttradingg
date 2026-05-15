import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>KT Trading Cards</h1>
      <p>Webshop is live 🚀</p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
