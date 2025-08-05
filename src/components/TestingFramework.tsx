import React, { useState } from 'react';
import { Play, Plus, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';

interface TestCase {
  id: string;
  name: string;
  type: 'integrity' | 'performance' | 'data' | 'security';
  status: 'passed' | 'failed' | 'running' | 'pending';
  duration: string;
  lastRun: string;
  description: string;
}

export function TestingFramework() {
  const [testCases] = useState<TestCase[]>([
    {
      id: '1',
      name: 'User Registration Flow',
      type: 'integrity',
      status: 'passed',
      duration: '245ms',
      lastRun: '2024-01-20 14:30',
      description: 'Tests complete user registration process including validation'
    },
    {
      id: '2',
      name: 'Order Processing Performance',
      type: 'performance',
      status: 'failed',
      duration: '2.1s',
      lastRun: '2024-01-20 14:25',
      description: 'Performance test for order processing under load'
    },
    {
      id: '3',
      name: 'Data Consistency Check',
      type: 'data',
      status: 'passed',
      duration: '567ms',
      lastRun: '2024-01-20 14:20',
      description: 'Validates data consistency across related tables'
    },
    {
      id: '4',
      name: 'Authentication Security',
      type: 'security',
      status: 'passed',
      duration: '123ms',
      lastRun: '2024-01-20 14:15',
      description: 'Tests authentication mechanisms and security constraints'
    },
    {
      id: '5',
      name: 'Bulk Insert Operations',
      type: 'performance',
      status: 'running',
      duration: '-',
      lastRun: '2024-01-20 14:35',
      description: 'Performance test for large batch insert operations'
    }
  ]);

  const [selectedSuite, setSelectedSuite] = useState('all');
  const testSuites = ['all', 'integrity', 'performance', 'data', 'security'];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'running':
        return <Clock className="h-5 w-5 text-blue-600 animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'running':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'integrity':
        return 'bg-purple-100 text-purple-800';
      case 'performance':
        return 'bg-orange-100 text-orange-800';
      case 'data':
        return 'bg-green-100 text-green-800';
      case 'security':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTests = selectedSuite === 'all' 
    ? testCases 
    : testCases.filter(test => test.type === selectedSuite);

  const testStats = {
    total: testCases.length,
    passed: testCases.filter(t => t.status === 'passed').length,
    failed: testCases.filter(t => t.status === 'failed').length,
    running: testCases.filter(t => t.status === 'running').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Testing Framework</h2>
          <p className="text-gray-600">Automated database testing and validation</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Plus className="h-4 w-4" />
            <span>New Test</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Play className="h-4 w-4" />
            <span>Run All Tests</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tests</p>
              <p className="text-2xl font-bold text-gray-900">{testStats.total}</p>
            </div>
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Passed</p>
              <p className="text-2xl font-bold text-green-600">{testStats.passed}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-red-600">{testStats.failed}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Running</p>
              <p className="text-2xl font-bold text-blue-600">{testStats.running}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Test Cases</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Filter by type:</span>
              <select
                value={selectedSuite}
                onChange={(e) => setSelectedSuite(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {testSuites.map(suite => (
                  <option key={suite} value={suite}>
                    {suite.charAt(0).toUpperCase() + suite.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredTests.map((test) => (
            <div key={test.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(test.status)}
                  <div>
                    <h4 className="font-medium text-gray-900">{test.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{test.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(test.type)}`}>
                        {test.type.charAt(0).toUpperCase() + test.type.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">Last run: {test.lastRun}</span>
                      {test.duration !== '-' && (
                        <span className="text-xs text-gray-500">Duration: {test.duration}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(test.status)}`}>
                    {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Play className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Test Results History</h3>
          </div>
          <div className="p-6">
            <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Test results chart would be displayed here</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Coverage Report</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span>Database Operations</span>
                <span>87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Data Integrity</span>
                <span>92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Performance Tests</span>
                <span>74%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '74%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Security Tests</span>
                <span>95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}