import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const products = [
  {
    name: "Inferno X Boosterbox",
    price: 120,
    description: "Japanse Inferno X boosterbox, sealed en perfect voor collectors.",
    images: ["/inferno-x-side-2.jpeg", "/inferno-x-back.jpeg"],
    emoji: "🔥",
  },
  {
    name: "Mega Dream EX Boosterbox",
    price: 110,
    description: "Japanse Mega Dream EX boosterbox, sealed en ideaal voor moderne collectors.",
    images: [
      "/mega-dream-front.jpeg",
      "/mega-dream-back.jpeg",
      "/mega-dream-side-1.jpeg",
      "/mega-dream-side-2.jpeg",
      "/mega-dream-side-3.jpeg",
    ],
    emoji: "✨",
  },
  {
    name: "Terastal Festival Boosterbox",
    price: 110,
    description: "Premium boosterbox met mooie verzamelwaarde.",
    images: [],
    emoji: "💎",
  },
];

function App() {
  const [selected, setSelected] = useState(null);
  const [slide, setSlide] = useState(0);
  const [cart, setCart] = useState([]);

  const currentImage = selected?.images?.[slide];

  return (
    <div style={s.page}>
      <header style={s.header}>
        <div>
          <h1 style={s.logo}>KT Trading Cards</h1>
          <p style={s.sub}>Pokémon kaarten & boosterboxen</p>
        </div>
        <div style={s.cart}>🛒 {cart.length} items</div>
      </header>

      <section style={s.hero}>
        <div>
          <p style={s.badge}>Nieuwe sealed collectie</p>
          <h2 style={s.heroTitle}>Zachte vibes, sterke pulls.</h2>
          <p style={s.heroText}>
            Luxe boosterboxen met rustige beige uitstraling, echte productfoto’s
            en verzending uitsluitend binnen Nederland.
          </p>
        </div>

        <div style={s.banner}>
          {products.map((p) => (
            <div key={p.name} style={s.bannerCard} onClick={() => { setSelected(p); setSlide(0); }}>
              {p.images[0] ? (
                <img src={p.images[0]} style={s.bannerImg} />
              ) : (
                <div style={s.fakeBox}>{p.emoji}</div>
              )}
              <strong>{p.name}</strong>
              <span>€{p.price}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={s.products}>
        <h2 style={s.sectionTitle}>Boosterboxen</h2>

        <div style={s.grid}>
          {products.map((p) => (
            <div key={p.name} style={s.card} onClick={() => { setSelected(p); setSlide(0); }}>
              <div style={s.imageBox}>
                {p.images[0] ? (
                  <img src={p.images[0]} style={s.productImg} />
                ) : (
                  <div style={s.fakeBox}>{p.emoji}</div>
                )}
                <div style={s.label}>Klik voor slider</div>
              </div>

              <div style={s.content}>
                <h3>{p.name}</h3>
                <p style={s.desc}>{p.description}</p>
                <div style={s.bottom}>
                  <strong style={s.price}>€{p.price}</strong>
                  <button
                    style={s.btn}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCart([...cart, p]);
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

      <section style={s.info}>
        <div style={s.infoCard}>✅ Betrouwbare verkoop</div>
        <div style={s.infoCard}>🇳🇱 Alleen verzending in Nederland</div>
        <div style={s.infoCard}>📦 Sealed boosterboxen</div>
      </section>

      {selected && (
        <div style={s.overlay}>
          <div style={s.modal}>
            <button style={s.close} onClick={() => setSelected(null)}>×</button>

            <div style={s.modalLeft}>
              {currentImage ? (
                <img src={currentImage} style={s.modalImg} />
              ) : (
                <div style={s.bigFake}>{selected.emoji}</div>
              )}

              {selected.images.length > 1 && (
                <>
                  <button
                    style={s.prev}
                    onClick={() => setSlide((slide - 1 + selected.images.length) % selected.images.length)}
                  >
                    ‹
                  </button>
                  <button
                    style={s.next}
                    onClick={() => setSlide((slide + 1) % selected.images.length)}
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            <div style={s.modalRight}>
              <p style={s.badge}>Sealed product</p>
              <h2>{selected.name}</h2>
              <h3>€{selected.price}</h3>
              <p>{selected.description}</p>
              <p style={s.note}>
                Bekijk alle kanten van de box met de slider. Dit geeft kopers vertrouwen
                in de sealed staat van het product.
              </p>
            </div>
          </div>
        </div>
      )}

      <footer style={s.footer}>© 2026 KT Trading Cards</footer>
    </div>
  );
}

const s = {
  page: { background: "#f7efe3", minHeight: "100vh", fontFamily: "Arial", color: "#1c1917" },
  header: { position: "sticky", top: 0, zIndex: 5, background: "#f7efe3ee", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 6%", borderBottom: "1px solid #e8dcc9" },
  logo: { margin: 0, fontSize: 30 },
  sub: { margin: "4px 0 0", color: "#78716c" },
  cart: { background: "white", padding: "12px 18px", borderRadius: 999, boxShadow: "0 8px 20px #0001" },
  hero: { padding: "80px 6% 50px" },
  badge: { display: "inline-block", background: "white", padding: "10px 16px", borderRadius: 999, fontWeight: "bold", boxShadow: "0 8px 20px #0001" },
  heroTitle: { fontSize: 64, maxWidth: 760, lineHeight: 1, margin: "22px 0" },
  heroText: { fontSize: 20, maxWidth: 700, color: "#57534e", lineHeight: 1.7 },
  banner: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 24, marginTop: 45 },
  bannerCard: { background: "white", borderRadius: 28, padding: 22, boxShadow: "0 18px 40px #0002", cursor: "pointer", display: "flex", flexDirection: "column", gap: 12 },
  bannerImg: { height: 230, width: "100%", objectFit: "contain", filter: "drop-shadow(0 18px 18px #0004)" },
  products: { padding: "40px 6%" },
  sectionTitle: { fontSize: 42 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 28 },
  card: { background: "white", borderRadius: 30, overflow: "hidden", boxShadow: "0 16px 40px #0002", cursor: "pointer" },
  imageBox: { position: "relative", height: 310, background: "linear-gradient(135deg,#f8d7a4,#f4eee4)", display: "flex", justifyContent: "center", alignItems: "center", padding: 20 },
  productImg: { maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "drop-shadow(0 18px 20px #0005)" },
  fakeBox: { width: 170, height: 230, borderRadius: 22, background: "linear-gradient(135deg,#111,#f59e0b,#38bdf8)", display: "grid", placeItems: "center", fontSize: 70, boxShadow: "0 20px 30px #0004" },
  bigFake: { fontSize: 120 },
  label: { position: "absolute", left: 14, bottom: 14, background: "#1c1917dd", color: "white", padding: "8px 12px", borderRadius: 999, fontSize: 12, fontWeight: "bold" },
  content: { padding: 24 },
  desc: { color: "#57534e", lineHeight: 1.6 },
  bottom: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18 },
  price: { fontSize: 28 },
  btn: { background: "#1c1917", color: "white", border: 0, padding: "12px 16px", borderRadius: 16, fontWeight: "bold", cursor: "pointer" },
  info: { padding: "40px 6% 80px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 },
  infoCard: { background: "white", padding: 26, borderRadius: 24, boxShadow: "0 10px 25px #0001", fontWeight: "bold" },
  overlay: { position: "fixed", inset: 0, background: "#000b", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 20 },
  modal: { background: "#f7efe3", borderRadius: 32, maxWidth: 1050, width: "100%", display: "grid", gridTemplateColumns: "1.2fr .8fr", overflow: "hidden", position: "relative" },
  close: { position: "absolute", right: 16, top: 16, zIndex: 3, width: 42, height: 42, borderRadius: "50%", border: 0, fontSize: 28, cursor: "pointer" },
  modalLeft: { position: "relative", minHeight: 560, background: "#111", display: "flex", alignItems: "center", justifyContent: "center", padding: 28 },
  modalImg: { maxWidth: "100%", maxHeight: 510, objectFit: "contain", borderRadius: 18 },
  modalRight: { padding: 40, lineHeight: 1.7 },
  note: { background: "white", padding: 18, borderRadius: 18, color: "#57534e" },
  prev: { position: "absolute", left: 20, fontSize: 48, border: 0, borderRadius: "50%", width: 56, height: 56, cursor: "pointer" },
  next: { position: "absolute", right: 20, fontSize: 48, border: 0, borderRadius: "50%", width: 56, height: 56, cursor: "pointer" },
  footer: { textAlign: "center", padding: 30, color: "#78716c", borderTop: "1px solid #e8dcc9" },
};

createRoot(document.getElementById("root")).render(<App />);
