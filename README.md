# 🪑 E-commerce Mueblería Hermanos Jota — Sprint 2

Proyecto final — Sprint 2 — Full Stack Developer, ITBA Educación Ejecutiva.

Sitio de e-commerce para una mueblería artesanal, construido únicamente con tecnologías del lado del cliente (**HTML, CSS y JavaScript**). Sobre la base del Sprint 1, se agrega la lógica interactiva: el sitio simula una experiencia de compra completa sin backend, gestionando los productos localmente con un array de objetos en JavaScript.

---

## 👥 Equipo

| Nombre | GitHub |
|---|---|
| Orodaz Mateo | [@Reiraku73](https://github.com/Reiraku73) |
| Sacca Jurado Maximo Julian | [@maximosacca](https://github.com/maximosacca) |
| Martin de Achaval | [@martindeachaval](https://github.com/martindeachaval) |
| Tomás Zambrano | [@tommyrk](https://github.com/tommyrk) |
| Franco Lugo | [@RoBeeBot](https://github.com/robeebot) |

---

## 📋 Resumen del proyecto

Construir la experiencia interactiva del cliente sobre la fachada desarrollada en el Sprint 1, utilizando únicamente tecnologías del lado del cliente. El sitio simula una experiencia de compra sin conexión a backend — los productos se gestionan localmente con JavaScript.

## 🎯 Objetivos de aprendizaje

A lo largo de este Sprint podrán:

1. Conocer los conceptos fundamentales de programación en JavaScript: variables, tipos de datos, operadores, flujo de control y funciones.
2. Manipular el DOM básico con JavaScript para crear interactividad.
3. Utilizar los conceptos básicos de arrays y objetos en JavaScript.
4. Simular una petición de datos asíncrona para cargar el catálogo.
5. Manejar la interacción del usuario a través de eventos.
6. Colaborar en un proyecto utilizando Git y GitHub.

## ⚙️ Funcionalidades

### 🏠 Página de Inicio — `index.html`
- Header con logo y navegación
- Hero banner principal
- 3–4 productos destacados cargados dinámicamente
- Footer con información básica

### 🛋️ Catálogo de Productos — `productos.html`
- Grilla de tarjetas de productos
- Datos cargados desde archivo JavaScript local
- Cada producto enlaza a su página de detalle
- Campo de búsqueda (bonus funcional)

### 🔍 Detalle de Producto — `producto.html`
- Imagen grande y descripción completa
- Detalles de fabricación y precio
- Botón "Añadir al Carrito"

### ✉️ Contacto — `contacto.html`
- Formulario: Nombre, Email, Mensaje
- Validación del lado del cliente con JS
- Mensaje de éxito mediante manipulación del DOM
- Carrito simulado con contador en el header

## 🛠️ Stack técnico

| Tecnología | Detalle |
|---|---|
| **HTML** | Etiquetas semánticas obligatorias · código limpio y bien indentado |
| **CSS** | 100% responsivo (Mobile First) · Flexbox para secciones principales · todo en archivo externo |
| **JavaScript** | Productos en array de objetos (`.js`) · renderizado dinámico vía DOM · carga asíncrona (`setTimeout` / `async-await`) · interactividad con `addEventListener` |

## 🚀 Cómo correr el proyecto

1. Cloná el repositorio:
```bash
   git clone https://github.com/usuario/hermanos-jota.git
```
2. Abrí `index.html` en tu navegador (o usá una extensión tipo Live Server).

## 📦 Entregables

- [x] Repositorio en GitHub con historial de commits de todos los integrantes.
- [x] Sitio web desplegado en un servicio de hosting estático gratuito.
- [x] Este `README.md` con nombre del proyecto, integrantes, descripción de funcionalidad y tecnologías utilizadas.

---

# Hermanos Jota
E-commerce artesanal desarrollado como proyecto de Full Stack Developer.

## Stack

### Client
- React
- Vite
- TypeScript
- React Router
- Context API
- CSS

### Server
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt

## 📁 Estructura del proyecto

- `client/`: aplicación React.
- `server/`: API REST con Express.
- `client/src/types/`: contratos de datos del frontend.
- `client/src/services/`: comunicación con la API.
- `client/src/context/`: estado global mediante Context API.
- `server/src/models/`: modelos Mongoose.
- `server/src/controllers/`: lógica de entrada de las solicitudes.
- `server/src/routes/`: endpoints de la API.
- `server/src/middleware/`: autenticación, validación y errores.

## Desarrollo

El frontend y backend se ejecutan como proyectos independientes.
Antes de ejecutar el servidor, configurar `server/.env` a partir de `server/.env.example`.
Antes de ejecutar el cliente, configurar `client/.env` a partir de `client/.env.example`.

---

*Proyecto desarrollado en el marco del curso Full Stack Developer — ITBA Educación Ejecutiva.*
