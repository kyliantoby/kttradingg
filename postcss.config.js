import React, { useMemo, useState } from "react";
import {
  ShoppingCart,
  Search,
  Star,
  Package,
  ShieldCheck,
  Truck,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Inferno X Boosterbox",
    price: 120,
    tag: "Hot pick",
    description: "Japanse Inferno X boosterbox, sealed en perfect voor collectors.",
    accent: "from-orange-100 to-amber-50",
    images: [
      "/images/inferno-x-front.jpeg",
      "/images/inferno-x-side-1.jpeg",
      "/images/inferno-x-side-2.jpeg",
      "/images/inferno-x-back.jpeg",
    ],
  },
  {
    id: 2,
    name: "Mega Dream EX Boosterbox",
    price: 110,
    tag: "Nieuw",
    description: "Japanse Mega Dream EX boosterbox, sealed en ideaal voor verzamelaars van moderne sets.",
    accent: "from-sky-100 to-stone-50",
    images: [
      "/images/mega-dream-front.jpeg",
      "/images/mega-dream-side-1.jpeg",
      "/images/mega-dream-side-2.jpeg",
      "/images/mega-dream-back.jpeg",
      "/images/mega-dream-side-3.jpeg",
    ],
  },
  {
    id: 3,
    name: "Terastal Festival Boosterbox",
    price: 110,
    tag: "Populair",
    description: "Een feestelijke set met premium uitstraling en verzamelwaarde.",
    accent: "from-pink-100 to-stone-50",
    images: [],
  },
];

function formatPrice(value) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function ProductImage({ product }) {
  const firstImage = product.images?.[0];

  if (firstImage) {
    return (
      <img
        src={firstImage}
        alt={product.name}
        className="h-full object-contain drop-shadow-2xl transition duration-500 group-hover:scale-110"
      />
    );
  }

  return (
    <div className="text-center">
      <p className="text-6xl">📦</p>
      <p className="mt-3 text-xs font-black uppercase tracking-widest text-stone-500">
        Productfoto volgt
      </p>
    </div>
  );
}

