import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, LogOut, LayoutDashboard, ClipboardCheck, Cog } from 'lucide-react';

const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const baseLinkClass = "w-full flex items-center gap-4 px-4 py-3 rounded-lg transition";
    const inactiveLinkClass = "hover:bg-slate-700 text-slate-300";
    const activeLinkClass = "bg-blue-600 text-white";

    return (
        <div 
            className={`${sidebarOpen ? 'w-64' : 'w-20'}
                        bg-slate-900 text-white
                        transition-all duration-300
                        flex flex-col shadow-lg`}
        >
            <div className="p-4 flex items-center justify-between border-b border-slate-700">
                {sidebarOpen &&  <h1 className="text-2xl font-bold text-white">Orquest</h1>}
                <button onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 hover:bg-slate-700 rounded-lg transition"
                >
                    <Menu size={20} />
                </button>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-2">
                <NavLink
                    to="/"
                    className={({ isActive }) => 
                        `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`
                    }
                >
                    <LayoutDashboard size={20} />
                    {sidebarOpen && <span className="font-medium">Dashboard</span>}
                </NavLink>
                <NavLink
                    to="/board"
                    className={({ isActive }) => 
                        `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`
                    } 
                >
                    <ClipboardCheck size={20} />
                    {sidebarOpen && <span className="font-medium">Board</span>}
                </NavLink>
                <NavLink
                    to="/settings"
                    className={({ isActive }) => 
                        `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`
                    }
                >
                    <Cog size={20} />
                    {sidebarOpen && <span className="font-medium">Settings</span>}
                </NavLink>
            </nav>

            <div className="border-t border-slate-700 p-3 space-y-2">
                <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-slate-700 text-slate-300 transition">
                    <LogOut size={20} />
                    {sidebarOpen && <span>LogOut</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;