# 💳 ApiRest Bootcamp 2026 - Catalogo de peliculas

## 🏗️ Arquitectura del Proyecto

El backend está organizado de forma modular. Cada dominio de negocio (como `users` o `movies`) se encapsula en su propia carpeta y se divide en las siguientes capas de responsabilidad:

- **Routes (`routes.ts`):** Definición de endpoints HTTP.
- **Controller (`controller.ts`):** Manejo de peticiones (`req`) y respuestas (`res`), validaciones sintácticas iniciales y control de excepciones.
- **Service (`service.ts`):** Capa medular donde reside toda la lógica de negocio y las reglas de transacciones financieras.
- **DAO - Data Access Object (`dao.ts`):** Capa de persistencia exclusiva encargada de interactuar directamente con Mongoose.
- **Model (`model.ts`):** Esquemas de Mongoose y modelos de MongoDB.
- **Types (`types.ts`):** Tipado estricto e interfaces de TypeScript nativas de cada componente.

---

## 🛠️ Tecnologías: Node.js • Express • TypeScript • MongoDB • Mongoose • Swagger

---

## ⚙️ Configuración del Entorno

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/ramirezaed/api-rest-catalogo-peliculas.git

   ```

2. **Instalar las dependencias:**

   ```bash
   npm install
   ```

3. **Variables de Entorno (`.env`):**
   Crea un archivo `.env` en la raíz del proyecto y configura las siguientes variables obligatorias:
   ```env
   DB_URI=tu_conexion_a_mongo_atlas
   TOKEN_SECRET=tu_secreto_para_jwt
   ```

---

## 🚀 Ejecución en Desarrollo

Por defecto, el servidor está configurado para correr en el **puerto 5000**. Para levantar el entorno de desarrollo, ejecuta el siguiente comando:

```bash
npm run server
```

---

## 📄 Documentación con Swagger

El proyecto cuenta con documentación interactiva integrada. Una vez que el servidor esté corriendo, puedes acceder a la interfaz visual de Swagger para probar los endpoints directamente desde el navegador en la siguiente ruta por defecto:

```text
http://localhost:5000/api-docs
```

---

## 🛣️ Endpoints de la API

Todas las rutas del proyecto están prefijadas bajo la siguiente URL base para tus pruebas en Postman:
`http://localhost:5000/api/`
