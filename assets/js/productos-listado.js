import { productos } from '/assets/data/productos.js'


const productosList = document.querySelector('.productos-listado__grid')
const cartCount = document.querySelector('.cart-count')


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


const fragmento = document.createDocumentFragment();

productos.forEach(producto => {
    fragmento.appendChild(crearTarjetaProducto(producto));
});


productosList.appendChild(fragmento);


//Logica para carrito

const addButton = document.querySelectorAll('.producto-card__cta')

let counter = 0


addButton.forEach(btn => {
    btn.addEventListener('click', () => {
        counter++
        cartCount.textContent = counter

    })
})

    