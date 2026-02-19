## Part A: Calculator with User Login

### Description
A two-page web application with a login page and a calculator page.

### Features
- Email validation (must be @northeastern.edu)
- Password validation (minimum 8 characters)
- Login button disabled until both fields pass validation
- Session stored in sessionStorage or localStorage (Remember Me)
- Authentication check on calculator page
- Single arrow function handles all four arithmetic operations
- Logout with fadeOut animation

### Test Accounts
| Email | Password |
|---|---|
| alice@northeastern.edu | password123 |
| bob@northeastern.edu | securepass1 |

### How to Run
Open `PartA/login.html` in any browser.

---

## Part B: Event Stopwatch with Session Logging

### Description
A single-page stopwatch that times events and saves sessions to localStorage.

### Features
- HH:MM:SS timer display
- Start / Pause / Stop & Save / Reset controls
- Event name and date validation
- Sessions saved to localStorage
- Filter history by date
- Total session count and total time statistics

### How to Run
Open `PartB/index.html` in any browser.
