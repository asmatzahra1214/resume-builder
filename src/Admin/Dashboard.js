import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Mock data - replace with actual API calls
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: '👥',
      change: '+12%',
      color: 'bg-blue-500',
    },
    {
      title: 'Resumes Created',
      value: '4,567',
      icon: '📄',
      change: '+8%',
      color: 'bg-green-500',
    },
    {
      title: 'Templates Used',
      value: '892',
      icon: '🎨',
      change: '+15%',
      color: 'bg-purple-500',
    },
    {
      title: 'Active Sessions',
      value: '156',
      icon: '🔗',
      change: '+3%',
      color: 'bg-orange-500',
    },
  ];

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'created resume', time: '2 min ago' },
    { id: 2, user: 'Jane Smith', action: 'downloaded template', time: '5 min ago' },
    { id: 3, user: 'Mike Johnson', action: 'signed up', time: '10 min ago' },
    { id: 4, user: 'Sarah Wilson', action: 'updated profile', time: '15 min ago' },
  ];

  const popularTemplates = [
    { name: 'Professional', usage: 234, color: 'bg-blue-200' },
    { name: 'Modern', usage: 189, color: 'bg-green-200' },
    { name: 'Creative', usage: 156, color: 'bg-purple-200' },
    { name: 'Minimal', usage: 143, color: 'bg-yellow-200' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your AI Resume Builder application and monitor user activities.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} from last week</p>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Activities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Activities</h2>
            <Link to="/admin/activities" className="text-[#043442] hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-gray-800">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Templates */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Popular Templates</h2>
          <div className="space-y-4">
            {popularTemplates.map((template, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">{template.name}</span>
                  <span className="text-sm text-gray-600">{template.usage} uses</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${template.color} h-2 rounded-full`}
                    style={{ width: `${(template.usage / 300) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/users"
            className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg text-center transition"
          >
            <div className="text-2xl mb-2">👥</div>
            <p className="font-medium text-blue-800">Manage Users</p>
          </Link>
          <Link
            to="/admin/templates"
            className="bg-green-50 hover:bg-green-100 p-4 rounded-lg text-center transition"
          >
            <div className="text-2xl mb-2">🎨</div>
            <p className="font-medium text-green-800">Templates</p>
          </Link>
          <Link
            to="/admin/analytics"
            className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg text-center transition"
          >
            <div className="text-2xl mb-2">📈</div>
            <p className="font-medium text-purple-800">Analytics</p>
          </Link>
          <Link
            to="/admin/settings"
            className="bg-orange-50 hover:bg-orange-100 p-4 rounded-lg text-center transition"
          >
            <div className="text-2xl mb-2">⚙️</div>
            <p className="font-medium text-orange-800">Settings</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;