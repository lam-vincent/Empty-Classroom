# Empty Classroom

**Empty Classroom** is a web application designed to help students find and reserve available classrooms within their school's campus.

<div align="center">
  <img src="logo-rounded.png" alt="Empty Classroom Logo" width="80" height="80">
</div>

![Modal_in_ModalDetails](https://github.com/lam-vincent/Empty-Classroom/assets/62343240/6708b344-06d1-4ac4-9fd0-e08cfdb2a326)

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [Getting Started](#getting-started)
   - [Frontend Setup](#frontend-setup)
   - [Backend Setup](#backend-setup)
   - [Database Setup](#database-setup)
4. [Sitemap](#sitemap)
5. [Contributors](#contributors)
6. [License](#license)

## Tech Stack

- **Frontend**: Vue, Vite, TypeScript, Vanilla CSS
- **Backend**: Express, Node.js, TypeScript
- **Database**: MySQL

## Features

### User Authentication

- Users can register an account by providing their username, email, and password.
- Registered users can log in using their credentials.
- JWT tokens are used for secure and token-based authentication.

### Dashboard

- The dashboard welcomes the user and displays their favorite classrooms.

### Room Reservation

- Users can browse and reserve available classrooms within their school's campus.

## Getting Started

### Frontend Setup

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the frontend directory: `cd client`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`

### Backend Setup

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the backend directory: `cd server`
3. Install dependencies: `npm install`
4. Configure environment variables: get the `.env` file.
5. Start the backend server: `npm start`

## Sitemap

On my computer it is `http://localhost:5173/`. Get the right information by following the instruction from the console after launching the client side.

Then, specify the pages you want to access:

- When you access `/dashboard`, it will render `Dashboard.vue`.
- When you access `/find`, it will render `Find.vue`.
- When you access `/group`, it will render `Group.vue`.
- When you access `/login`, it will render `Login.vue`.
- When you access `/register`, it will render `Register.vue`.
- When you access `/reserve`, it will render `Reserve.vue`.

## Contributors

- Vincent LAM - Alexandre CHRISTINA

## License

This project is licensed under the [MIT License](LICENSE).
