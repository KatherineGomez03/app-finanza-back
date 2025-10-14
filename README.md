# 🧠 Finlúdica – Backend

> API REST para la gestión de finanzas personales con elementos de gamificación.

---

## 🎯 Descripción General

El *Backend de Finlúdica* provee la lógica de negocio, la gestión de datos y las reglas de gamificación de la aplicación web.  
Desarrollado con *Nest.js, ofrece una arquitectura **modular, escalable y segura*, que permite manejar:

- Autenticación y gestión de usuarios.  
- Registro y consulta de gastos e ingresos.  
- Configuración de metas financieras personalizadas.  
- Sistema de desafíos, logros y niveles.  
- Integración futura con IA para análisis de hábitos financieros.

---

## 🧩 Características Principales

- API REST estructurada en módulos independientes.  
- Autenticación mediante *JWT (JSON Web Token)*.  
- CRUD completo de *usuarios, gastos e ingresos*.  
- Implementación de *metas, logros y desafíos* con lógica de gamificación.  
- Validaciones mediante *DTOs* y *pipes personalizados*.  
- Documentación automática con *Swagger*.  
- Compatibilidad con *MongoDB* o *Firebase Firestore* como base de datos.  
- Preparado para despliegue en entornos cloud (Render, Railway, etc).

---

## 🧠 Tecnologías Utilizadas

| Área | Tecnología | Descripción |
|------|-------------|-------------|
| *Framework* | [Nest.js](https://nestjs.com/) | Framework progresivo para Node.js con arquitectura modular. |
| *Lenguaje* | TypeScript | Lenguaje con tipado fuerte para mayor seguridad y escalabilidad. |
| *Base de Datos (principal)* | [MongoDB](https://www.mongodb.com/) | Base NoSQL orientada a documentos. |
| *Alternativa* | [Firebase Firestore](https://firebase.google.com/) | Base de datos cloud con sincronización en tiempo real. |
| *ORM / ODM* | [Mongoose](https://mongoosejs.com/) | Modelado de esquemas para MongoDB. |
| *Autenticación* | JWT (JSON Web Token) | Control de sesiones seguro y basado en tokens. |
| *Documentación* | [Swagger](https://swagger.io/) | Generación automática de documentación de la API. |
| *Testing* | [Jest](https://jestjs.io/) | Framework para pruebas unitarias y de integración. |

---

## 🧱 Arquitectura del Proyecto



```
/src
 ├── modules/
 │    ├── auth/           # Registro, login, validación de usuarios
 │    ├── expenses/       # CRUD de gastos e ingresos
 │    ├── goals/          # Gestión de metas de ahorro
 │    ├── achievements/   # Logros y niveles del usuario
 │    └── challenges/     # Desafíos con recompensas
 │
 ├── common/              # Pipes, guards, interceptors, DTOs
 ├── database/            # Configuración y conexión a MongoDB/Firebase
 ├── main.ts              # Punto de entrada principal
 └── app.module.ts        # Módulo raíz de Nest.js

```
---

## 🔌 Endpoints Principales

| Método | Endpoint | Descripción |
|--------|-----------|-------------|
| POST | /auth/register | Registro de nuevo usuario |
| POST | /auth/login | Inicio de sesión y obtención de token |
| GET | /users/me | Perfil del usuario autenticado |
| GET | /expenses | Listado de transacciones (ingresos/gastos) |
| POST | /expenses | Crear nueva transacción |
| PUT | /expenses/:id | Editar una transacción existente |
| DELETE | /expenses/:id | Eliminar transacción |
| GET | /goals | Consultar metas activas |
| PUT | /goals/:id | Actualizar meta de ahorro |
| GET | /achievements | Listar logros y progreso |
| GET | /challenges | Ver desafíos activos |

---

## ⚙️ Configuración del Entorno

Crea un archivo .env en la raíz del backend con el siguiente formato:

env
PORT=4000
DATABASE_URL=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/finludica
JWT_SECRET=supersecretkey


Si usás *Firebase*, agregá también:

env
FIREBASE_PROJECT_ID=tu_proyecto
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nxxxx\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@tu-proyecto.iam.gserviceaccount.com


---

## 🚀 Scripts Disponibles

| Comando | Descripción |
|----------|-------------|
| npm run start:dev | Inicia el servidor en modo desarrollo. |
| npm run start | Ejecuta la app en modo producción. |
| npm run build | Compila el proyecto. |
| npm run test | Ejecuta las pruebas unitarias. |
| npm run lint | Revisa el formato y estilo del código. |

---

## 🧪 Testing

El proyecto utiliza *Jest* para pruebas unitarias y de integración.  
Ejemplo:

bash
npm run test


Los tests se ubican en las carpetas correspondientes a cada módulo:


/src/modules/auth/__tests__
/src/modules/expenses/__tests__


---

## 📚 Documentación de la API

La documentación Swagger se genera automáticamente al ejecutar el proyecto.  
Podés acceder desde tu navegador en:

📄 http://localhost:4000/api/docs

---

## 🚀 Deploy

### En Render o Railway
1. Configurar las variables de entorno (PORT, DATABASE_URL, JWT_SECRET).  
2. Ejecutar los scripts de build (npm run build).  
3. Iniciar el servidor (npm run start:prod).  

### Docker (opcional)
Archivo Dockerfile de ejemplo:

dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]
EXPOSE 4000


---

## 🔮 Próximas Mejoras

- Integración con IA para recomendaciones personalizadas de ahorro.  
- Sistema de ranking y puntaje comunitario.  
- WebSockets para actualizaciones en tiempo real.  
- Módulo multiusuario (familia o grupo).  
- Reportes descargables en PDF/CSV.  

---

## 🪙 Licencia

Este proyecto se desarrolla con fines *educativos* y *de demostración*.  
Todos los derechos reservados a sus autores.

---