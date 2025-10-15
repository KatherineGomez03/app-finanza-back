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
PORT=3000
DATABASE_URL=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/finludica
JWT_SECRET=supersecretkey


---

## 🚀 Scripts Disponibles

| Comando | Descripción |
|----------|-------------|
| pnpm run start:dev | Inicia el servidor en modo desarrollo. |
| pnpm run start | Ejecuta la app en modo producción. |
| pnpm run build | Compila el proyecto. |
| pnpm run test | Ejecuta las pruebas unitarias. |
| pnpm run lint | Revisa el formato y estilo del código. |

### 🐳 Configuración con Docker

Para ejecutar el proyecto usando Docker:

1. Copia el gist del docker-compose.yml recuerda ponerlo en la raiz del proyecto (una carpeta antes del proyecto de backend):
```bash
https://gist.github.com/b9483a97f1b6461e08c363c65b5f3446.git
```

2. Ejecuta los contenedores:
```bash
docker compose up
```

El proyecto estará disponible en http://localhost:3000

---

## 🧪 Testing

El proyecto utiliza *Jest* para pruebas unitarias y de integración.  
Ejemplo:

bash
pnpm run test


Los tests se ubican en las carpetas correspondientes a cada módulo:


/src/modules/auth/__tests__
/src/modules/expenses/__tests__


---

## 🚀 Deploy

### En Render o Railway
1. Configurar las variables de entorno (PORT, DATABASE_URL, JWT_SECRET).  
2. Ejecutar los scripts de build (npm run build).  
3. Iniciar el servidor (npm run start:prod).  

### Docker (opcional)
Archivo Dockerfile de ejemplo:

dockerfile
FROM node:18-alpine
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