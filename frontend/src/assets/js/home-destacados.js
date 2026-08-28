// ==========================================================================
// Hermanos Jota — Productos destacados del Home (index.html)
// Carga el catálogo de forma asíncrona (simulada) y renderiza 4 productos
// elegidos como destacados, generando las tarjetas por DOM.
// ==========================================================================

import { obtenerProductos } from "../../data/productos.js";

// IDs elegidos como destacados para el Home (ver data/productos.js).
const IDS_DESTACADOS = ["4", "5", "10", "7"];

function formatearPrecio(valor) {
  return "$" + valor.toLocaleString("es-AR");
}

function crearTarjeta(producto) {
  const li = document.createElement("li");
  li.innerHTML = `
    <article class="producto-card">
      <a href="producto.html?id=${producto.id}" class="producto-card__link">
        <figure class="producto-card__media">
          <img
            src="${producto.imagen}"
            alt="${producto.nombre}, ${producto.categoria.toLowerCase()}"
            width="600"
            height="600"
            loading="lazy"
          >
        </figure>
        <div class="producto-card__info">
          <h3>${producto.nombre}</h3>
          <p class="producto-card__price">${formatearPrecio(producto.precio)}</p>
        </div>
      </a>
      <button type="button" class="btn btn--secondary producto-card__cta" data-id="${producto.id}" aria-label="Agregar ${producto.nombre} al carrito">
        Agregar al carrito
      </button>
    </article>
  `;
  return li;
}

async function render() {
  const grid = document.getElementById("productos-destacados-grid");
  if (!grid) return;

  try {
    const todos = await obtenerProductos();
    const destacados = IDS_DESTACADOS
      .map((id) => todos.find((p) => p.id === id))
      .filter(Boolean);

    grid.innerHTML = "";
    destacados.forEach((producto) => {
      grid.appendChild(crearTarjeta(producto));
    });
  } catch (error) {
    grid.innerHTML = `<li class="estado-error">No pudimos cargar los productos destacados. Probá recargar la página.</li>`;
  }
}

render();
