import React, { useState } from 'react';
import { Database, BarChart3, FileText, Users, Settings, Play, Table, Activity, Shield } from 'lucide-react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ERDDesigner } from './components/ERDDesigner';
import { SchemaManager } from './components/SchemaManager';
import { QueryBuilder } from './components/QueryBuilder';
import { PerformanceMonitor } from './components/PerformanceMonitor';
import { DataValidator } from './components/DataValidator';
import { TestingFramework } from './components/TestingFramework';
import { Documentation } from './components/Documentation';
import { UserManagement } from './components/UserManagement';

export type ActiveView = 'erd' | 'schema' | 'query' | 'performance' | 'validation' | 'testing' | 'docs' | 'users';

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('erd');

  const renderContent = () => {
    switch (activeView) {
      case 'erd':
        return <ERDDesigner />;
      case 'schema':
        return <SchemaManager />;
      case 'query':
        return <QueryBuilder />;
      case 'performance':
        return <PerformanceMonitor />;
      case 'validation':
        return <DataValidator />;
      case 'testing':
        return <TestingFramework />;
      case 'docs':
        return <Documentation />;
      case 'users':
        return <UserManagement />;
      default:
        return <ERDDesigner />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;