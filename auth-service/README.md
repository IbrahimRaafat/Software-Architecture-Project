# Auth Service

Authentication service for the MediCare system built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

- **User Registration & Login**: Secure user authentication with password hashing
- **JWT Tokens**: Access and refresh token management
- **Role-based Access**: Support for admin, doctor, and patient roles
- **Password Security**: Bcrypt hashing with salt rounds
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Structured error responses
- **Health Checks**: Service health monitoring
- **Database Integration**: PostgreSQL with connection pooling

## API Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh access token
- `GET /auth/verify` - Verify access token
- `GET /auth/profile` - Get user profile

### Health

- `GET /health` - Service health check

## Environment Variables

```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DB_HOST=postgres
DB_PORT=5432
DB_NAME=medicare_auth
DB_USER=postgres
DB_PASSWORD=password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'doctor', 'patient')),
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Refresh Tokens Table

```sql
CREATE TABLE refresh_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(500) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Running the Service

### With Docker Compose

```bash
# From project root
docker-compose up auth-service

# Or start all services
docker-compose up
```

### Development Mode

```bash
# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Start development server
npm run dev
```

### Production Mode

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## API Usage Examples

### Register User

```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@example.com",
    "password": "SecurePass123",
    "firstName": "John",
    "lastName": "Doe",
    "role": "doctor"
  }'
```

### Login User

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@example.com",
    "password": "SecurePass123"
  }'
```

### Access Protected Route

```bash
curl -X GET http://localhost:3001/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Security Features

- **Password Hashing**: Bcrypt with 12 salt rounds
- **JWT Security**: Separate secrets for access and refresh tokens
- **Input Validation**: Comprehensive request validation
- **SQL Injection Protection**: Parameterized queries
- **CORS Configuration**: Controlled cross-origin access
- **Security Headers**: Helmet.js for security headers
- **Rate Limiting**: Handled by API Gateway

## Error Handling

The service provides structured error responses:

```json
{
  "error": "Validation failed",
  "message": "Please check the following fields",
  "details": [
    {
      "field": "email",
      "message": "Email format is invalid"
    }
  ],
  "timestamp": "2024-01-20T10:30:00.000Z",
  "path": "/auth/register",
  "method": "POST"
}
```

## Health Monitoring

The service includes health check endpoints for monitoring:

- **Health Check**: `GET /health`
- **Docker Health Check**: Built-in container health monitoring
- **Database Connection**: Automatic database connectivity checks

## Development

### Project Structure

```
auth-service/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── controllers/
│   │   └── authController.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── validation.ts
│   ├── routes/
│   │   └── auth.ts
│   ├── types/
│   │   └── auth.ts
│   ├── utils/
│   │   └── jwt.ts
│   └── index.ts
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
```

### Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

## Integration

The auth service integrates with:

- **API Gateway**: Routes authentication requests
- **PostgreSQL**: Stores user data and tokens
- **Frontend**: Provides authentication endpoints
- **Other Services**: JWT token validation
