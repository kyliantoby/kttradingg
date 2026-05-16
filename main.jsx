import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const SHIPPING_COST = 5.95;

const products = [
  {
    id: 1,
    name: "Inferno X Boosterbox",
    price: 120,
    description:
      "Japanse Inferno X boosterbox, factory sealed en perfect voor Pokémon collectors.",
    images: [
      "/images/inferno-front.jpeg",
      "/images/inferno-side-1.jpeg",
      "/images/inferno-side-2.jpeg",
      "/images/inferno-back.jpeg",
    ],
    emoji: "🔥",
  },

  {
    id: 2,
    name: "Mega Dream EX Boosterbox",
    price: 110,
    description:
      "Japanse Mega Dream EX boosterbox, factory sealed en ideaal voor moderne Pokémon collectors.",
    images: [
      "/images/mega-front.jpeg",
      "/images/mega-side-1.jpeg",
      "/images/mega-side-2.jpeg",
      "/images/mega-side-3.jpeg",
      "/images/mega-back.jpeg",
    ],
    emoji: "✨",
  },

  {
    id: 3,
    name: "Terastal Festival Boosterbox",
    price: 110,
    description:
      "Premium boosterbox met mooie verzamelwaarde.",
    images: [],
    emoji: "💎",
  },
];

function formatPrice(value) {
  return `€${value.toFixed(2).replace(".", ",")}`;
}

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

  return (
    <div style={s.fakeBox}>
      <div>{product.emoji}</div>
      <small>{product.name}</small>
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState(null);
  const [slide, setSlide] = useState(0);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("shop");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const total =
    cart.length > 0
      ? subtotal + SHIPPING_COST
      : 0;

  function addToCart(product) {
    setCart([...cart, product]);
  }

  function removeFromCart(index) {
    setCart(cart.filter((_, i) => i !== index));
  }

  const currentImage =
    selected?.images?.[slide];

  if (page === "checkout") {
    return (
      <div style={s.page}>
        <header style={s.header}>
          <h1 style={s.logo}>
            KT Trading Cards
          </h1>

          <p style={s.sub}>Afrekenen</p>

          <button
            style={s.backBtn}
            onClick={() =>
              setPage("shop")
            }
          >
            ← Verder winkelen
          </button>
        </header>

        <main style={s.checkout}>
          <section style={s.checkoutLeft}>
            <h2 style={s.checkoutTitle}>
              Winkelmandje
            </h2>

            {cart.length === 0 ? (
              <div style={s.emptyCart}>
                <h3>
                  Je mandje is leeg
                </h3>

                <p>
                  Voeg eerst een
                  product toe.
                </p>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  style={s.cartItem}
                >
                  <ProductImage
                    product={item}
                    style={s.cartImg}
                  />

                  <div>
                    <strong>
                      {item.name}
                    </strong>

                    <p style={s.desc}>
                      Sealed Japanse
                      boosterbox
                    </p>

                    <button
                      style={s.remove}
                      onClick={() =>
                        removeFromCart(
                          index
                        )
                      }
                    >
                      Verwijderen
                    </button>
                  </div>

                  <strong>
                    {formatPrice(
                      item.price
                    )}
                  </strong>
                </div>
              ))
            )}

            <div style={s.formBox}>
              <h2>
                Verzendgegevens
              </h2>

              <div style={s.formGrid}>
                <input
                  style={s.input}
                  placeholder="Voornaam"
                />

                <input
                  style={s.input}
                  placeholder="Achternaam"
                />

                <input
                  style={s.inputFull}
                  placeholder="E-mailadres"
                />

                <input
                  style={s.inputFull}
                  placeholder="Adres"
                />

                <input
                  style={s.input}
                  placeholder="Postcode"
                />

                <input
                  style={s.input}
                  placeholder="Plaats"
                />
              </div>

              <p style={s.noteText}>
                Alleen verzending
                binnen Nederland.
              </p>
            </div>
          </section>

          <aside style={s.summary}>
            <h2>
              Besteloverzicht
            </h2>

            <div style={s.row}>
              <span>Producten</span>

              <strong>
                {formatPrice(
                  subtotal
                )}
              </strong>
            </div>

            <div style={s.shipping}>
              <strong>
                DHL Track & Trace
              </strong>

              <p>
                Veilig verzonden
                binnen Nederland
                met DHL.
              </p>

              <div style={s.row}>
                <span>
                  Verzendkosten
                </span>

                <strong>
                  {cart.length > 0
                    ? formatPrice(
                        SHIPPING_COST
                      )
                    : formatPrice(
                        0
                      )}
                </strong>
              </div>
            </div>

            <div style={s.total}>
              <span>Totaal</span>

              <strong>
                {formatPrice(total)}
              </strong>
            </div>

            <button style={s.payBtn}>
              Doorgaan naar betalen
            </button>

            <p style={s.noteText}>
              iDEAL checkout wordt
              later toegevoegd.
            </p>
          </aside>
        </main>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <header style={s.header}>
        <h1 style={s.logo}>
          KT Trading Cards
        </h1>

        <p style={s.sub}>
          Pokémon kaarten &
          boosterboxen
        </p>

        <button
          style={s.cartBtn}
          onClick={() =>
            setPage("checkout")
          }
        >
          🛒 {cart.length} items
        </button>
      </header>

      <section style={s.hero}>
        <p style={s.badge}>
          Nieuwe sealed collectie
        </p>

        <h2 style={s.heroTitle}>
          Sealed Pokémon
          boosterboxen voor echte
          collectors.
        </h2>

        <p style={s.heroText}>
          Ontdek onze huidige
          collectie Japanse
          boosterboxen. Netjes
          verpakt en verzonden
          met DHL Track & Trace
          binnen Nederland.
        </p>

        <div style={s.banner}>
          {products.map((p) => (
            <div
              key={p.id}
              style={s.bannerCard}
              onClick={() => {
                setSelected(p);
                setSlide(0);
              }}
            >
              <ProductImage
                product={p}
                style={s.bannerImg}
              />

              <strong>
                {p.name}
              </strong>

              <span>
                {formatPrice(
                  p.price
                )}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section style={s.products}>
        <h2 style={s.sectionTitle}>
          Boosterboxen
        </h2>

        <div style={s.grid}>
          {products.map((p) => (
            <div
              key={p.id}
              style={s.card}
              onClick={() => {
                setSelected(p);
                setSlide(0);
              }}
            >
              <div style={s.imageBox}>
                <ProductImage
                  product={p}
                  style={s.productImg}
                />

                <div style={s.label}>
                  Klik voor details
                </div>
              </div>

              <div style={s.content}>
                <h3>{p.name}</h3>

                <p style={s.desc}>
                  {
                    p.description
                  }
                </p>

                <div style={s.bottom}>
                  <strong
                    style={s.price}
                  >
                    {formatPrice(
                      p.price
                    )}
                  </strong>

                  <button
                    style={s.btn}
                    onClick={(e) => {
                      e.stopPropagation();

                      addToCart(
                        p
                      );
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
          <h3>
            ✅ Betrouwbare
            verkoop
          </h3>

          <p>
            Alle producten
            worden netjes en
            zorgvuldig
            verpakt, zodat jouw
            bestelling veilig
            en in goede staat
            wordt verzonden.
            Wij proberen iedere
            collector een
            betrouwbare
            koopervaring te
            bieden.
          </p>
        </div>

        <div style={s.infoCard}>
          <h3>
            🇳🇱 Alleen
            verzending in
            Nederland
          </h3>

          <p>
            Wij verzenden
            momenteel alleen
            binnen Nederland,
            zodat we
            Nederlandse
            collectors eerlijke
            prijzen en
            duidelijke
            verzendkosten
            kunnen aanbieden.
          </p>
        </div>

        <div style={s.infoCard}>
          <h3>
            🚧 Website in
            aanbouw
          </h3>

          <p>
            Onze webshop is nog
            in aanbouw. Heb je
            ideeën voor
            toekomstige
            producten of
            verbeteringen?
            Mail ons gerust via{" "}
            <a href="mailto:kttradingcards@gmail.com">
              kttradingcards@gmail.com
            </a>
          </p>
        </div>
      </section>

      {selected && (
        <div style={s.overlay}>
          <div style={s.modal}>
            <button
              style={s.close}
              onClick={() =>
                setSelected(
                  null
                )
              }
            >
              ×
            </button>

            <div style={s.modalLeft}>
              {currentImage ? (
                <img
                  src={
                    currentImage
                  }
                  alt={
                    selected.name
                  }
                  style={
                    s.modalImg
                  }
                />
              ) : (
                <div
                  style={
                    s.bigFake
                  }
                >
                  {
                    selected.emoji
                  }
                </div>
              )}

              {selected.images
                .length > 1 && (
                <>
                  <button
                    style={s.prev}
                    onClick={() =>
                      setSlide(
                        (slide -
                          1 +
                          selected
                            .images
                            .length) %
                          selected
                            .images
                            .length
                      )
                    }
                  >
                    ‹
                  </button>

                  <button
                    style={s.next}
                    onClick={() =>
                      setSlide(
                        (slide +
                          1) %
                          selected
                            .images
                            .length
                      )
                    }
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            <div style={s.modalRight}>
              <p style={s.badge}>
                Sealed product
              </p>

              <h2>
                {
                  selected.name
                }
              </h2>

              <h3>
                {formatPrice(
                  selected.price
                )}
              </h3>

              <p>
                {
                  selected.description
                }
              </p>

              <button
                style={s.payBtn}
                onClick={() =>
                  addToCart(
                    selected
                  )
                }
              >
                Toevoegen aan
                mandje
              </button>
            </div>
          </div>
        </div>
      )}

      <footer style={s.footer}>
        © 2026 KT Trading Cards
      </footer>
    </div>
  );
}

const s = {
  page: {
    background: "#f7efe3",
    minHeight: "100vh",
    fontFamily: "Arial",
    color: "#1c1917",
  },

  header: {
    textAlign: "center",
    padding: "28px 6%",
    borderBottom:
      "1px solid #e8dcc9",
    background: "#f7efe3",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },

  logo: {
    margin: 0,
    fontSize: 34,
  },

  sub: {
    margin: "6px 0",
    color: "#78716c",
  },

  cartBtn: {
    marginTop: 10,
    background: "white",
    padding: "12px 18px",
    borderRadius: 999,
    border: 0,
    cursor: "pointer",
    fontWeight: "bold",
  },

  backBtn: {
    background: "white",
    border: 0,
    padding: "12px 18px",
    borderRadius: 999,
    cursor: "pointer",
  },

  hero: {
    padding: "70px 6% 50px",
    textAlign: "center",
  },

  badge: {
    display: "inline-block",
    background: "white",
    padding: "10px 16px",
    borderRadius: 999,
    fontWeight: "bold",
  },

  heroTitle: {
    fontSize:
      "clamp(36px, 6vw, 56px)",
    maxWidth: 900,
    margin: "22px auto",
    lineHeight: 1.05,
  },

  heroText: {
    fontSize: 20,
    maxWidth: 760,
    margin: "0 auto",
    color: "#57534e",
    lineHeight: 1.7,
  },

  banner: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(230px,1fr))",
    gap: 24,
    marginTop: 45,
  },

  bannerCard: {
    background: "white",
    borderRadius: 28,
    padding: 22,
    boxShadow:
      "0 18px 40px #0002",
    cursor: "pointer",
  },

  bannerImg: {
    height: 230,
    width: "100%",
    objectFit: "contain",
  },

  products: {
    padding: "40px 6%",
  },

  sectionTitle: {
    fontSize: 42,
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(270px,1fr))",
    gap: 28,
  },

  card: {
    background: "white",
    borderRadius: 30,
    overflow: "hidden",
    boxShadow:
      "0 16px 40px #0002",
    cursor: "pointer",
  },

  imageBox: {
    position: "relative",
    height: 310,
    background:
      "linear-gradient(135deg,#f8d7a4,#f4eee4)",
    display: "flex",
    justifyContent:
      "center",
    alignItems: "center",
    padding: 20,
  },

  productImg: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },

  fakeBox: {
    width: 170,
    height: 230,
    borderRadius: 22,
    background:
      "linear-gradient(135deg,#111,#f59e0b,#38bdf8)",
    display: "grid",
    placeItems: "center",
    color: "white",
    fontSize: 60,
    padding: 10,
    textAlign: "center",
  },

  bigFake: {
    fontSize: 120,
  },

  label: {
    position: "absolute",
    left: 14,
    bottom: 14,
    background: "#1c1917dd",
    color: "white",
    padding: "8px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "bold",
  },

  content: {
    padding: 24,
  },

  desc: {
    color: "#57534e",
    lineHeight: 1.6,
  },

  bottom: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginTop: 18,
  },

  price: {
    fontSize: 28,
  },

  btn: {
    background: "#1c1917",
    color: "white",
    border: 0,
    padding: "12px 16px",
    borderRadius: 16,
    fontWeight: "bold",
    cursor: "pointer",
  },

  payBtn: {
    width: "100%",
    background: "#1c1917",
    color: "white",
    border: 0,
    padding: "16px",
    borderRadius: 18,
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 18,
  },

  info: {
    padding: "40px 6% 80px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(260px,1fr))",
    gap: 20,
  },

  infoCard: {
    background: "white",
    padding: 26,
    borderRadius: 24,
    boxShadow:
      "0 10px 25px #0001",
    lineHeight: 1.7,
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "#000b",
    display: "flex",
    alignItems: "center",
    justifyContent:
      "center",
    zIndex: 50,
    padding: 20,
  },

  modal: {
    background: "#f7efe3",
    borderRadius: 32,
    maxWidth: 1050,
    width: "100%",
    display: "grid",
    gridTemplateColumns:
      "1.2fr .8fr",
    overflow: "hidden",
    position: "relative",
  },

  close: {
    position: "absolute",
    right: 16,
    top: 16,
    width: 42,
    height: 42,
    borderRadius: "50%",
    border: 0,
    fontSize: 28,
    cursor: "pointer",
  },

  modalLeft: {
    position: "relative",
    minHeight: 520,
    background: "#111",
    display: "flex",
    alignItems: "center",
    justifyContent:
      "center",
    padding: 28,
  },

  modalImg: {
    maxWidth: "100%",
    maxHeight: 500,
    objectFit: "contain",
    borderRadius: 18,
  },

  modalRight: {
    padding: 40,
    lineHeight: 1.7,
  },

  prev: {
    position: "absolute",
    left: 20,
    fontSize: 48,
    border: 0,
    borderRadius: "50%",
    width: 56,
    height: 56,
    cursor: "pointer",
  },

  next: {
    position: "absolute",
    right: 20,
    fontSize: 48,
    border: 0,
    borderRadius: "50%",
    width: 56,
    height: 56,
    cursor: "pointer",
  },

  footer: {
    textAlign: "center",
    padding: 30,
    color: "#78716c",
    borderTop:
      "1px solid #e8dcc9",
  },

  checkout: {
    padding: "50px 6%",
    display: "grid",
    gridTemplateColumns:
      "1fr 360px",
    gap: 30,
  },

  checkoutLeft: {
    minWidth: 0,
  },

  checkoutTitle: {
    marginBottom: 20,
  },

  cartItem: {
    display: "grid",
    gridTemplateColumns:
      "90px 1fr auto",
    gap: 18,
    alignItems: "center",
    background: "white",
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
  },

  cartImg: {
    width: 80,
    height: 80,
    objectFit: "contain",
  },

  remove: {
    background: "transparent",
    border: 0,
    color: "#dc2626",
    cursor: "pointer",
    padding: 0,
  },

  summary: {
    background: "white",
    borderRadius: 28,
    padding: 26,
    height: "fit-content",
    boxShadow:
      "0 16px 40px #0002",
  },

  row: {
    display: "flex",
    justifyContent:
      "space-between",
    margin: "14px 0",
  },

  shipping: {
    background: "#f7efe3",
    borderRadius: 20,
    padding: 18,
    marginTop: 18,
  },

  total: {
    display: "flex",
    justifyContent:
      "space-between",
    borderTop:
      "1px solid #e8dcc9",
    marginTop: 18,
    paddingTop: 18,
    fontSize: 22,
  },

  formBox: {
    background: "white",
    borderRadius: 26,
    padding: 24,
    marginTop: 28,
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: 14,
  },

  input: {
    padding: 14,
    borderRadius: 14,
    border:
      "1px solid #e8dcc9",
  },

  inputFull: {
    gridColumn: "1 / -1",
    padding: 14,
    borderRadius: 14,
    border:
      "1px solid #e8dcc9",
  },

  noteText: {
    color: "#78716c",
    fontSize: 14,
    marginTop: 16,
  },

  emptyCart: {
    background: "white",
    borderRadius: 24,
    padding: 30,
  },
};

createRoot(
  document.getElementById("root")
).render(<App />);
