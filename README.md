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

## Estructura

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
