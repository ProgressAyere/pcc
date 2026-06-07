import React from 'react';
import { FolderOpen, Image, Mail, Star, TrendingUp } from 'lucide-react';

const Overview = () => {
  const stats = [
    { icon: FolderOpen, label: 'Total Projects', value: '24', color: 'bg-blue-500' },
    { icon: Image, label: 'Media Files', value: '156', color: 'bg-green-500' },
    { icon: Mail, label: 'Contact Submissions', value: '43', color: 'bg-purple-500' },
    { icon: Star, label: 'Testimonials', value: '18', color: 'bg-yellow-500' },
  ];

  const recentActivity = [
    { action: 'New project added', time: '2 hours ago', type: 'project' },
    { action: 'Contact form submission', time: '4 hours ago', type: 'contact' },
    { action: 'Testimonial approved', time: '1 day ago', type: 'testimonial' },
    { action: 'Media uploaded', time: '2 days ago', type: 'media' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-black mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-0">
                <TrendingUp className="w-5 h-5 text-[#FFD700]" />
                <div className="flex-1">
                  <p className="text-black font-medium">{activity.action}</p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-[#FFD700] text-black font-semibold py-3 rounded hover:bg-yellow-500 transition-all">
              Add New Project
            </button>
            <button className="w-full bg-gray-800 text-white font-semibold py-3 rounded hover:bg-gray-700 transition-all">
              Upload Media
            </button>
            <button className="w-full border-2 border-gray-800 text-black font-semibold py-3 rounded hover:bg-gray-800 hover:text-white transition-all">
              View Submissions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
