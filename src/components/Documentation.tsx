import React, { useState } from 'react';
import { FileText, Download, Search, BookOpen, Code, Database } from 'lucide-react';

export function Documentation() {
  const [activeSection, setActiveSection] = useState('schema');

  const sections = [
    { id: 'schema', name: 'Schema Documentation', icon: Database },
    { id: 'procedures', name: 'Stored Procedures', icon: Code },
    { id: 'processes', name: 'Business Processes', icon: BookOpen },
    { id: 'apis', name: 'API Documentation', icon: FileText },
  ];

  const schemaDoc = {
    tables: [
      {
        name: 'users',
        description: 'Store user account information and authentication data',
        columns: [
          { name: 'id', type: 'UUID', description: 'Primary key, unique identifier for each user' },
          { name: 'email', type: 'VARCHAR(255)', description: 'User email address, used for authentication' },
          { name: 'first_name', type: 'VARCHAR(100)', description: 'User first name' },
          { name: 'last_name', type: 'VARCHAR(100)', description: 'User last name' },
          { name: 'created_at', type: 'TIMESTAMP', description: 'Account creation timestamp' },
        ]
      },
      {
        name: 'orders',
        description: 'Track customer orders and purchase history',
        columns: [
          { name: 'id', type: 'UUID', description: 'Primary key, unique order identifier' },
          { name: 'user_id', type: 'UUID', description: 'Foreign key reference to users table' },
          { name: 'total_amount', type: 'DECIMAL(10,2)', description: 'Total order amount in currency' },
          { name: 'status', type: 'VARCHAR(50)', description: 'Order status (pending, completed, cancelled)' },
          { name: 'created_at', type: 'TIMESTAMP', description: 'Order creation timestamp' },
        ]
      }
    ]
  };

  const procedures = [
    {
      name: 'calculate_user_metrics',
      description: 'Calculate user engagement metrics and order statistics',
      parameters: ['user_id UUID', 'date_range INTEGER'],
      returns: 'TABLE (total_orders INTEGER, total_spent DECIMAL, avg_order_value DECIMAL)'
    },
    {
      name: 'process_refund',
      description: 'Process order refunds and update inventory',
      parameters: ['order_id UUID', 'refund_amount DECIMAL', 'reason TEXT'],
      returns: 'BOOLEAN'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Documentation</h2>
          <p className="text-gray-600">Database schema, processes, and API documentation</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export Docs</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Documentation Sections</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                    activeSection === section.id ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <section.icon className="h-5 w-5 text-gray-400" />
                    <span className="font-medium text-gray-900">{section.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {activeSection === 'schema' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Database Schema</h3>
                  <p className="text-gray-600">Complete documentation of database tables and relationships</p>
                </div>
                <div className="divide-y divide-gray-200">
                  {schemaDoc.tables.map((table, index) => (
                    <div key={index} className="p-6">
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{table.name}</h4>
                        <p className="text-gray-600">{table.description}</p>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                              <th className="text-left p-3 font-medium text-gray-900">Column</th>
                              <th className="text-left p-3 font-medium text-gray-900">Type</th>
                              <th className="text-left p-3 font-medium text-gray-900">Description</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {table.columns.map((column, colIndex) => (
                              <tr key={colIndex}>
                                <td className="p-3 font-mono text-gray-900">{column.name}</td>
                                <td className="p-3 text-gray-600">{column.type}</td>
                                <td className="p-3 text-gray-600">{column.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'procedures' && (
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Stored Procedures</h3>
                <p className="text-gray-600">Documentation for all stored procedures and functions</p>
              </div>
              <div className="divide-y divide-gray-200">
                {procedures.map((proc, index) => (
                  <div key={index} className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{proc.name}</h4>
                    <p className="text-gray-600 mb-4">{proc.description}</p>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-gray-900">Parameters:</h5>
                        <ul className="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
                          {proc.parameters.map((param, paramIndex) => (
                            <li key={paramIndex} className="font-mono">{param}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900">Returns:</h5>
                        <p className="text-sm text-gray-600 font-mono">{proc.returns}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'processes' && (
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Business Processes</h3>
                <p className="text-gray-600">Documentation of key business processes and workflows</p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">User Registration Process</h4>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600">
                      <li>User submits registration form with email and password</li>
                      <li>System validates email format and password strength</li>
                      <li>Check for existing user with same email address</li>
                      <li>Create new user record in users table</li>
                      <li>Send confirmation email to user</li>
                      <li>Log registration event for analytics</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Order Processing Workflow</h4>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600">
                      <li>Customer adds items to cart and initiates checkout</li>
                      <li>System validates inventory availability</li>
                      <li>Calculate taxes and shipping costs</li>
                      <li>Process payment through payment gateway</li>
                      <li>Create order record and order items</li>
                      <li>Update inventory quantities</li>
                      <li>Send order confirmation email</li>
                      <li>Trigger fulfillment process</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'apis' && (
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">API Documentation</h3>
                <p className="text-gray-600">REST API endpoints and database interactions</p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">User Management APIs</h4>
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-mono">GET</span>
                          <span className="font-mono">/api/users/{id}</span>
                        </div>
                        <p className="text-gray-600 text-sm">Retrieve user information by ID</p>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-mono">POST</span>
                          <span className="font-mono">/api/users</span>
                        </div>
                        <p className="text-gray-600 text-sm">Create new user account</p>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-mono">PUT</span>
                          <span className="font-mono">/api/users/{id}</span>
                        </div>
                        <p className="text-gray-600 text-sm">Update user information</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}