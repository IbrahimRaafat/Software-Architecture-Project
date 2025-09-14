# MediCare API Gateway

This is the API Gateway for the MediCare system, built with Nginx. It acts as a single entry point for all API requests from the frontend and routes them to the appropriate backend services.

## Features

- **Request Routing**: Routes API requests to appropriate microservices
- **CORS Support**: Handles cross-origin requests from the frontend
- **Rate Limiting**: Implements rate limiting for different endpoints
- **Health Checks**: Provides health check endpoints
- **Load Balancing**: Ready for load balancing when services scale
- **Security Headers**: Adds security headers to all responses
- **Error Handling**: Graceful error handling for unavailable services

## API Endpoints

### Gateway Endpoints

- `GET /health` - Health check endpoint
- `GET /api/status` - API Gateway status and service health
- `GET /` - Gateway information

### Service Routes

- `POST /api/auth/*` - Authentication service (rate limited: 5 req/s)
- `GET|POST|PUT|DELETE /api/users/*` - User management service (rate limited: 10 req/s)
- `GET|POST|PUT|DELETE /api/appointments/*` - Appointment service (rate limited: 10 req/s)
- `GET|POST|PUT|DELETE /api/notifications/*` - Notification service (rate limited: 10 req/s)

## Configuration

The API Gateway is configured through `nginx.conf` with the following features:

### Upstream Services

Currently configured upstream services (will be added as we create them):

- `auth-service:3001` - Authentication service
- `user-service:3002` - User management service
- `appointment-service:3003` - Appointment service
- `notification-service:3004` - Notification service

### Rate Limiting

- **Authentication endpoints**: 5 requests per second
- **Other API endpoints**: 10 requests per second
- **Burst capacity**: Configured for each endpoint

### CORS Configuration

- Allows all origins (`*`)
- Supports all HTTP methods
- Includes necessary headers for API requests

## Running the API Gateway

### With Docker Compose

```bash
# From the project root
docker-compose up api-gateway

# Or start all services
docker-compose up
```

### Standalone

```bash
# Build the image
docker build -t medicare-api-gateway .

# Run the container
docker run -p 8080:80 medicare-api-gateway
```

## Testing

### Health Check

```bash
curl http://localhost:8080/health
```

### API Status

```bash
curl http://localhost:8080/api/status
```

### Test CORS

```bash
curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     http://localhost:8080/api/auth/login
```

## Adding New Services

To add a new backend service:

1. **Add upstream configuration** in `nginx.conf`:

   ```nginx
   upstream new_service {
       server new-service:3005;
       keepalive 32;
   }
   ```

2. **Add location block**:

   ```nginx
   location /api/new-service/ {
       limit_req zone=api burst=20 nodelay;

       proxy_pass http://new_service/;
       proxy_http_version 1.1;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
   }
   ```

3. **Update docker-compose.yml** to include the new service

## Monitoring

The API Gateway provides several monitoring endpoints:

- `/health` - Basic health check
- `/api/status` - Detailed status of all services
- Nginx access logs are available in the container

## Security

- Rate limiting to prevent abuse
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- CORS configuration for controlled access
- Request validation and sanitization

## Future Enhancements

- JWT token validation
- API key authentication
- Request/response logging
- Metrics collection
- Circuit breaker pattern
- Service discovery integration
