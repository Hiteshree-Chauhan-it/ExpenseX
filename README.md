# My Expense Tracker

A simple full-stack expense tracker built with Node.js (Express) for the backend and a Vite + React frontend. It supports user authentication, CRUD operations for expenses, and a dashboard with charts and summary cards.

**Repository structure**

- `backend/` - Express API, controllers, models, and routes
- `frontend/` - Vite + React app (components, pages, assets)

**Key features**

- User signup / login with JWT authentication
- Add, edit, delete expenses
- Expense table and chart visualizations
- Protected routes for authenticated users

**Tech stack**

- Backend: Node.js, Express, Mongoose (MongoDB)
- Frontend: React, Vite, Tailwind CSS
- Authentication: JWT

**Prerequisites**

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

**Environment variables**

Create a `.env` file in `backend/` with at least:

- `MONGO_URI` — your MongoDB connection string
- `JWT_SECRET` — secret for signing JWTs
- `PORT` — backend port (optional, default usually 5000)

Example `.env` (do not commit this file):

```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/expense-tracker
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

**Setup & Run**

Backend

```
cd backend
npm install
npm run start
```

Frontend

```
cd frontend
npm install
npm run dev
```

Open the frontend app in the browser (Vite dev server will show the URL, usually `http://localhost:5173`).

**API overview**

The backend exposes routes to manage authentication and expenses. Example endpoints (HTTP):

- `POST /api/auth/signup` — create account
- `POST /api/auth/login` — login and receive JWT
- `GET /api/expenses` — list user's expenses (protected)
- `POST /api/expenses` — create expense (protected)
- `PUT /api/expenses/:id` — update expense (protected)
- `DELETE /api/expenses/:id` — delete expense (protected)

Check `backend/routes/` and `backend/controllers/` for implementation details.

**Development notes**

- Frontend uses `src/api.js` to call the backend API; update the base URL there if needed.
- Protected routes in React are handled by the `ProtectedRoute` component.
- The backend uses `models/User.js` and `models/Expense.js` for Mongoose schemas.

**Testing & Linting**

No dedicated test suite included by default. Add tests as needed and use ESLint/Prettier to enforce style.

**Contributing**

Feel free to open issues or submit PRs. Suggested improvements:

- Add full test coverage (Jest / React Testing Library)
- Add input validation and improved error handling
- Add pagination and filtering for expenses

**License**

This project does not include a license file. Add one (e.g., MIT) if you plan to publish.

---

If you'd like, I can also:

- add a basic `.env.example` and update `backend/package.json` scripts
- add a short CONTRIBUTING.md or LICENSE

Happy to make those updates — tell me which you'd like next.
