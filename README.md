# Event Registration API

Simple API for managing events with Firebase.

## Installation

1. "npm install"
2. Copy ".env.example" to ".env" and add Firebase credentials
3. "npm start"

## Documentation

- Local: http://localhost:3000/api-docs
- Live: https://mkhan2024.github.io/event-registration-api-apurba

## Examples

**Get events**

```
curl http://localhost:3000/api/v1/events
```

**Create event**

```
curl -X POST http://localhost:3000/api/v1/events -H "Content-Type: application/json" -d '{"name":"Test","date":"2026-04-15T09:00:00Z","location":"Winnipeg","capacity":100}'
```

**Delete event**

```
curl -X DELETE http://localhost:3000/api/v1/events/your-id
```