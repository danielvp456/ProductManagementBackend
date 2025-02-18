# Product Management API

REST API developed with NestJS for user management with JWT authentication and roles.

## Project Architecture

The application follows a modular architecture:

```
src/
├── auth/                  # Authentication module
│   ├── decorators/       # Custom decorators
│   ├── dto/              # Data Transfer Objects
│   ├── guards/           # Authentication and role guards
│   ├── strategies/       # Passport strategies
│   └── ...
├── common/               # Shared resources
│   ├── exceptions/       # Custom exceptions
│   ├── filters/         # Exception filters
│   └── ...
├── users/               # Users module
│   ├── dto/            # Data Transfer Objects
│   ├── schemas/        # MongoDB schemas
│   └── ...
├── products/           # Products module
│   ├── dto/           # Data Transfer Objects
│   ├── schemas/       # MongoDB schemas
│   └── ...
├── invoices/          # Invoices module
│   ├── dto/           # Data Transfer Objects
│   ├── schemas/       # MongoDB schemas
│   └── ...
└── main.ts            # Application entry point
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

## Project Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/product-management-api.git
cd product-management-api
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the project root:
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database
JWT_SECRET=your_super_secure_jwt_secret
PORT=3000
```

## Running the Project

```bash
# Development
npm run start:dev -- --env-file .env

# Production
npm run build
npm run start:prod -- --env-file .env
```

## API Documentation (Swagger)

API documentation is available at:
```
http://localhost:3000/api
```

## Main Endpoints

### Authentication

- `POST /auth/login`: User login
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Users

- `POST /users/register`: Public user registration
  ```json
  {
    "name": "Example User",
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `POST /users/setup-admin`: Create first admin user
  ```json
  {
    "name": "Admin",
    "email": "admin@example.com",
    "password": "admin123"
  }
  ```

### Products

- `GET /products`: Get all products (requires authentication)
  ```json
  [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "Gaming Laptop",
      "description": "High-performance gaming laptop with RTX 3080",
      "price": 1499.99,
      "stock": 10,
      "status": "active"
    }
  ]
  ```

- `POST /products`: Create new product (requires admin role)
  ```json
  {
    "name": "Gaming Laptop",
    "description": "High-performance gaming laptop with RTX 3080",
    "price": 1499.99,
    "stock": 10,
    "status": "active"
  }
  ```

### Invoices

- `POST /invoices`: Create new invoice (purchase products)
  ```json
  {
    "items": [
      {
        "productId": "507f1f77bcf86cd799439011",
        "quantity": 1
      }
    ]
  }
  ```

- `GET /invoices`: Get user invoices
  ```json
  [
    {
      "id": "507f1f77bcf86cd799439012",
      "user": {
        "id": "507f1f77bcf86cd799439013",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "products": [
        {
          "product": {
            "id": "507f1f77bcf86cd799439011",
            "name": "Gaming Laptop",
            "price": 1499.99
          },
          "quantity": 1,
          "unitPrice": 1499.99
        }
      ],
      "total": 1499.99,
      "purchaseDate": "2024-03-21T12:34:56.789Z"
    }
  ]
  ```

## Roles and Permissions

The system handles two types of roles:
- `USER`: Regular user
- `ADMIN`: Administrator with full access

### Permissions by Role

**USER**
- Can view and update their own profile
- Can delete their own account

**ADMIN**
- Can manage all users
- Can assign roles
- Full system access

## Error Handling

The API implements a centralized error handling system that returns responses in the following format:

```json
{
  "statusCode": 404,
  "error": "Application Error",
  "message": "User with ID 123 not found",
  "timestamp": "2024-03-21T12:34:56.789Z",
  "path": "/users/123"
}
```

## Security

- JWT Authentication
- Passwords hashed with bcrypt
- Role validation through guards
- MongoDB injection protection
- Data validation using class-validator

## Available Scripts

```bash
# Development
npm run start:dev

# Production
npm run start:prod

# Tests
npm run test
npm run test:e2e

# Linting and Formatting
npm run lint
npm run format
```

## Docker

```bash
docker build -t product-management-api .
docker run -p 3000:3000 --env-file .env product-management-api
```

## Project Done by:

- [@danielvp456](https://github.com/danielvp456)


