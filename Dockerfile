# Etapa de desarrollo
FROM node:18-alpine AS builder

# Actualizar e instalar dependencias necesarias
RUN apk update && apk add --no-cache python3 make g++

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Crear directorio de la aplicación
WORKDIR /app

# Copiar archivos de configuración
COPY package.json pnpm-lock.yaml ./
COPY tsconfig*.json ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el código fuente
COPY src/ ./src/
COPY nest-cli.json ./

# Construir la aplicación
RUN pnpm run build

# Etapa de desarrollo
FROM node:18-alpine AS development

# Actualizar e instalar dependencias necesarias
RUN apk update && apk add --no-cache python3 make g++

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiar archivos de configuración y dependencias
COPY package.json pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Copiar el código fuente para desarrollo
COPY . .

# Variables de entorno por defecto
ENV NODE_ENV=development
ENV PORT=3000

# Exponer puerto
EXPOSE 3000

# Comando para desarrollo (con hot reload)
CMD ["pnpm", "run", "start:dev"]

# Etapa de producción
FROM node:18-alpine AS production

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Crear usuario no root para seguridad
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001

WORKDIR /app

# Copiar archivos de configuración y dependencias
COPY package.json pnpm-lock.yaml ./
COPY --from=builder /app/dist ./dist

# Instalar solo dependencias de producción
RUN pnpm install --prod --frozen-lockfile

# Cambiar propiedad de los archivos al usuario no root
RUN chown -R nestjs:nodejs /app

# Cambiar al usuario no root
USER nestjs

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3000

# Exponer puerto
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Comando para ejecutar la aplicación
CMD ["node", "dist/main"]