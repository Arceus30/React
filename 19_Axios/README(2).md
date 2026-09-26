# Axios Theory + Implementation Lab

A practical learning project for understanding Axios from the basics to a structured, real-world API client architecture.

This project uses **Node.js + Express + Axios** and explores how Axios works, how it differs from `fetch`, and how to build a reusable API layer with configuration, interceptors, authentication, cancellation, concurrent requests, file transfers, and error handling.

---

## What I Learned

### Axios Fundamentals

- What Axios is and where it fits in an application
- Axios as an HTTP client
- Axios vs `fetch`
- Promises and `async/await`
- Axios response objects
- `response.data`
- Automatic JSON handling

### HTTP Requests

Implemented:

- `GET`
- `POST`
- `PUT`
- `PATCH`
- `DELETE`

Also covered:

- Query parameters using `params`
- Request bodies
- Request headers
- URL path parameters
- Request configuration

### Request Configuration

Worked with:

- `params`
- `headers`
- `timeout`
- `responseType`
- Global defaults
- Instance defaults
- Per-request overrides

Configuration precedence:

```text
Global defaults
      ↓
Axios instance defaults
      ↓
Per-request configuration
```

The more specific configuration overrides the less specific configuration.

### Custom Headers

Used custom headers such as:

```http
X-Client: axios-lab
X-Version: 1.0
Authorization: Bearer <token>
```

### Simultaneous Requests

Used `Promise.all()` to execute independent requests concurrently.

Also compared it with `Promise.allSettled()` for cases where individual requests can succeed or fail independently.

### Response Transformation

Used Axios `transformResponse` to transform API response data before consuming it in application code.

### Global Axios Configuration

Used:

```js
axios.defaults
```

for application-wide Axios defaults.

### Axios Instances

Used:

```js
axios.create()
```

to create independent Axios clients with their own configuration.

Example use cases:

- Main API client
- Authentication client
- Payment API client
- Upload/file client

### Request Cancellation

Implemented request cancellation using:

- `AbortController`
- Axios legacy `CancelToken`

`AbortController` is the preferred approach for new code.

Also implemented cancellation of stale search requests so that only the latest query remains active.

### Interceptors

Learned:

- Request interceptors
- Response interceptors
- Interceptor error handling
- Multiple interceptors
- Ejecting interceptors
- Authentication headers through interceptors
- Centralized response/error handling
- Avoiding infinite refresh loops

### JWT Authentication Flow

Implemented a simulated access-token refresh flow:

```text
API Request
    ↓
401 Unauthorized
    ↓
Response interceptor
    ↓
Refresh-token request
    ↓
New access token
    ↓
Retry original request
    ↓
Successful response
```

Also used a retry flag to prevent infinite refresh loops.

### File Uploads

Implemented multipart uploads using:

- `FormData`
- `multer`
- Multiple files
- Additional form fields
- Upload progress

### File Downloads

Implemented file downloading using:

```js
responseType: "arraybuffer"
```

Also explored browser-style `blob` responses and download progress.

### Environment Variables

Moved API configuration into `.env`:

```env
API_BASE_URL=http://localhost:3000
```

and loaded it with `dotenv`.

### Error Handling

Handled different Axios failure types:

- HTTP errors (`error.response`)
- Network/connection errors (`error.request`)
- Request/setup errors
- Timeout errors
- Cancellation
- `axios.isAxiosError()`

### API Service Layer

Separated API concerns into modules so application code does not need to know Axios configuration details.

Example architecture:

```text
Application
    ↓
API service
    ↓
Axios instance
    ↓
Interceptors
    ↓
HTTP API
```

---

## Project Architecture

```text
axios-lab/
├── client/
│   ├── api/
│   │   ├── apiClient.js
│   │   ├── userApi.js
│   │   ├── authApi.js
│   │   └── errorHandler.js
│   │
│   ├── upload/
│   │   └── uploadApi.js
│   │
│   └── client.js
│
├── server/
│   ├── uploads/
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

> The exact contents of individual files may vary depending on which exercises are currently being tested. The structure above represents the final architecture developed during the lab.

---

## Server Architecture

The Express server provides endpoints that the Axios client consumes.

Important routes explored during the project:

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/users` | Get users, with optional query filtering |
| POST | `/api/users` | Create a user |
| PUT | `/api/users/:id` | Replace a user |
| PATCH | `/api/users/:id` | Partially update a user |
| DELETE | `/api/users/:id` | Delete a user |
| GET | `/api/debug` | Inspect custom request headers |
| GET | `/api/auth-debug` | Inspect authorization header |
| GET | `/api/protected` | Simulated protected endpoint |
| POST | `/api/refresh` | Simulated access-token refresh |
| GET | `/api/slow` | Slow endpoint for timeout/cancellation testing |
| GET | `/api/search` | Slow search endpoint for stale-request cancellation |
| POST | `/api/upload` | Single-file upload |
| POST | `/api/profile` | Fields + avatar + multiple documents |
| GET | `/api/download` | File download |

---

## Important Axios Patterns

### GET with query parameters

