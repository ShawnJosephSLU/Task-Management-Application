# Task Management Application

## Introduction

This project is a full-stack web application for task management with user authentication. It is designed to allow users to register, sign in, and manage their tasks effectively. The backend is built with Node.js and Express, providing REST API endpoints for managing users and tasks. The frontend is developed using React and TypeScript, offering a dynamic user interface for interacting with the application.

## Getting Started

### Prerequisites

- Node.js
- npm

### Backend Setup

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Add your .env file to the backend dir
   
4. Start the server:
   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```
4. Access the application at the port specified by the output

## Features

- User registration and sign-in
- Task creation, editing, and deletion
- Task viewing in a dashboard format

## Technology Stack

- **Backend:** Node.js, Express, MongoDB 
- **Frontend:** React, TypeScript, Vite for bundling

## Project Structure

### Backend

- `models/` - Data models for users and tasks
- `routes/` - API route definitions
- `controllers/` - Business logic for handling requests
- `middleware/` - Middleware for authentication and error handling
- `config/` - Configuration files, including database connection

### Frontend

- `src/pages/` - React components for each page
- `src/components/` - Reusable React components
- `src/App.tsx` - Main application component with routing setup

## Conclusion

This README provides a basic guide to getting started with the task management application.
