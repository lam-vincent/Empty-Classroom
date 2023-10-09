# Empty Classroom

**Empty Classroom** is a web application designed to help students find and reserve available classrooms within their school's campus.

<div align="center">
  <img src="./client/public/logo-rounded.png" alt="Empty Classroom Logo" width="80" height="80">
</div>

## Table of Contents

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Getting Started](#getting-started)
   - [Frontend Setup](#frontend-setup)
   - [Backend Setup](#backend-setup)
   - [Database Setup](#database-setup)
5. [License](#license)

## Introduction

**Empty Classroom** is a web application designed to help students easily find and reserve empty classrooms within their school's campus.

## Tech Stack

- **Frontend**: Vue, Vite, TypeScript, Vanilla CSS
- **Backend**: Express, Node.js
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

## Contributors

- Vincent LAM

## License

This project is licensed under the [MIT License](LICENSE).
