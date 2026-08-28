// ==========================================================================
// Hermanos Jota — Listado de productos (productos.html)
// Carga el catálogo de forma asíncrona (simulada) y renderiza el grid
// completo. Los botones "Agregar al carrito" los maneja main.js por
// delegación de eventos (document), así que funcionan igual sin importar
// que estas tarjetas se creen después de que main.js ya inicializó la
// página.
// ==========================================================================

import { obtenerProductos } from "../../data/productos.js";

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
          <p class="producto-card__categoria">${producto.categoria}</p>
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
  const grid = document.getElementById("productos-listado-grid");
  if (!grid) return;

  try {
    const productos = await obtenerProductos();
    grid.innerHTML = "";
    productos.forEach((producto) => {
      grid.appendChild(crearTarjeta(producto));
    });
  } catch (error) {
    grid.innerHTML = `<li class="estado-error">No pudimos cargar el catálogo. Probá recargar la página.</li>`;
  }
}

render();
