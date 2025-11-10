import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';

const Navbar = () => {
    return (
        <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm">
            {/* Search */}
            <div className="flex-1 flex items-center gap-4">
                <div className="relative w-80">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search for tasks..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    />
                </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition relative">
                    <Bell size={20} className="text-slate-600" />
                    {/* Notification point */}
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition">
                    <Settings size={20} className="text-slate-600" />
                </button>
                {/* Avatar - todo based on account, now its static*/}
                <div className="w-9 h-9 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold text-sm">
                    MK
                </div>
            </div>
        </div>
    );
};

export default Navbar;