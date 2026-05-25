# Task Management Frontend

A React-based frontend application for managing tasks with a modern, responsive UI.

## Features

- User authentication (login/register)
- Create, read, update, delete tasks
- Filter tasks by status and priority
- Search tasks by title or description
- Sort tasks by date, due date, or priority
- View task statistics
- Responsive design
- Form validation

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file (optional):
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

## Running the App

Development mode:
```bash
npm start
```

Build for production:
```bash
npm build
```

The app will open at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── PrivateRoute.js    # Protected route wrapper
│   ├── TaskForm.js        # Task creation/edit form
│   ├── TaskList.js        # Display tasks
│   ├── TaskFilters.js     # Filter controls
│   └── TaskStats.js       # Statistics display
├── context/
│   └── AuthContext.js     # Authentication state
├── pages/
│   ├── Login.js           # Login page
│   ├── Register.js        # Registration page
│   └── Dashboard.js       # Main dashboard
├── services/
│   └── api.js             # API client with axios
├── styles/
│   ├── index.css          # Global styles
│   ├── Auth.css           # Auth pages
│   ├── Dashboard.css      # Dashboard
│   ├── TaskForm.css       # Form component
│   ├── TaskList.css       # Task list
│   ├── TaskFilters.css    # Filters
│   └── TaskStats.css      # Statistics
├── App.js                 # Main app component
└── index.js               # React entry point
```

## Key Components

### AuthContext
Global state management for authentication using React Context API
- Stores user data and JWT token
- Provides login/logout functions
- Checks authentication status

### PrivateRoute
Protects dashboard from unauthorized access
- Redirects to login if not authenticated
- Wraps protected components

### API Service
Centralized API client using axios
- Automatic token injection in requests
- Handles all API calls
- Error handling

## Styling Approach

- CSS3 Grid and Flexbox for layouts
- Responsive design (mobile-first)
- Smooth animations and transitions
- Color-coded priority and status badges
- Dark/light visual hierarchy

## Form Validation

Client-side validation for:
- Required fields
- Email format
- Password length
- Task title required
- Character limits

## Features in Detail

### Authentication
- Register new users
- Login with email/password
- JWT token stored in localStorage
- Automatic token refresh on page reload

### Task Management
- Create tasks with title, description, priority, status, due date
- Edit existing tasks
- Delete tasks
- Mark tasks as complete/incomplete
- Add tags to tasks

### Filters & Search
- Filter by status (To Do, In Progress, Completed)
- Filter by priority (Low, Medium, High)
- Search by title or description
- Clear all filters

### Sorting
- Sort by creation date (newest first)
- Sort by due date
- Sort by priority (high to low)

### Statistics
- Total tasks count
- Completed tasks count
- In-progress tasks count
- To-do tasks count
- High-priority tasks count

## Dependencies

- react: UI library
- react-dom: React rendering
- react-router-dom: Client-side routing
- axios: HTTP client

## Build Info

- Single Page Application (SPA)
- Responsive breakpoints: 480px, 768px, 1024px
- Modern browser support (ES6+)

---

For the full project documentation, see the main README.md
