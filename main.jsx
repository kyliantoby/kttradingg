import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const products = [
  {
    name: "Inferno X Boosterbox",
    price: 120,
    description: "Japanse Inferno X boosterbox, sealed en perfect voor collectors.",
    images: ["inferno-x-side-2.jpeg", "inferno-x-back.jpeg"],
  },
  {
    name: "Mega Dream EX Boosterbox",
    price: 110,
    description: "Japanse Mega Dream EX boosterbox, sealed en ideaal voor moderne collectors.",
    images: [
      "mega-dream-front.jpeg",
      "mega-dream-back.jpeg",
      "mega-dream-side-1.jpeg",
      "mega-dream-side-2.jpeg",
      "mega-dream-side-3.jpeg",
    ],
  },
  {
    name: "Terastal Festival Boosterbox",
    price: 110,
    description: "Premium boosterbox met mooie verzamelwaarde.",
    images: [],
  },
];

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [slide, setSlide] = useState(0);
  const [cart, setCart] = useState([]);

  function openProduct(product) {
    setSelectedProduct(product);
    setSlide(0);
  }

  function nextImage() {
    setSlide((slide + 1) % selectedProduct.images.length);
  }

  function prevImage() {
    setSlide((slide - 1 + selectedProduct.images.length) % selectedProduct.images.length);
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.logo}>KT Trading Cards</h1>
          <p style={styles.subtitle}>Pokémon kaarten & boosterboxen</p>
        </div>
        <div style={styles.cart}>🛒 {cart.length} items</div>
      </header>

      <section style={styles.hero}>
        <div>
          <p style={styles.badge}>Nieuwe sealed collectie</p>
          <h2 style={styles.heroTitle}>Zachte vibes, sterke pulls.</h2>
          <p style={styles.heroText}>
            Shop boosterboxen met een rustige beige uitstraling, luxe productfoto’s
            en verzending uitsluitend binnen Nederland.
          </p>
          <a href="#producten" style={styles.button}>Bekijk producten</a>
        </div>
      </section>

      <section id="producten" style={styles.products}>
        <h2 style={styles.sectionTitle}>Boosterboxen</h2>

        <div style={styles.grid}>
          {products.map((product) => (
            <div key={product.name} style={styles.card} onClick={() => openProduct(product)}>
              <div style={styles.imageBox}>
                {product.images.length > 0 ? (
                  <img src={`/${product.images[0]}`} alt={product.name} style={styles.image} />
                ) : (
                  <div style={styles.placeholder}>📦</div>
                )}
                {product.images.length > 0 && <div style={styles.sliderBadge}>Klik voor slider</div>}
              </div>

              <div style={styles.cardContent}>
                <h3>{product.name}</h3>
                <p style={styles.description}>{product.description}</p>
                <div style={styles.cardBottom}>
                  <strong style={styles.price}>€{product.price}</strong>
                  <button
                    style={styles.smallButton}
                    onClick={(event) => {
                      event.stopPropagation();
                      setCart([...cart, product]);
                    }}
                  >
                    In mandje
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.info}>
        <div style={styles.infoCard}>✅ Betrouwbare verkoop</div>
        <div style={styles.infoCard}>🇳🇱 Alleen verzending in Nederland</div>
        <div style={styles.infoCard}>📦 Sealed producten</div>
      </section>

      {selectedProduct && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <button style={styles.close} onClick={() => setSelectedProduct(null)}>×</button>

            <div style={styles.modalImageArea}>
              {selectedProduct.images.length > 0 ? (
                <>
                  <img
                    src={`/${selectedProduct.images[slide]}`}
                    alt={selectedProduct.name}
                    style={styles.modalImage}
                  />
                  {selectedProduct.images.length > 1 && (
                    <>
                      <button style={styles.prev} onClick={prevImage}>‹</button>
                      <button style={styles.next} onClick={nextImage}>›</button>
                    </>
                  )}
                </>
              ) : (
                <div style={styles.placeholder}>📦</div>
              )}
            </div>

            <div style={styles.modalInfo}>
              <h2>{selectedProduct.name}</h2>
              <h3>€{selectedProduct.price}</h3>
              <p>{selectedProduct.description}</p>
              <p style={styles.note}>
                Bekijk alle kanten van de box. Dit geeft kopers vertrouwen in de sealed staat.
              </p>
            </div>
          </div>
        </div>
      )}

      <footer style={styles.footer}>© 2026 KT Trading Cards</footer>
    </div>
  );
}

