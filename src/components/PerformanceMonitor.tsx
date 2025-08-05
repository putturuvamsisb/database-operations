import React, { useState } from 'react';
import { TrendingUp, Clock, Database, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

export function PerformanceMonitor() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');

  const performanceMetrics = [
    { name: 'Avg Query Time', value: '45ms', change: '-12%', trend: 'down', color: 'text-green-600' },
    { name: 'Active Connections', value: '127', change: '+5%', trend: 'up', color: 'text-blue-600' },
    { name: 'Cache Hit Rate', value: '94.2%', change: '+2.1%', trend: 'up', color: 'text-green-600' },
    { name: 'Slow Queries', value: '3', change: '-40%', trend: 'down', color: 'text-orange-600' },
  ];

  const slowQueries = [
    { id: '1', query: 'SELECT * FROM orders JOIN users ON...', duration: '2.3s', executions: 45, table: 'orders' },
    { id: '2', query: 'SELECT COUNT(*) FROM products WHERE...', duration: '1.8s', executions: 23, table: 'products' },
    { id: '3', query: 'UPDATE inventory SET quantity = ...', duration: '1.2s', executions: 12, table: 'inventory' },
  ];

  const indexRecommendations = [
    { table: 'orders', column: 'user_id', impact: 'High', estimatedImprovement: '60%' },
    { table: 'products', column: 'category_id', impact: 'Medium', estimatedImprovement: '35%' },
    { table: 'order_items', column: 'product_id', impact: 'Medium', estimatedImprovement: '25%' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Performance Monitor</h2>
          <p className="text-gray-600">Track database performance and optimization opportunities</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{metric.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
              </div>
              <div className={`flex items-center space-x-1 ${metric.color}`}>
                <TrendingUp className={`h-4 w-4 ${metric.trend === 'down' ? 'transform rotate-180' : ''}`} />
                <span className="text-sm font-medium">{metric.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Query Performance</h3>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Performance chart would be displayed here</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Database Load</h3>
              <Database className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Load metrics chart would be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Slow Queries</h3>
              <AlertTriangle className="h-5 w-5 text-orange-500" />
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {slowQueries.map((query) => (
              <div key={query.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-mono text-gray-900 truncate">{query.query}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>Table: {query.table}</span>
                      <span>Executions: {query.executions}</span>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <span className="text-lg font-semibold text-red-600">{query.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Index Recommendations</h3>
              <Zap className="h-5 w-5 text-green-500" />
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {indexRecommendations.map((rec, index) => (
              <div key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {rec.table}.{rec.column}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        rec.impact === 'High' ? 'bg-red-100 text-red-800' :
                        rec.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {rec.impact} Impact
                      </span>
                      <span className="text-sm text-gray-600">
                        +{rec.estimatedImprovement} performance
                      </span>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <CheckCircle className="h-4 w-4" />
                    <span>Apply</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}