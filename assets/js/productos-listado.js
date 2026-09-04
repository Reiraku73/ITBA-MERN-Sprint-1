import { productos } from '/assets/data/productos.js'


const productosList = document.querySelector('.productos-listado__grid')
const cartCount = document.querySelector('.cart-count')
const productosH1 = document.querySelector('#productos-listado-title'); 
const productosSpan = document.querySelector('.productos-listado__intro');

function formatearPrecio(valor) {
  return "$" + valor.toLocaleString("es-AR");
}

function crearTarjetaProducto(producto) {
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
    `
  return li
}


// Simulacion de carga asincronica 

export function renderizarGrilla(arrayDeProductos) {
  productosList.innerHTML = "";
  const fragmento = document.createDocumentFragment();

  arrayDeProductos.forEach(producto => {
    fragmento.appendChild(crearTarjetaProducto(producto));
  });

  productosList.appendChild(fragmento);
}

function obtenerProductos() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(productos), 1500);
  });
}

async function cargarCatalogo() {
  try {
    productosList.innerHTML = '<div class="loader"></div>';

    if (productosH1) productosH1.classList.add('oculto');
    if (productosSpan) productosSpan.classList.add('oculto');

    const datos = await obtenerProductos();

    if (productosH1) productosH1.classList.remove('oculto');
    if (productosSpan) productosSpan.classList.remove('oculto');

    renderizarGrilla(datos);

  } catch (error) {
    console.error("Error:", error);
    productosList.innerHTML = "<p>Hubo un error al cargar el catálogo.</p>";
  }
}


cargarCatalogo();

// Lógica de carrito 

let counter = 0;

inicializarCarrito();

function inicializarCarrito() {
  productosList.addEventListener('click', (evento) => {
    const boton = evento.target.closest('.producto-card__cta');
    if (!boton) return;

    counter++;
    cartCount.textContent = counter;
  });
}

