import React, { useState } from 'react';
import { Users, UserPlus, Shield, Key, Settings, Eye, EyeOff } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'developer' | 'analyst' | 'viewer';
  status: 'active' | 'inactive';
  lastAccess: string;
  permissions: string[];
}

export function UserManagement() {
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'admin',
      status: 'active',
      lastAccess: '2024-01-20 14:30',
      permissions: ['read', 'write', 'delete', 'admin']
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      role: 'developer',
      status: 'active',
      lastAccess: '2024-01-20 13:45',
      permissions: ['read', 'write', 'schema']
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'analyst',
      status: 'active',
      lastAccess: '2024-01-20 12:15',
      permissions: ['read', 'query']
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      role: 'viewer',
      status: 'inactive',
      lastAccess: '2024-01-18 16:20',
      permissions: ['read']
    }
  ]);

  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedRole, setSelectedRole] = useState('viewer');

  const rolePermissions = {
    admin: ['Full database access', 'User management', 'Schema modifications', 'System configuration'],
    developer: ['Read/Write access', 'Schema modifications', 'Query execution', 'Performance monitoring'],
    analyst: ['Read access', 'Query execution', 'Report generation', 'Data export'],
    viewer: ['Read access only', 'View documentation', 'Basic queries']
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'developer':
        return 'bg-blue-100 text-blue-800';
      case 'analyst':
        return 'bg-green-100 text-green-800';
      case 'viewer':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Access Management</h2>
          <p className="text-gray-600">Manage database users, roles, and permissions</p>
        </div>
        <button
          onClick={() => setShowAddUser(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add User</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <Users className="h-8 w-8 text-gray-400" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <Shield className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Administrators</p>
              <p className="text-2xl font-bold text-red-600">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
            <Key className="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Developers</p>
              <p className="text-2xl font-bold text-blue-600">
                {users.filter(u => u.role === 'developer').length}
              </p>
            </div>
            <Settings className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Database Users</h3>
          <p className="text-gray-600 text-sm">Manage user access and permissions</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4 font-medium text-gray-900">User</th>
                <th className="text-left p-4 font-medium text-gray-900">Role</th>
                <th className="text-left p-4 font-medium text-gray-900">Status</th>
                <th className="text-left p-4 font-medium text-gray-900">Last Access</th>
                <th className="text-left p-4 font-medium text-gray-900">Permissions</th>
                <th className="text-left p-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 text-sm">{user.lastAccess}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.slice(0, 2).map((perm, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {perm}
                        </span>
                      ))}
                      {user.permissions.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{user.permissions.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                        <Settings className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <EyeOff className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Role Permissions</h3>
            <p className="text-gray-600 text-sm">Overview of permissions by role</p>
          </div>
          <div className="divide-y divide-gray-200">
            {Object.entries(rolePermissions).map(([role, permissions]) => (
              <div key={role} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {permissions.map((permission, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                          {permission}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(role)}`}>
                    {users.filter(u => u.role === role).length} users
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Access Logs</h3>
            <p className="text-gray-600 text-sm">Recent database access activity</p>
          </div>
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {[
              { user: 'John Doe', action: 'Schema modification', timestamp: '2024-01-20 14:30', status: 'success' },
              { user: 'Jane Smith', action: 'Query execution', timestamp: '2024-01-20 14:25', status: 'success' },
              { user: 'Mike Johnson', action: 'Data export', timestamp: '2024-01-20 14:20', status: 'success' },
              { user: 'Sarah Wilson', action: 'Login attempt', timestamp: '2024-01-20 14:15', status: 'failed' },
            ].map((log, index) => (
              <div key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{log.user}</div>
                    <div className="text-sm text-gray-600">{log.action}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{log.timestamp}</div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Add New User</h3>
              <button
                onClick={() => setShowAddUser(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="viewer">Viewer</option>
                  <option value="analyst">Analyst</option>
                  <option value="developer">Developer</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-medium text-gray-900 mb-2">Role Permissions:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {rolePermissions[selectedRole as keyof typeof rolePermissions].map((permission, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                      {permission}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowAddUser(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}