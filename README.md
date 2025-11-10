# Orquest - Project Management System (In progress)

Orquest is a modern web application for visual project and task management. It allows teams to organize their work using an intuitive kanban-style board interface, where tasks can be moved between columns representing different stages of progress.

This repository contains the **frontend** source code for the application, built with **React**.

The application is built on a separate frontend and backend architecture.

## Technology Stack

* **React (v19)** with **TypeScript**
* **Vite** as the build tool and development server
* **Tailwind CSS (v4)** for utility-first styling
* **React Router (`react-router-dom`)** for client-side routing
* **`lucide-react`** for icons
* **ESLint** for code linting

## Project Setup

This documents the key commands used to add TypeScript and Tailwind CSS to the base Vite + React project.

**1. Add TypeScript:**
```sh
npm install -D typescript @types/react @types/react-dom @types/node
```

**2. Add Tailwind CSS (v4) & Vite Plugin:**
```sh
npm install -D tailwindcss postcss autoprefixer
npm install @tailwindcss/vite
```

**3. Add React Router:**
```sh
npm install react-router-dom
```

**4. Add icons:**
```sh
npm install lucide-react
```

## Getting Started

To run the frontend part of the application locally, follow these steps.

1.  **Clone the repository:**
    ```bash
    git clone "https://github.com/MikolajKocik/Orquest.git"
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd <your-directory>
    ```

3.  **Install dependencies:**
    Ensure you have Node.js and npm installed. This will install all dependencies from `package.json`, including React, Tailwind, and TypeScript.
    ```bash
    npm install
    ```

4.  **Run the development server:**
    This script will start the application in development mode with Hot Module Replacement (HMR).
    ```bash
    npm run dev
    ```
    The application will be available by default at `http://localhost:5173` (or another port specified by Vite).

**Note:** For the application to be fully functional (i.e., to load data on the board), the .NET backend server must be running concurrently to handle requests to `/api/board`.
