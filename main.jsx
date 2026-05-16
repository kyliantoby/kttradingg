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

function ProductImage({ product, style }) {
  const [failed, setFailed] = useState(false);
  const img = product.images?.[0];

  if (img && !failed) {
    return (
      <img
        src={img}
        alt={product.name}
        style={style}
        onError={() => setFailed(true)}
      />
    );
  }

  return <div style={s.fakeBox}>{product.emoji}</div>;
}

function App() {
  const [selected, setSelected] = useState(null);
  const [slide, setSlide] = useState(0);
  const [cart, setCart] = useState([]);

  const currentImage = selected?.images?.[slide];

  return (
    <div style={s.page}>
      <header style={s.header}>
        <h1 style={s.logo}>KT Trading Cards</h1>
        <p style={s.sub}>Pokémon kaarten & boosterboxen</p>
        <div style={s.cart}>🛒 {cart.length} items</div>
      </header>

      <section style={s.hero}>
        <p style={s.badge}>Nieuwe sealed collectie</p>
        <h2 style={s.heroTitle}>Sealed Pokémon boosterboxen voor echte collectors.</h2>
        <p style={s.heroText}>
          Ontdek onze huidige collectie Japanse boosterboxen. Wij focussen op duidelijke
          productinformatie, nette verzending en een betrouwbare koopervaring.
        </p>

        <div style={s.banner}>
          {products.map((p) => (
            <div key={p.name} style={s.bannerCard} onClick={() => { setSelected(p); setSlide(0); }}>
              <ProductImage product={p} style={s.bannerImg} />
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
                <ProductImage product={p} style={s.productImg} />
                <div style={s.label}>Klik voor details</div>
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
        <div style={s.infoCard}>
          <h3>✅ Betrouwbare verkoop</h3>
          <p>
            Wij willen kopers een duidelijke en eerlijke ervaring bieden. Producten worden
            netjes verpakt en verzonden met DHL, zodat je bestelling veilig en traceerbaar
            onderweg is.
          </p>
        </div>

        <div style={s.infoCard}>
          <h3>🇳🇱 Alleen verzending in Nederland</h3>
          <p>
            Wij kiezen er bewust voor om ons eerst te richten op Nederlandse kopers.
            Zo kunnen we de verzendkosten laag houden en proberen we de beste prijs
            te garanderen voor collectors in Nederland.
          </p>
        </div>

        <div style={s.infoCard}>
          <h3>📦 Webshop in aanbouw</h3>
          <p>
            Onze webshop is nog deels in aanbouw. Heb je ideeën voor toekomstige producten?
            Mail ons gerust via{" "}
            <a href="mailto:kttradingscards@gmail.com">kttradingscards@gmail.com</a>.
          </p>
        </div>
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
                Bekijk de beschikbare foto’s van de box. Dit geeft kopers extra vertrouwen
                in de staat van het product.
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
  header: {
    textAlign: "center",
    padding: "28px 6%",
    borderBottom: "1px solid #e8dcc9",
    background: "#f7efe3ee",
    position: "sticky",
    top: 0,
    zIndex: 5,
  },
  logo: { margin: 0, fontSize: 34 },
  sub: { margin: "6px 0", color: "#78716c" },
  cart: { display: "inline-block", marginTop: 10, background: "white", padding: "10px 18px", borderRadius: 999 },
  hero: { padding: "70px 6% 50px", textAlign: "center" },
  badge: { display: "inline-block", background: "white", padding: "10px 16px", borderRadius: 999, fontWeight: "bold" },
  heroTitle: { fontSize: 56, maxWidth: 900, margin: "22px auto", lineHeight: 1.05 },
  heroText: { fontSize: 20, maxWidth: 760, margin: "0 auto", color: "#57534e", lineHeight: 1.7 },
  banner: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 24, marginTop: 45 },
  bannerCard: { background: "white", borderRadius: 28, padding: 22, boxShadow: "0 18px 40px #0002", cursor: "pointer" },
  bannerImg: { height: 230, width: "100%", objectFit: "contain" },
  products: { padding: "40px 6%" },
  sectionTitle: { fontSize: 42 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 28 },
  card: { background: "white", borderRadius: 30, overflow: "hidden", boxShadow: "0 16px 40px #0002", cursor: "pointer" },
  imageBox: { position: "relative", height: 310, background: "linear-gradient(135deg,#f8d7a4,#f4eee4)", display: "flex", justifyContent: "center", alignItems: "center", padding: 20 },
  productImg: { maxWidth: "100%", maxHeight: "100%", objectFit: "contain" },
  fakeBox: { width: 170, height: 230, borderRadius: 22, background: "linear-gradient(135deg,#111,#f59e0b,#38bdf8)", display: "grid", placeItems: "center", fontSize: 70, boxShadow: "0 20px 30px #0004", margin: "0 auto" },
  bigFake: { fontSize: 120 },
  label: { position: "absolute", left: 14, bottom: 14, background: "#1c1917dd", color: "white", padding: "8px 12px", borderRadius: 999, fontSize: 12, fontWeight: "bold" },
  content: { padding: 24 },
  desc: { color: "#57534e", lineHeight: 1.6 },
  bottom: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18 },
  price: { fontSize: 28 },
  btn: { background: "#1c1917", color: "white", border: 0, padding: "12px 16px", borderRadius: 16, fontWeight: "bold", cursor: "pointer" },
  info: { padding: "40px 6% 80px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 },
  infoCard: { background: "white", padding: 26, borderRadius: 24, boxShadow: "0 10px 25px #0001", lineHeight: 1.6 },
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
