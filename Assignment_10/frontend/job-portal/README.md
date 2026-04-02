# Job Portal - Assignment 9

## Project Structure
```
job-portal/
├── src/
│   ├── components/
│   │   ├── Login/
│   │   ├── Navbar/
│   │   ├── Home/
│   │   ├── About/
│   │   ├── JobListings/
│   │   ├── Contact/
│   │   └── CompanyShowcase/
│   ├── data/
│   │   └── jobPosts.js
│   └── App.js
└── package.json
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start backend (Assignment 8):
```bash
cd ../Assignment_08
node server.js
```

3. Start React app:
```bash
npm start
```

4. Open `http://localhost:3001`

## Login Credentials

- Email: `ziming@example.com`
- Password: `Test@1234`

## Features

- **Login/Logout**: Session management with localStorage
- **Job Listings**: Display jobs using Material UI Cards
- **Company Showcase**: Images fetched from backend
- **Routing**: Five pages (Home, About, Jobs, Companies, Contact)

## API Endpoints

- `POST /user/login` - Authentication
- `GET /user/getAll` - Get users for company showcase
- `GET /images/:filename` - Serve images

