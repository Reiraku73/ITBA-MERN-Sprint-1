// ==========================================================================
// Hermanos Jota — Carrousel del Hero (index.html)
// Rota entre todos los productos del catálogo dentro del bloque hero.
// Cada slide es un link a la ficha del producto correspondiente.
// La imagen inicial (la que se ve al cargar la página) es aleatoria.
// ==========================================================================

import { obtenerProductos } from "../../data/productos.js";

// Tiempo que cada imagen permanece visible antes de rotar a la siguiente.
const INTERVALO_ROTACION_MS = 5000;

// Respetamos la preferencia de "reducir movimiento" del usuario: si está
// activa, no rotamos automáticamente (el mismo criterio que ya se usa
// para animaciones en style.css con prefers-reduced-motion).
const prefiereMenosMovimiento = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function elegirIndiceInicialAleatorio(cantidadProductos) {
  return Math.floor(Math.random() * cantidadProductos);
}

function crearSlide(producto, esActivo) {
  const slide = document.createElement("a");
  slide.className = "hero__carousel-slide";
  slide.href = `producto.html?id=${producto.id}`;
  slide.setAttribute("aria-label", `Ver ficha de ${producto.nombre}`);
  slide.setAttribute("aria-hidden", esActivo ? "false" : "true");
  slide.tabIndex = esActivo ? 0 : -1;
  if (esActivo) slide.classList.add("hero__carousel-slide--activa");

  slide.innerHTML = `
    <img
      class="hero__carousel-img"
      src="${producto.imagen}"
      alt="${producto.nombre}, pieza destacada de Hermanos Jota"
      width="800"
      height="800"
      loading="${esActivo ? "eager" : "lazy"}"
    >
  `;

  return slide;
}

function crearFlechas() {
  const anterior = document.createElement("button");
  anterior.type = "button";
  anterior.className = "hero__carousel-arrow hero__carousel-arrow--prev";
  anterior.setAttribute("aria-label", "Producto anterior");
  anterior.innerHTML = `
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  const siguiente = document.createElement("button");
  siguiente.type = "button";
  siguiente.className = "hero__carousel-arrow hero__carousel-arrow--next";
  siguiente.setAttribute("aria-label", "Producto siguiente");
  siguiente.innerHTML = `
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  return { anterior, siguiente };
}

async function render() {
  const contenedor = document.getElementById("hero-carousel");
  if (!contenedor) return;

  try {
    const productos = await obtenerProductos();
    if (!productos.length) return;

    let indiceActivo = elegirIndiceInicialAleatorio(productos.length);

    contenedor.innerHTML = "";

    const slides = productos.map((producto, i) =>
      crearSlide(producto, i === indiceActivo)
    );
    slides.forEach((slide) => contenedor.appendChild(slide));

    const { anterior, siguiente } = crearFlechas();
    contenedor.appendChild(anterior);
    contenedor.appendChild(siguiente);

    function mostrarSlide(nuevoIndice) {
      slides[indiceActivo].classList.remove("hero__carousel-slide--activa");
      slides[indiceActivo].setAttribute("aria-hidden", "true");
      slides[indiceActivo].tabIndex = -1;

      indiceActivo = nuevoIndice;

      slides[indiceActivo].classList.add("hero__carousel-slide--activa");
      slides[indiceActivo].setAttribute("aria-hidden", "false");
      slides[indiceActivo].tabIndex = 0;
    }

    function siguienteSlide() {
      mostrarSlide((indiceActivo + 1) % slides.length);
    }

    function slideAnterior() {
      mostrarSlide((indiceActivo - 1 + slides.length) % slides.length);
    }

    let idRotacion = null;

    function reiniciarRotacion() {
      if (prefiereMenosMovimiento) return;
      clearInterval(idRotacion);
      idRotacion = setInterval(siguienteSlide, INTERVALO_ROTACION_MS);
    }

    siguiente.addEventListener("click", () => {
      siguienteSlide();
      reiniciarRotacion();
    });

    anterior.addEventListener("click", () => {
      slideAnterior();
      reiniciarRotacion();
    });

    // Pausamos la rotación automática mientras el usuario interactúa
    // con el carrousel (mouse encima o foco por teclado).
    contenedor.addEventListener("mouseenter", () => clearInterval(idRotacion));
    contenedor.addEventListener("mouseleave", reiniciarRotacion);
    contenedor.addEventListener("focusin", () => clearInterval(idRotacion));
    contenedor.addEventListener("focusout", reiniciarRotacion);

    reiniciarRotacion();
  } catch (error) {
    contenedor.innerHTML = "";
  }
}

render();