const styles = {
  page: {
    background: "#f7efe3",
    minHeight: "100vh",
    color: "#1c1917",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 6%",
    background: "rgba(247,239,227,0.95)",
    borderBottom: "1px solid #e7dccc",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  logo: { margin: 0, fontSize: 28 },
  subtitle: { margin: "4px 0 0", color: "#78716c" },
  cart: {
    background: "white",
    padding: "12px 18px",
    borderRadius: 999,
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  },
  hero: {
    padding: "90px 6%",
    maxWidth: 1000,
  },
  badge: {
    display: "inline-block",
    background: "white",
    padding: "10px 16px",
    borderRadius: 999,
    fontWeight: "bold",
  },
  heroTitle: {
    fontSize: 64,
    maxWidth: 760,
    margin: "22px 0",
    lineHeight: 1,
  },
  heroText: {
    fontSize: 20,
    lineHeight: 1.7,
    maxWidth: 650,
    color: "#57534e",
  },
  button: {
    display: "inline-block",
    marginTop: 24,
    background: "#1c1917",
    color: "white",
    padding: "16px 24px",
    borderRadius: 18,
    textDecoration: "none",
    fontWeight: "bold",
  },
  products: { padding: "40px 6%" },
  sectionTitle: { fontSize: 42 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 28,
  },
  card: {
    background: "white",
    borderRadius: 30,
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
    transition: "transform 0.25s ease",
  },
  imageBox: {
    position: "relative",
    height: 300,
    background: "linear-gradient(135deg, #f8d7a4, #f4eee4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  image: {
    maxHeight: "100%",
    maxWidth: "100%",
    objectFit: "contain",
    filter: "drop-shadow(0 20px 20px rgba(0,0,0,0.25))",
  },
  placeholder: { fontSize: 70 },
  sliderBadge: {
    position: "absolute",
    bottom: 14,
    left: 14,
    background: "rgba(28,25,23,0.85)",
    color: "white",
    padding: "8px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "bold",
  },
  cardContent: { padding: 24 },
  description: { color: "#57534e", lineHeight: 1.6 },
  cardBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  price: { fontSize: 28 },
  smallButton: {
    background: "#1c1917",
    color: "white",
    border: 0,
    borderRadius: 16,
    padding: "12px 16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  info: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
    padding: "40px 6% 80px",
  },
  infoCard: {
    background: "white",
    padding: 26,
    borderRadius: 26,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    fontWeight: "bold",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
    padding: 20,
  },
  modal: {
    background: "#f7efe3",
    borderRadius: 32,
    maxWidth: 1000,
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1.3fr 0.7fr",
    overflow: "hidden",
    position: "relative",
  },
  close: {
    position: "absolute",
    right: 16,
    top: 16,
    zIndex: 10,
    border: 0,
    borderRadius: "50%",
    width: 42,
    height: 42,
    fontSize: 28,
    cursor: "pointer",
    background: "white",
  },
  modalImageArea: {
    position: "relative",
    minHeight: 560,
    background: "#111",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  modalImage: {
    maxWidth: "100%",
    maxHeight: 500,
    objectFit: "contain",
    borderRadius: 20,
  },
  modalInfo: { padding: 40, lineHeight: 1.7 },
  note: {
    background: "white",
    padding: 18,
    borderRadius: 18,
    color: "#57534e",
  },
  prev: {
    position: "absolute",
    left: 20,
    fontSize: 50,
    border: 0,
    borderRadius: "50%",
    width: 54,
    height: 54,
    cursor: "pointer",
  },
  next: {
    position: "absolute",
    right: 20,
    fontSize: 50,
    border: 0,
    borderRadius: "50%",
    width: 54,
    height: 54,
    cursor: "pointer",
  },
  footer: {
    textAlign: "center",
    padding: 30,
    borderTop: "1px solid #e7dccc",
    color: "#78716c",
  },
};

createRoot(document.getElementById("root")).render(<App />);
