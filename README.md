# Book Management App (React Native / Expo)

A React Native app for managing books with **CRUD operations**, **authentication**, and **my-profile**. The app supports **theme switching** and fetches data from a backend API.

---

## Features

- **Authentication**
  - Sign in / Sign up
  - Token-based auth with AsyncStorage
  - Redirect to login if not authenticated

- **Profile & Theme**
  - View and edit user profile
  - Switch between light and dark themes

- **Book Management (CRUD)**
  - **Create** new books
  - **Read** book details
  - **Update** existing books
  - **Delete** books with confirmation
  - Form validation for required fields and numeric inputs

- **API Integration**
  - Fetch books from backend API (`classroom-api`)
  - Pass Authorization token in headers
  - Handle errors and loading states

- **Responsive**
  - Works on **web, iOS, and Android** using Expo

---

## Backend API

This project uses [Classroom API](https://github.com/tanapattara-classroom/classroom-api) as backend.

### Run with Docker

1. Clone the repository:

```bash
- git clone https://github.com/tanapattara-classroom/classroom-api.git
- cd classroom-api
```

2. Build and run the Docker container:

```bash
- docker-compose up --build
```

3. The API will be available at:

```bash
- http://localhost:3000/api
```

### React Native Installation
1. Clone this repository:

```bash
- git clone https://github.com/Onpreeya-Jantakote/Theme-my-profile.git
- cd Theme-my-profile
```

3. Install dependencies:

```bash
- npm install
```

4. Start the app on web:

```bash
- npx expo start --web

Or on Android/iOS simulator:
- npx expo start
```
