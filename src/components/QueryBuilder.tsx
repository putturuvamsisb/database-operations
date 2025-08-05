import React, { useState } from 'react';
import { Play, Save, History, Download, Copy, AlertCircle } from 'lucide-react';

export function QueryBuilder() {
  const [query, setQuery] = useState(`SELECT u.first_name, u.last_name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.first_name, u.last_name
ORDER BY order_count DESC
LIMIT 10;`);

  const [results, setResults] = useState([
    { first_name: 'John', last_name: 'Doe', order_count: 15 },
    { first_name: 'Jane', last_name: 'Smith', order_count: 12 },
    { first_name: 'Mike', last_name: 'Johnson', order_count: 8 },
    { first_name: 'Sarah', last_name: 'Wilson', order_count: 6 },
    { first_name: 'Tom', last_name: 'Brown', order_count: 5 },
  ]);

  const [executionTime, setExecutionTime] = useState('127ms');
  const [isExecuting, setIsExecuting] = useState(false);

  const queryHistory = [
    { id: '1', query: 'SELECT COUNT(*) FROM users WHERE...', timestamp: '2024-01-20 14:30', duration: '45ms' },
    { id: '2', query: 'SELECT p.name, SUM(oi.quantity) FROM...', timestamp: '2024-01-20 14:25', duration: '89ms' },
    { id: '3', query: 'UPDATE products SET price = price * 1.1...', timestamp: '2024-01-20 14:20', duration: '234ms' },
  ];

  const handleExecuteQuery = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setExecutionTime('127ms');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">SQL Query Builder</h2>
          <p className="text-gray-600">Write, test, and optimize your SQL queries</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Query Editor</h3>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleExecuteQuery}
                  disabled={isExecuting}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Play className="h-4 w-4" />
                  <span>{isExecuting ? 'Executing...' : 'Execute'}</span>
                </button>
              </div>
            </div>
            
            <div className="p-0">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-64 p-4 font-mono text-sm border-none resize-none focus:outline-none focus:ring-0"
                placeholder="Enter your SQL query here..."
              />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <h3 className="font-semibold text-gray-900">Query Results</h3>
                <span className="text-sm text-gray-500">Execution time: {executionTime}</span>
                <span className="text-sm text-gray-500">{results.length} rows</span>
              </div>
              <button className="flex items-center space-x-2 px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    {results.length > 0 && Object.keys(results[0]).map((key) => (
                      <th key={key} className="text-left p-4 font-medium text-gray-900">
                        {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {results.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      {Object.values(row).map((value, cellIndex) => (
                        <td key={cellIndex} className="p-4 text-gray-900">
                          {String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Query History</h3>
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {queryHistory.map((item) => (
                <button
                  key={item.id}
                  className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setQuery(item.query)}
                >
                  <div className="space-y-2">
                    <div className="text-sm text-gray-900 font-mono truncate">
                      {item.query}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{item.timestamp}</span>
                      <span>{item.duration}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Query Analysis</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Query is optimized</div>
                  <div className="text-xs text-gray-600">Proper indexes are being used</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                <div>• Uses index on users.created_at</div>
                <div>• Efficient JOIN operation</div>
                <div>• LIMIT clause prevents large result sets</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-4 space-y-2">
              <button
                onClick={() => setQuery('SELECT * FROM users LIMIT 10;')}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Select from users
              </button>
              <button
                onClick={() => setQuery('SELECT COUNT(*) FROM orders WHERE created_at >= CURRENT_DATE;')}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Today's orders count
              </button>
              <button
                onClick={() => setQuery('EXPLAIN ANALYZE SELECT * FROM products WHERE price > 100;')}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Explain query plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}