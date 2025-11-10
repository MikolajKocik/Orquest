import React, { useState, useEffect } from 'react';
import { ListChecks, Loader, CheckCheck, Package } from 'lucide-react';

const defaultStats = {
  total: 0,
  todo: 0,
  inProgress: 0,
  done: 0
};

const DashboardPage = () => {
  const [stats , setStats] = useState(defaultStats);

  useEffect(() => {
      fetch('/api/tasks')
          .then(res => {
            if (!res.ok) throw new Error("Failed to fetch data for dashboard");
            return res.json()
          })
          .then(data => setStats(data))
          .catch(error => {
                    console.error("Error while loading the dashboard:", error);
          });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Package className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">All tasks</p>
            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
          <div className="bg-gray-100 p-3 rounded-full">
            <ListChecks className="text-gray-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">To Do's</p>
            <p className="text-2xl font-bold text-slate-900">{stats.todo}</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
          <div className="bg-yellow-100 p-3 rounded-full">
            <Loader className="text-yellow-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">In progress</p>
            <p className="text-2xl font-bold text-slate-900">{stats.inProgress}</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCheck className="text-green-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Done</p>
            <p className="text-2xl font-bold text-slate-900">{stats.done}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;