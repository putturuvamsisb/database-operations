import React, { useState } from 'react';
import { Plus, Edit, Trash2, Database, Table, Eye, Code } from 'lucide-react';

interface Schema {
  id: string;
  name: string;
  tables: number;
  lastModified: string;
  status: 'active' | 'development' | 'archived';
}

export function SchemaManager() {
  const [schemas] = useState<Schema[]>([
    { id: '1', name: 'ecommerce_prod', tables: 12, lastModified: '2024-01-15', status: 'active' },
    { id: '2', name: 'ecommerce_dev', tables: 15, lastModified: '2024-01-20', status: 'development' },
    { id: '3', name: 'analytics', tables: 8, lastModified: '2024-01-10', status: 'active' },
    { id: '4', name: 'user_management', tables: 5, lastModified: '2024-01-05', status: 'archived' },
  ]);

  const [selectedSchema, setSelectedSchema] = useState<string>('1');
  const [showCreateTable, setShowCreateTable] = useState(false);

  const tables = [
    { name: 'users', columns: 8, rows: 15420, size: '2.1 MB', lastModified: '2024-01-20' },
    { name: 'orders', columns: 12, rows: 8940, size: '3.4 MB', lastModified: '2024-01-20' },
    { name: 'products', columns: 15, rows: 2340, size: '1.8 MB', lastModified: '2024-01-19' },
    { name: 'categories', columns: 6, rows: 45, size: '12 KB', lastModified: '2024-01-18' },
    { name: 'order_items', columns: 8, rows: 23450, size: '4.2 MB', lastModified: '2024-01-20' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Schema Management</h2>
          <p className="text-gray-600">Manage database schemas, tables, and structure</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>New Schema</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Code className="h-4 w-4" />
            <span>Import SQL</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Database Schemas</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {schemas.map((schema) => (
                <button
                  key={schema.id}
                  onClick={() => setSelectedSchema(schema.id)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                    selectedSchema === schema.id ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Database className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{schema.name}</div>
                      <div className="text-sm text-gray-500">{schema.tables} tables</div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      schema.status === 'active' ? 'bg-green-100 text-green-800' :
                      schema.status === 'development' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {schema.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {schemas.find(s => s.id === selectedSchema)?.name} Tables
                  </h3>
                  <p className="text-gray-600">Manage tables and their structure</p>
                </div>
                <button
                  onClick={() => setShowCreateTable(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Table</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left p-4 font-medium text-gray-900">Table Name</th>
                    <th className="text-left p-4 font-medium text-gray-900">Columns</th>
                    <th className="text-left p-4 font-medium text-gray-900">Rows</th>
                    <th className="text-left p-4 font-medium text-gray-900">Size</th>
                    <th className="text-left p-4 font-medium text-gray-900">Last Modified</th>
                    <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tables.map((table, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <Table className="h-5 w-5 text-gray-400" />
                          <span className="font-medium text-gray-900">{table.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">{table.columns}</td>
                      <td className="p-4 text-gray-600">{table.rows.toLocaleString()}</td>
                      <td className="p-4 text-gray-600">{table.size}</td>
                      <td className="p-4 text-gray-600">{table.lastModified}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showCreateTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Create New Table</h3>
              <button
                onClick={() => setShowCreateTable(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Table Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter table name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Columns</label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      placeholder="Column name"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>VARCHAR(255)</option>
                      <option>INTEGER</option>
                      <option>UUID</option>
                      <option>TEXT</option>
                      <option>BOOLEAN</option>
                      <option>TIMESTAMP</option>
                    </select>
                    <button className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <button className="mt-3 flex items-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>Add Column</span>
                </button>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowCreateTable(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Create Table
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}