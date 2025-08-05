import React from 'react';
import { Database, Bell, Search } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Database className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">DB Optimizer Pro</h1>
            <p className="text-sm text-gray-600">Database Development & Optimization Platform</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search schemas, queries..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">DA</span>
          </div>
        </div>
      </div>
    </header>
  );
}