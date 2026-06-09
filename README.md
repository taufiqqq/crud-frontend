# crud-frontend

Simple React frontend for books CRUD.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` from `.env.example` and set backend URL:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:8080
   ```
3. Run app:
   ```bash
   npm start
   ```

## API endpoints used

- `POST /create/{name}`
- `DELETE /delete/{id}`
- `PUT /update/{id}?newName={newName}`
