import React from 'react';
import { BarChart3, FileText, Users, Settings, Play, Table, Activity, Shield, Database } from 'lucide-react';
import type { ActiveView } from '../App';

interface SidebarProps {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'erd' as ActiveView, label: 'ERD Designer', icon: Database },
    { id: 'schema' as ActiveView, label: 'Schema Manager', icon: Table },
    { id: 'query' as ActiveView, label: 'Query Builder', icon: Play },
    { id: 'performance' as ActiveView, label: 'Performance', icon: BarChart3 },
    { id: 'validation' as ActiveView, label: 'Data Validation', icon: Shield },
    { id: 'testing' as ActiveView, label: 'Testing', icon: Activity },
    { id: 'docs' as ActiveView, label: 'Documentation', icon: FileText },
    { id: 'users' as ActiveView, label: 'User Access', icon: Users },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeView === item.id
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}