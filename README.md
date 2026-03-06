# ⚡ TaskFlow

### A Full-Stack Task Management System built on the MERN Stack

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-FB015B?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

> Assign work. Track progress. Ship faster. — Secure, role-based task management for modern teams.

---

## 📸 Preview

| Home Page | Admin Dashboard | Employee Dashboard |
|:---------:|:---------------:|:-----------------:|
| Hero landing page with features | Full team & task overview | Card-based task management |

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure token-based auth with `bcryptjs` password hashing
- 👥 **Role-based Access Control** — Separate Admin and Employee portals with protected routes
- 📋 **Task Management** — Create, assign, and track tasks across your entire team
- 🔄 **Live Status Updates** — Employees update task status in real-time (Pending → In Progress → Completed)
- 📊 **Admin Overview** — Stats dashboard with a full view of all tasks, employees, and progress
- 👤 **Employee Registration** — New employees can self-register securely
- 📱 **Fully Responsive** — Mobile-first design with collapsing table → card layouts
- 🎨 **Premium Dark UI** — Glassmorphism, CSS variables, animated hero orbs, and smooth micro-animations

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, React Router v6, Vite 5, Vanilla CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Auth** | JSON Web Tokens (`jsonwebtoken`), `bcryptjs` |
| **HTTP Client** | Axios (with interceptors) |

---

## 📁 Project Structure

```
Task__03/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT protect & admin role middleware
│   ├── models/
│   │   ├── User.js          # User schema (name, email, password, role)
│   │   └── Task.js          # Task schema (title, desc, assignedTo, status)
│   ├── routes/
│   │   ├── authRoutes.js    # POST /register, POST /login, GET /users
│   │   └── taskRoutes.js    # CRUD task endpoints
│   ├── seed.js              # Database seeder (creates test Admin & Employee)
│   ├── server.js            # Express app entry point
│   └── .env                 # Environment variables
│
└── frontend/
    └── src/
        ├── context/
        │   └── AuthContext.jsx   # Global auth state (login, register, logout)
        ├── pages/
        │   ├── Home.jsx          # Landing page
        │   ├── Login.jsx         # Login form
        │   ├── Register.jsx      # Employee registration form
        │   ├── AdminDashboard.jsx
        │   └── EmployeeDashboard.jsx
        ├── api.js                # Axios instance with auth interceptor
        ├── App.jsx               # Router with protected routes
        └── index.css             # Global design system (dark theme, glassmorphism)
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) running locally on port `27017` (or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) URI)

### 1. Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd Task__03

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Configure Environment

Create (or edit) `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/task-management-db
JWT_SECRET=your_super_secret_key_here
```

### 3. Seed the Database

This will create a default Admin and Employee for testing:

```bash
cd backend
node seed.js
```

You will see the generated User IDs in the terminal output.

### 4. Start the Servers

**Backend** (runs on `http://localhost:5000`):

```bash
cd backend
node server.js
```

**Frontend** (runs on `http://localhost:5173`):

```bash
cd frontend
npm run dev
```

---

## 🔑 Test Credentials

After running `seed.js`, you can use these credentials immediately:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@test.com` | `admin123` |
| **Employee** | `employee@test.com` | `emp123` |

---

## 🔌 API Reference

All protected routes require the `Authorization: Bearer <token>` header.

### Auth Routes — `/api/auth`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/register` | Public | Register a new employee |
| `POST` | `/login` | Public | Login and receive JWT |
| `GET` | `/users` | Admin | Get all employees |

### Task Routes — `/api/tasks`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/` | Admin | Create a new task |
| `GET` | `/` | Admin | Get all tasks |
| `GET` | `/employee` | Employee | Get tasks assigned to me |
| `PUT` | `/:id/status` | Employee/Admin | Update task status |

---

## 👤 User Flows

### Admin Flow

1. Login → `/admin` dashboard
2. View all registered employees in the **Employees table**
3. Click **"Assign Task"** next to an employee to auto-fill the form
4. Fill in Task Title + Description and click **"Create Task"**
5. Monitor all tasks and their live statuses in the **All Tasks table**

### Employee Flow

1. Register at `/register` (or use seeded credentials)
2. Login → `/employee` dashboard
3. View all personally assigned tasks as interactive **cards**
4. Use the **status dropdown** on each card to update progress

---

## 🔒 Security

- Passwords are **never stored in plaintext** — hashed with `bcryptjs` (salt rounds: 10)
- JWTs expire after **30 days** and must be sent in the `Authorization` header for all protected routes
- **Role-based middleware** blocks Employee access to Admin routes with a `403 Forbidden` response
- Employees can only update the status of tasks **assigned to them**

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss any major changes.

---

Made with ❤️ using the **MERN Stack** | ⚡ **TaskFlow**
