import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Board from './components/Board';
import Sidebar from './components/Sidebar';

const DashboardPage = () => {
  return <h1 
      className="p-8 text-3xl font-bold text-slate-900">
          Welcome on dashboard!
        </h1>}

const SettingsPage = () => {
  return <h1 
      className="p-8 text-3xl font-bold text-slate-900">
          Project's settings
        </h1>}

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-slate-100">
        <Sidebar />

        <main className="flex-1 flex flex-col overflow-hidden">
          <Navbar />

          <div className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/board" element={<Board />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App
