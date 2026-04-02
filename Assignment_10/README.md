##  Project Structure
```
Assignment_10/
├── backend/
│   ├── models/          # User & Job models
│   ├── routes/          # API routes
│   └── server.js
└── frontend/job-portal/
    └── src/
        ├── redux/       # Redux store & slices
        ├── components/  # React components
        └── App.js       # Protected routes
```

## Setup

### Backend
```bash
cd backend
npm install
brew services start mongodb-community  # Start MongoDB
node server.js                          # Runs on port 3000
```

### Frontend
```bash
cd frontend/job-portal
npm install
npm start                               # Runs on port 3001/3002
```

##  Test Credentials

**Admin:**
- Email: `admin@test.com`
- Password: `Admin123!`

**Employee:**
- Email: `employee@test.com`
- Password: `Employee123!`

##  API Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/user/create` | Create user with type | Public |
| POST | `/user/login` | User login | Public |
| GET | `/user/getAll` | Get all users (no passwords) | Admin |
| POST | `/job/create` | Create job posting | Admin |
| GET | `/job` | Get all jobs | Employee |

##  Features

### Admin
- View all users in a table
- Create job postings
- Route: `/admin/employees`, `/admin/add-job`

### Employee
- View job listings
- Route: `/employee/jobs`

