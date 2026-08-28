// ==========================================================================
// Hermanos Jota — Ficha de producto (producto.html)
// Lee el id de la URL (?id=N) y arma la ficha a partir de
// data/productos.js: imagen, nombre, precio, descripción y tabla de specs
// (medidas, materiales, acabado, etc.) tal como figuran en el catálogo.
// ==========================================================================

import { obtenerProductoPorId } from "../../data/productos.js";

// Mismo número de WhatsApp que en el footer (Manual de Marca).
const WHATSAPP_NUMERO = "5491145678900";
const SITE_URL = "https://www.hermanosjota.com.ar";

function formatearPrecio(valor) {
  return "$" + valor.toLocaleString("es-AR");
}

function linkWhatsApp(producto) {
  const mensaje = `Hola! Quería consultar por ${producto.nombre} (${formatearPrecio(producto.precio)}).`;
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}

function actualizarMetaTags(producto) {
  const titulo = `${producto.nombre} | Hermanos Jota`;
  const urlProducto = `${SITE_URL}/producto.html?id=${producto.id}`;
  const urlImagen = `${SITE_URL}/${producto.imagen}`;

  document.getElementById("page-title").textContent = titulo;
  document.getElementById("meta-description").setAttribute("content", producto.descripcion);
  document.getElementById("canonical-link").setAttribute("href", urlProducto);
  document.getElementById("og-title").setAttribute("content", titulo);
  document.getElementById("og-description").setAttribute("content", producto.descripcion);
  document.getElementById("og-image").setAttribute("content", urlImagen);

  // JSON-LD con datos reales del catálogo (nombre, descripción, imagen,
  // precio). El precio es una estimación propia, aclarada en data/productos.js.
  const jsonLd = document.createElement("script");
  jsonLd.type = "application/ld+json";
  jsonLd.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: producto.nombre,
    description: producto.descripcion,
    image: urlImagen,
    category: producto.categoria,
    offers: {
      "@type": "Offer",
      priceCurrency: "ARS",
      price: producto.precio,
      availability: "https://schema.org/InStock",
      url: urlProducto,
    },
  });
  document.head.appendChild(jsonLd);
}

function marcarNoEncontradoParaSEO() {
  document.getElementById("meta-robots").setAttribute("content", "noindex, nofollow");
}

async function render() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const contenedor = document.getElementById("producto-detalle");
  const noEncontrado = document.getElementById("producto-no-encontrado");
  const cargando = document.getElementById("producto-cargando");

  const producto = await obtenerProductoPorId(id);

  if (cargando) cargando.hidden = true;

  if (!producto) {
    contenedor.hidden = true;
    noEncontrado.hidden = false;
    marcarNoEncontradoParaSEO();
    return;
  }

  contenedor.hidden = false;
  actualizarMetaTags(producto);
  document.getElementById("breadcrumb-actual").textContent = producto.nombre;

  const filasSpecs = producto.specs
    .map(
      (spec) => `
        <div class="producto-detalle__spec-row">
          <dt>${spec.label}</dt>
          <dd>${spec.value}</dd>
        </div>`
    )
    .join("");

  contenedor.innerHTML = `
    <figure class="producto-detalle__media">
      <img
        src="${producto.imagen}"
        alt="${producto.nombre}, ${producto.categoria.toLowerCase()}"
        width="700"
        height="700"
      >
    </figure>

    <div class="producto-detalle__info">
      <p class="producto-detalle__categoria">${producto.categoria}</p>
      <h1 id="producto-detalle-title">${producto.nombre}</h1>
      <p class="producto-detalle__price">${formatearPrecio(producto.precio)}</p>
      <p class="producto-detalle__descripcion">${producto.descripcion}</p>

      <div class="producto-detalle__cantidad">
        <span id="cantidad-label">Cantidad</span>
        <div class="cantidad-stepper" role="group" aria-labelledby="cantidad-label">
          <button type="button" class="cantidad-stepper__btn" data-accion="restar" aria-label="Restar una unidad">−</button>
          <input
            type="number"
            class="cantidad-stepper__input"
            id="cantidad-input"
            value="1"
            min="1"
            max="10"
            inputmode="numeric"
            aria-label="Cantidad"
          >
          <button type="button" class="cantidad-stepper__btn" data-accion="sumar" aria-label="Sumar una unidad">+</button>
        </div>
      </div>

      <div class="producto-detalle__acciones">
        <button type="button" class="btn btn--primary producto-card__cta" data-id="${producto.id}" aria-label="Agregar ${producto.nombre} al carrito">
          Agregar al carrito
        </button>
        <a
          href="${linkWhatsApp(producto)}"
          class="btn btn--secondary producto-detalle__whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Consultar por ${producto.nombre} por WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 20l1.3-4A8 8 0 1 1 9 19.4z"/>
            <path d="M9 10c0 3 2 5 5 5"/>
          </svg>
          Consultar por WhatsApp
        </a>
      </div>

      <p class="producto-detalle__confianza">
        Incluye <strong>Programa Herencia Viva</strong>: garantía extendida
        (10 años en estructura, 5 en acabados) y recompra de hasta el 40%
        del valor.
      </p>

      <dl class="producto-detalle__specs">
        ${filasSpecs}
      </dl>
    </div>
  `;

  initCantidadStepper();
}

function initCantidadStepper() {
  const input = document.getElementById("cantidad-input");
  const botones = document.querySelectorAll(".cantidad-stepper__btn");
  if (!input) return;

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const actual = parseInt(input.value, 10) || 1;
      const min = parseInt(input.min, 10);
      const max = parseInt(input.max, 10);
      const nuevo = boton.dataset.accion === "sumar"
        ? Math.min(actual + 1, max)
        : Math.max(actual - 1, min);
      input.value = nuevo;
    });
  });

  input.addEventListener("change", () => {
    const min = parseInt(input.min, 10);
    const max = parseInt(input.max, 10);
    const valor = Math.min(Math.max(parseInt(input.value, 10) || min, min), max);
    input.value = valor;
  });
}

render();
