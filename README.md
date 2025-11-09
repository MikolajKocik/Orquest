# Orquest - Project Management System

Orquest is a modern web application for visual project and task management. It allows teams to organize their work using an intuitive kanban-style board interface, where tasks can be moved between columns representing different stages of progress.

This repository contains the **frontend** source code for the application, built with **React**.

The application is built on a separate frontend and backend architecture.

## Technology Stack

* **React** (v19)
* **Vite** as the build tool and development server
* **ESLint** for code linting
* Standard JavaScript (ES6+), HTML5, and CSS

## Getting Started 

To run the frontend part of the application locally, follow these steps.

1.  **Clone the repository:**
    ```sh
    git clone "https://github.com/MikolajKocik/Orquest.git"
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd <your-directory>
    ```

3.  **Install dependencies:**
    Ensure you have Node.js and npm installed.
    ```sh
    npm install
    ```

4.  **Run the development server:**
    This script will start the application in development mode with Hot Module Replacement (HMR).
    ```sh
    npm run dev
    ```
    The application will be available by default at `http://localhost:5173` (or another port specified by Vite).

**Note:** For the application to be fully functional (i.e., to load data on the board), the .NET backend server must be running concurrently to handle requests to `/api/board`.

## Available Scripts

The following scripts are available in the project:

* `npm run dev`: Starts the application in development mode.
* `npm run build`: Compiles and bundles the application for production (output to the `dist` directory).
* `npm run lint`: Runs ESLint to check for code style and errors.
* `npm run preview`: Starts a local server to preview the production build (run after `npm run build`).