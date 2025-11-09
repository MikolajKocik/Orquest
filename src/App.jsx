import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Board from './components/Board'
import './App.css'
import './Sidebar.css'
import Sidebar from './components/Sidebar';

const DashboardPage = () => {
  return <h1>Welcome on dashboard!</h1>
}

const SettingsPage = () => {
  return <h1>Project's settings</h1>
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <main className="app-content">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/board" element={<Board />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App
