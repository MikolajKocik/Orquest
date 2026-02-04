# Orquest - Project Management System (In progress)

Orquest is a modern web application for visual project and task management. It allows teams to organize their work using an intuitive kanban-style board interface, where tasks can be moved between columns representing different stages of progress.

This repository contains the **frontend** source code for the application, built with **Angular**.

The application is built on a separate frontend and backend architecture.

## Technology Stack

* **Angular (v21)** with **TypeScript**
* **Angular Router** for client-side routing

## Getting Started

To run the frontend part of the application locally, follow these steps.

1.  **Clone the repository:**
    ```bash
    git clone "https://github.com/MikolajKocik/Orquest.git"
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd Orquest
    ```

3.  **Install dependencies:**
    Ensure you have Node.js and npm installed. This will install all dependencies from `package.json`.
    ```bash
    npm install
    ```

4.  **Run the development server:**
    This script will start the application in development mode.
    ```bash
    npm start
    ```
    The application will be available by default at `http://localhost:4200`.

## Available Scripts

* `npm start` - Starts the development server
* `npm run build` - Builds the application for production
* `npm test` - Runs unit tests
* `npm run watch` - Builds the application in watch mode for development

**Note:** For the application to be fully functional, the .NET backend server must be running concurrently to handle API requests.
