// ==========================================================================
// Hermanos Jota — Formulario de contacto (contacto.html)
// Validación del lado del cliente (sin backend) y mensaje de éxito
// generado por DOM. El "envío" es simulado con una pequeña demora, como
// si fuera una llamada de red real, para mostrar un estado de carga.
// ==========================================================================

const REGLAS = {
  nombre: {
    validar: (valor) => valor.trim().length >= 2,
    mensaje: "Ingresá tu nombre (mínimo 2 caracteres).",
  },
  email: {
    validar: (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()),
    mensaje: "Ingresá un email válido.",
  },
  mensaje: {
    validar: (valor) => valor.trim().length >= 10,
    mensaje: "Contanos un poco más (mínimo 10 caracteres).",
  },
};

function validarCampo(input) {
  const regla = REGLAS[input.name];
  if (!regla) return true;

  const errorEl = document.getElementById(`error-${input.name}`);
  const esValido = regla.validar(input.value);

  input.classList.toggle("form-field__input--invalido", !esValido);
  input.setAttribute("aria-invalid", String(!esValido));
  if (errorEl) errorEl.textContent = esValido ? "" : regla.mensaje;

  return esValido;
}

function simularEnvio(datos) {
  // No hay backend: se simula la llamada de red con una Promise + setTimeout,
  // igual que la carga del catálogo en data/productos.js.
  return new Promise((resolve) => {
    setTimeout(() => resolve(datos), 600);
  });
}

async function manejarEnvio(evento) {
  evento.preventDefault();
  const form = evento.target;
  const campos = [...form.elements].filter((el) => el.name in REGLAS);

  const todosValidos = campos.map(validarCampo).every(Boolean);
  if (!todosValidos) {
    campos.find((c) => !validarCampo(c))?.focus();
    return;
  }

  const boton = form.querySelector('button[type="submit"]');
  const textoOriginal = boton.textContent;
  boton.disabled = true;
  boton.textContent = "Enviando...";

  const datos = Object.fromEntries(new FormData(form).entries());
  await simularEnvio(datos);

  const exito = document.getElementById("contacto-exito");
  const nombre = datos.nombre.trim().split(" ")[0];

  form.hidden = true;
  exito.hidden = false;
  exito.innerHTML = `
    <h2>¡Gracias, ${nombre}!</h2>
    <p>Recibimos tu mensaje. Te vamos a responder a ${datos.email} a la brevedad.</p>
    <a href="index.html" class="btn btn--secondary">Volver al inicio</a>
  `;
  exito.focus?.();

  boton.disabled = false;
  boton.textContent = textoOriginal;
}

function init() {
  const form = document.getElementById("contacto-form");
  if (!form) return;

  form.addEventListener("submit", manejarEnvio);

  // Valida cada campo al salir de foco, para dar feedback temprano.
  [...form.elements].forEach((el) => {
    if (el.name in REGLAS) {
      el.addEventListener("blur", () => validarCampo(el));
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