```js
const response = await apiClient.get("/api/users", {
    params: {
        role: "user",
        limit: 2
    }
});
```

### POST with JSON body

```js
const response = await apiClient.post("/api/users", {
    name: "David",
    role: "user"
});
```

### PUT

```js
const response = await apiClient.put(`/api/users/${id}`, {
    name: "David Updated",
    role: "admin"
});
```

### PATCH

```js
const response = await apiClient.patch(`/api/users/${id}`, {
    role: "admin"
});
```

### DELETE

```js
const response = await apiClient.delete(`/api/users/${id}`);
```

### Custom headers

```js
const response = await apiClient.get("/api/debug", {
    headers: {
        "X-Client": "axios-lab"
    }
});
```

### Simultaneous requests

```js
const [users, debug] = await Promise.all([
    apiClient.get("/api/users"),
    apiClient.get("/api/debug")
]);
```

### Independent concurrent requests

```js
const results = await Promise.allSettled([
    apiClient.get("/api/users"),
    apiClient.get("/api/debug"),
    apiClient.get("/api/does-not-exist")
]);
```

### Request cancellation

```js
const controller = new AbortController();

const request = apiClient.get("/api/slow", {
    signal: controller.signal
});

controller.abort();
```

### Axios instance

```js
const apiClient = axios.create({
    baseURL: process.env.API_BASE_URL,
    timeout: 5000
});
```

### Request interceptor

```js
apiClient.interceptors.request.use(config => {
    console.log(config.method, config.url);
    return config;
});
```

### Response interceptor

```js
apiClient.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
);
```

### File upload

```js
const formData = new FormData();

formData.append("file", fs.createReadStream(filePath));

await apiClient.post("/api/upload", formData, {
    headers: formData.getHeaders()
});
```

### File download

```js
const response = await apiClient.get("/api/download", {
    responseType: "arraybuffer"
});
```

---

## Authentication Architecture

The project explored how Axios can work with JWT authentication.

The request interceptor can attach the access token:

```text
Application
    ↓
apiClient
    ↓
Request interceptor
    ↓
Authorization: Bearer <access-token>
    ↓
API
```

When an access token is rejected:

```text
Protected request
      ↓
    401
      ↓
Response interceptor
      ↓
Refresh token
      ↓
New access token
      ↓
Retry original request
```

The refresh flow demonstrated here is intentionally simplified for learning. A production authentication system needs proper token storage, validation, rotation/revocation strategy, secure transport, and server-side authorization checks.

---

## Error Handling Model

A useful Axios error-handling structure is:

```js
try {
    const response = await apiClient.get("/api/users");
    console.log(response.data);
} catch (error) {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            console.log("HTTP error", error.response.status);
        } else if (error.request) {
            console.log("No response received");
        } else {
            console.log("Request setup error");
        }
    }
}
```

Important distinction:

```text
HTTP error
≠
Network error
≠
Timeout
≠
Cancellation
```

---

## Installation

Initialize the project:

```bash
npm init -y
```

Install dependencies:

```bash
npm install axios express multer dotenv form-data
```

Use ES modules in `package.json`:

```json
{
    "type": "module"
}
```

---

## Environment Variables

Create `.env` in the project root:

```env
API_BASE_URL=http://localhost:3000
```

Do not commit `.env` to Git.

---

## Running the Project

Start the server:

```bash
node server/server.js
```

Then run the client from another terminal:

```bash
node client/client.js
```

For development, a watch script can be used in `package.json`:

```json
{
    "scripts": {
        "start": "node server/server.js",
        "dev": "node --watch server/server.js"
    }
}
```

---

## Testing Flow

A useful sequence for revisiting the project is:

```text
1. Start Express server
2. Test GET /api/users
3. Test query parameters
4. Test POST / PUT / PATCH / DELETE
5. Test custom headers
6. Test simultaneous requests
7. Test transformResponse
8. Test Axios defaults
9. Test request cancellation
10. Test Axios instance
11. Test interceptors
12. Test JWT authorization flow
13. Test refresh + retry
14. Test upload
15. Test download
16. Test timeout/network/HTTP errors
17. Test Promise.allSettled()
18. Test stale-search cancellation
19. Test the API service layer
```

---

## Key Takeaways

The most important architectural lessons from this project are:

1. **Use Axios instances** instead of putting all configuration into the global Axios object.
2. **Centralize cross-cutting behavior** such as authentication headers and common logging in interceptors.
3. **Keep API operations in service modules** such as `userApi.js` rather than scattering raw Axios calls throughout application code.
4. **Handle different error categories differently** instead of treating every failure as the same thing.
5. **Cancel requests that are no longer relevant**, especially for search/autocomplete-style workflows.
6. **Use `Promise.all()` when all concurrent operations are required and `Promise.allSettled()` when they can fail independently.**
7. **Use the correct response type for binary data** and `FormData` for multipart uploads.

---

## Project Status

**Completed.**

This lab covers Axios from introductory HTTP requests through a reusable API-client architecture suitable as a foundation for larger Node.js, React, or Next.js applications.
