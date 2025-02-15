# Product Management API

API REST desarrollada con NestJS para la gestión de usuarios con autenticación JWT y roles.

## Arquitectura del Proyecto

La aplicación sigue una arquitectura modular:

```
src/
├── auth/                  # Módulo de autenticación
│   ├── decorators/       # Decoradores personalizados
│   ├── dto/              # Data Transfer Objects
│   ├── guards/           # Guards de autenticación y roles
│   ├── strategies/       # Estrategias de Passport
│   └── ...
├── common/               # Recursos compartidos
│   ├── exceptions/       # Excepciones personalizadas
│   ├── filters/         # Filtros de excepciones
│   └── ...
├── users/               # Módulo de usuarios
│   ├── dto/            # Data Transfer Objects
│   ├── schemas/        # Esquemas de MongoDB
│   └── ...
└── main.ts             # Punto de entrada de la aplicación
```

## Requisitos Previos

- Node.js (v18 o superior)
- MongoDB
- npm o yarn

## Configuración del Proyecto

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/product-management-api.git
cd product-management-api
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo `.env` en la raíz del proyecto:
```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/database
JWT_SECRET=tu_secreto_jwt_super_seguro
PORT=3000
```

## Ejecución del Proyecto

```bash
# Desarrollo
npm run start:dev -- --env-file .env

# Producción
npm run build
npm run start:prod -- --env-file .env
```

## Documentación API (Swagger)

La documentación de la API está disponible en:
```
http://localhost:3000/api
```

## Endpoints Principales

### Autenticación

- `POST /auth/login`: Iniciar sesión
  ```json
  {
    "email": "usuario@ejemplo.com",
    "password": "contraseña123"
  }
  ```

### Usuarios

- `POST /users/register`: Registro público de usuarios
  ```json
  {
    "name": "Usuario Ejemplo",
    "email": "usuario@ejemplo.com",
    "password": "contraseña123"
  }
  ```

- `POST /users/setup-admin`: Crear primer usuario administrador
  ```json
  {
    "name": "Admin",
    "email": "admin@ejemplo.com",
    "password": "admin123"
  }
  ```

## Roles y Permisos

El sistema maneja dos tipos de roles:
- `USER`: Usuario regular
- `ADMIN`: Administrador con acceso total

### Permisos por Rol

**USER**
- Puede ver y actualizar su propio perfil
- Puede eliminar su propia cuenta

**ADMIN**
- Puede gestionar todos los usuarios
- Puede asignar roles
- Acceso total al sistema

## Manejo de Errores

La API implementa un sistema centralizado de manejo de errores que retorna respuestas con el siguiente formato:

```json
{
  "statusCode": 404,
  "error": "Application Error",
  "message": "User with ID 123 not found",
  "timestamp": "2024-03-21T12:34:56.789Z",
  "path": "/users/123"
}
```

## Seguridad

- Autenticación mediante JWT
- Contraseñas hasheadas con bcrypt
- Validación de roles mediante guards
- Protección contra inyección de MongoDB
- Validación de datos mediante class-validator

## Scripts Disponibles

```bash
# Desarrollo
npm run start:dev

# Producción
npm run start:prod

# Tests
npm run test
npm run test:e2e

# Linting y Formateo
npm run lint
npm run format
```

## Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.