function ProductSliderModal({ product, activeSlide, setActiveSlide, onClose }) {
  if (!product) return null;

  const images = product.images || [];
  const hasImages = images.length > 0;

  function previousSlide() {
    setActiveSlide((current) => (current === 0 ? images.length - 1 : current - 1));
  }

  function nextSlide() {
    setActiveSlide((current) => (current === images.length - 1 ? 0 : current + 1));
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/75 px-4 py-8 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] bg-[#F7EFE3] shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-white/90 p-3 text-stone-900 shadow-lg transition hover:scale-105"
          aria-label="Sluiten"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-0 md:grid-cols-[1.2fr_0.8fr]">
          <div className="relative flex min-h-[520px] items-center justify-center bg-stone-950 p-6">
            {hasImages ? (
              <img
                src={images[activeSlide]}
                alt={`${product.name} foto ${activeSlide + 1}`}
                className="max-h-[470px] w-full rounded-3xl object-contain shadow-2xl"
              />
            ) : (
              <div className="rounded-3xl bg-white p-10 text-center">
                <p className="text-7xl">📦</p>
                <p className="mt-4 font-black">Productfoto volgt</p>
              </div>
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={previousSlide}
                  className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition hover:scale-105"
                  aria-label="Vorige foto"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition hover:scale-105"
                  aria-label="Volgende foto"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          <div className="p-7 md:p-9">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-stone-600 shadow-sm">
              <Sparkles className="h-4 w-4" /> Sealed product
            </span>
            <h2 className="mt-5 text-4xl font-black tracking-tight">{product.name}</h2>
            <p className="mt-3 text-3xl font-black">{formatPrice(product.price)}</p>
            <p className="mt-5 leading-8 text-stone-600">{product.description}</p>
            <p className="mt-4 rounded-2xl bg-white p-4 text-sm leading-6 text-stone-600 shadow-sm">
              Bekijk alle kanten van de box met de slider. Dit helpt kopers vertrouwen te krijgen in de sealed staat van het product.
            </p>

            {hasImages && (
              <div className="mt-6 grid grid-cols-5 gap-2">
                {images.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setActiveSlide(index)}
                    className={`overflow-hidden rounded-xl border-2 bg-white p-1 transition ${
                      activeSlide === index ? "border-stone-900" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={image} alt="Thumbnail" className="h-16 w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const cartTotal = cart.reduce((sum, product) => sum + product.price, 0);

  function addToCart(product) {
    setCart((current) => [...current, product]);
  }

  function openProduct(product) {
    setSelectedProduct(product);
    setActiveSlide(0);
  }

  function closeProduct() {
    setSelectedProduct(null);
    setActiveSlide(0);
  }

  return (
    <div className="min-h-screen bg-[#F7EFE3] text-stone-900">
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#F7EFE3]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-stone-900 text-lg text-white shadow-sm">KT</div>
            <div>
              <p className="text-lg font-black tracking-tight">KT Trading Cards</p>
              <p className="text-xs text-stone-500">Pokemon kaarten & boosterboxen</p>
            </div>
          </div>

          <nav className="hidden items-center gap-7 text-sm font-medium text-stone-600 md:flex">
            <a href="#producten" className="hover:text-stone-950">Producten</a>
            <a href="#waarom" className="hover:text-stone-950">Waarom KT?</a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <div className="rounded-full bg-white px-4 py-2 text-sm shadow-sm">
              <ShoppingCart className="mr-2 inline h-4 w-4" />
              {cart.length} items · {formatPrice(cartTotal)}
            </div>
          </div>

          <button
            className="rounded-xl bg-white p-2 shadow-sm md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Menu openen"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-stone-200 bg-[#F7EFE3] px-5 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-sm font-medium text-stone-700">
              <a href="#producten">Producten</a>
              <a href="#waarom">Waarom KT?</a>
              <span className="rounded-full bg-white px-4 py-2 shadow-sm">
                Winkelmand: {cart.length} items · {formatPrice(cartTotal)}
              </span>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm">
              <Star className="h-4 w-4" /> Nieuwe sealed Pokemon collectie
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-7xl">Zachte vibes, sterke pulls.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
              Shop boosterboxen met een rustige beige look, betrouwbare service en een speelse stijl geinspireerd op Snorlax en Blastoise.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#producten" className="rounded-2xl bg-stone-900 px-6 py-4 text-center font-bold text-white shadow-lg shadow-stone-300 transition hover:-translate-y-0.5">Bekijk boosterboxen</a>
              <a href="#waarom" className="rounded-2xl bg-white px-6 py-4 text-center font-bold text-stone-800 shadow-sm transition hover:-translate-y-0.5">Waarom bij ons kopen?</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative">
            <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-sky-200/50 blur-2xl" />
            <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-amber-200/60 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] bg-white p-6 shadow-2xl shadow-stone-300/50">
              <div className="rounded-[1.5rem] bg-stone-900 p-6 text-white">
                <p className="text-sm text-stone-300">Featured box</p>
                <p className="mt-1 text-3xl font-black">Terastal Festival</p>
                <p className="mt-3 text-sm leading-6 text-stone-300">Een premium spotlight-product voor bovenaan je webshop.</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="producten" className="mx-auto max-w-7xl px-5 py-16">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="font-bold uppercase tracking-[0.25em] text-stone-500">Shop</p>
              <h2 className="mt-2 text-4xl font-black tracking-tight">Boosterboxen</h2>
            </div>
            <label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm md:min-w-80">
              <Search className="h-5 w-5 text-stone-400" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Zoek boosterbox..." className="w-full bg-transparent text-sm outline-none" />
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {filteredProducts.map((product) => (
              <motion.article
                key={product.id}
                whileHover={{ y: -10, rotate: -0.5 }}
                onClick={() => openProduct(product)}
                className="group relative cursor-pointer overflow-hidden rounded-[2rem] bg-white shadow-lg shadow-stone-300/40 transition duration-500 hover:shadow-2xl hover:shadow-stone-400/40"
              >
                <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute -left-20 top-0 h-full w-20 rotate-12 bg-white/35 blur-md transition duration-700 group-hover:translate-x-[420px]" />
                </div>

                <div className={`relative h-72 bg-gradient-to-br ${product.accent} p-5`}>
                  <div className="flex items-start justify-between">
                    <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-stone-700 shadow-sm">{product.tag}</span>
                    <Package className="h-7 w-7 text-stone-700" />
                  </div>

                  <div className="mt-4 flex h-[220px] items-center justify-center overflow-hidden rounded-3xl bg-white/60 p-4 shadow-sm backdrop-blur-sm">
                    <ProductImage product={product} />
                  </div>

                  {product.images?.length > 0 && (
                    <div className="absolute bottom-3 left-3 rounded-full bg-stone-900/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">Klik voor foto slider</div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-black tracking-tight">{product.name}</h3>
                  <p className="mt-3 min-h-14 text-sm leading-6 text-stone-600">{product.description}</p>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <p className="text-2xl font-black">{formatPrice(product.price)}</p>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        addToCart(product);
                      }}
                      className="rounded-2xl bg-stone-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-stone-700"
                    >
                      In mandje
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="waarom" className="mx-auto max-w-7xl px-5 py-16 pb-24">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Betrouwbare verkoop", text: "Duidelijke productinformatie en nette communicatie." },
              { icon: Truck, title: "Alleen verzending in Nederland", text: "Wij verzenden momenteel uitsluitend binnen Nederland met veilige verzending en track & trace. Perfect voor Nederlandse collectors en sealed verzamelaars." },
              { icon: Star, title: "Voor collectors", text: "Focus op sealed boosterboxen en overzichtelijke collectie-updates." },
            ].map((item) => (
              <div key={item.title} className="rounded-[2rem] bg-white p-7 shadow-sm">
                <item.icon className="h-8 w-8" />
                <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-stone-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <ProductSliderModal product={selectedProduct} activeSlide={activeSlide} setActiveSlide={setActiveSlide} onClose={closeProduct} />

      <footer className="border-t border-stone-200 px-5 py-8 text-center text-sm text-stone-500">
        © 2026 KT Trading Cards · Demo webshop · Vervang prijzen, teksten en afbeeldingen voordat je live gaat.
      </footer>
    </div>
  );
}
