import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

export function DataValidator() {
  const [isRunningValidation, setIsRunningValidation] = useState(false);

  const validationRules = [
    { id: '1', name: 'Email Format Validation', table: 'users', column: 'email', status: 'passed', issues: 0 },
    { id: '2', name: 'Foreign Key Constraints', table: 'orders', column: 'user_id', status: 'passed', issues: 0 },
    { id: '3', name: 'Price Range Validation', table: 'products', column: 'price', status: 'warning', issues: 12 },
    { id: '4', name: 'Date Consistency', table: 'orders', column: 'created_at', status: 'failed', issues: 3 },
    { id: '5', name: 'Unique Constraint Check', table: 'users', column: 'email', status: 'passed', issues: 0 },
  ];

  const integrityChecks = [
    { check: 'Referential Integrity', status: 'passed', description: 'All foreign key relationships are valid' },
    { check: 'Data Type Consistency', status: 'passed', description: 'All columns contain appropriate data types' },
    { check: 'Null Constraint Violations', status: 'warning', description: '5 records with unexpected null values' },
    { check: 'Duplicate Records', status: 'failed', description: '23 duplicate records found in users table' },
  ];

  const dataQualityMetrics = [
    { metric: 'Completeness', score: 94.2, description: '94.2% of required fields are populated' },
    { metric: 'Accuracy', score: 87.5, description: '87.5% of data passes validation rules' },
    { metric: 'Consistency', score: 91.8, description: '91.8% of data is consistent across tables' },
    { metric: 'Validity', score: 89.3, description: '89.3% of data conforms to business rules' },
  ];

  const handleRunValidation = () => {
    setIsRunningValidation(true);
    setTimeout(() => {
      setIsRunningValidation(false);
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Shield className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Data Validation</h2>
          <p className="text-gray-600">Ensure data integrity and quality across your database</p>
        </div>
        <button
          onClick={handleRunValidation}
          disabled={isRunningValidation}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isRunningValidation ? 'animate-spin' : ''}`} />
          <span>{isRunningValidation ? 'Running...' : 'Run Validation'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dataQualityMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{metric.metric}</h3>
              <Shield className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-gray-900">{metric.score}%</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${metric.score}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{metric.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Validation Rules</h3>
            <p className="text-gray-600 text-sm">Current status of defined validation rules</p>
          </div>
          <div className="divide-y divide-gray-200">
            {validationRules.map((rule) => (
              <div key={rule.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(rule.status)}
                    <div>
                      <h4 className="font-medium text-gray-900">{rule.name}</h4>
                      <p className="text-sm text-gray-600">
                        {rule.table}.{rule.column}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(rule.status)}`}>
                      {rule.status.charAt(0).toUpperCase() + rule.status.slice(1)}
                    </span>
                    {rule.issues > 0 && (
                      <div className="text-sm text-red-600 mt-1">{rule.issues} issues</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Integrity Checks</h3>
            <p className="text-gray-600 text-sm">Database integrity and constraint validation</p>
          </div>
          <div className="divide-y divide-gray-200">
            {integrityChecks.map((check, index) => (
              <div key={index} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(check.status)}
                    <div>
                      <h4 className="font-medium text-gray-900">{check.check}</h4>
                      <p className="text-sm text-gray-600 mt-1">{check.description}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(check.status)}`}>
                    {check.status.charAt(0).toUpperCase() + check.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Data Quality Report</h3>
              <p className="text-gray-600 text-sm">Detailed analysis of data quality issues</p>
            </div>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Export Report
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 font-medium text-gray-900">Issue Type</th>
                  <th className="text-left p-3 font-medium text-gray-900">Table</th>
                  <th className="text-left p-3 font-medium text-gray-900">Column</th>
                  <th className="text-left p-3 font-medium text-gray-900">Count</th>
                  <th className="text-left p-3 font-medium text-gray-900">Severity</th>
                  <th className="text-left p-3 font-medium text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-3 text-gray-900">Invalid Email Format</td>
                  <td className="p-3 text-gray-600">users</td>
                  <td className="p-3 text-gray-600">email</td>
                  <td className="p-3 text-gray-900">7</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Medium</span>
                  </td>
                  <td className="p-3">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Fix</button>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-gray-900">Orphaned Records</td>
                  <td className="p-3 text-gray-600">order_items</td>
                  <td className="p-3 text-gray-600">order_id</td>
                  <td className="p-3 text-gray-900">3</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">High</span>
                  </td>
                  <td className="p-3">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Fix</button>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-gray-900">Negative Price Values</td>
                  <td className="p-3 text-gray-600">products</td>
                  <td className="p-3 text-gray-600">price</td>
                  <td className="p-3 text-gray-900">2</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">High</span>
                  </td>
                  <td className="p-3">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Fix</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}