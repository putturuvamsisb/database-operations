import React, { useState } from 'react';
import { Plus, Download, Upload, Save, Eye } from 'lucide-react';
import { TableNode } from './erd/TableNode';
import { RelationshipLine } from './erd/RelationshipLine';

interface Table {
  id: string;
  name: string;
  x: number;
  y: number;
  columns: Array<{
    id: string;
    name: string;
    type: string;
    isPrimaryKey: boolean;
    isForeignKey: boolean;
    isRequired: boolean;
  }>;
}

interface Relationship {
  id: string;
  fromTable: string;
  toTable: string;
  fromColumn: string;
  toColumn: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
}

export function ERDDesigner() {
  const [tables, setTables] = useState<Table[]>([
    {
      id: '1',
      name: 'users',
      x: 100,
      y: 100,
      columns: [
        { id: '1', name: 'id', type: 'UUID', isPrimaryKey: true, isForeignKey: false, isRequired: true },
        { id: '2', name: 'email', type: 'VARCHAR(255)', isPrimaryKey: false, isForeignKey: false, isRequired: true },
        { id: '3', name: 'first_name', type: 'VARCHAR(100)', isPrimaryKey: false, isForeignKey: false, isRequired: true },
        { id: '4', name: 'last_name', type: 'VARCHAR(100)', isPrimaryKey: false, isForeignKey: false, isRequired: true },
        { id: '5', name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isForeignKey: false, isRequired: true },
      ]
    },
    {
      id: '2',
      name: 'orders',
      x: 400,
      y: 100,
      columns: [
        { id: '6', name: 'id', type: 'UUID', isPrimaryKey: true, isForeignKey: false, isRequired: true },
        { id: '7', name: 'user_id', type: 'UUID', isPrimaryKey: false, isForeignKey: true, isRequired: true },
        { id: '8', name: 'total_amount', type: 'DECIMAL(10,2)', isPrimaryKey: false, isForeignKey: false, isRequired: true },
        { id: '9', name: 'status', type: 'VARCHAR(50)', isPrimaryKey: false, isForeignKey: false, isRequired: true },
        { id: '10', name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isForeignKey: false, isRequired: true },
      ]
    },
    {
      id: '3',
      name: 'products',
      x: 100,
      y: 350,
      columns: [
        { id: '11', name: 'id', type: 'UUID', isPrimaryKey: true, isForeignKey: false, isRequired: true },
        { id: '12', name: 'name', type: 'VARCHAR(255)', isPrimaryKey: false, isForeignKey: false, isRequired: true },
        { id: '13', name: 'price', type: 'DECIMAL(10,2)', isPrimaryKey: false, isForeignKey: false, isRequired: true },
        { id: '14', name: 'category_id', type: 'UUID', isPrimaryKey: false, isForeignKey: true, isRequired: true },
        { id: '15', name: 'stock_quantity', type: 'INTEGER', isPrimaryKey: false, isForeignKey: false, isRequired: true },
      ]
    }
  ]);

  const [relationships] = useState<Relationship[]>([
    {
      id: '1',
      fromTable: 'users',
      toTable: 'orders',
      fromColumn: 'id',
      toColumn: 'user_id',
      type: 'one-to-many'
    }
  ]);

  const [showSQL, setShowSQL] = useState(false);

  const generateSQL = () => {
    return tables.map(table => {
      const columns = table.columns.map(col => {
        let columnDef = `  ${col.name} ${col.type}`;
        if (col.isPrimaryKey) columnDef += ' PRIMARY KEY';
        if (col.isRequired && !col.isPrimaryKey) columnDef += ' NOT NULL';
        return columnDef;
      }).join(',\n');

      return `CREATE TABLE IF NOT EXISTS ${table.name} (\n${columns}\n);`;
    }).join('\n\n');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Entity-Relationship Diagram</h2>
          <p className="text-gray-600">Design and visualize your database schema</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowSQL(!showSQL)}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Eye className="h-4 w-4" />
            <span>{showSQL ? 'Hide SQL' : 'View SQL'}</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Save className="h-4 w-4" />
            <span>Save Schema</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {showSQL && (
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Generated SQL Schema</h3>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
              Copy SQL
            </button>
          </div>
          <pre className="text-green-400 text-sm overflow-x-auto">
            <code>{generateSQL()}</code>
          </pre>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Schema Diagram</h3>
          <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Add Table</span>
          </button>
        </div>

        <div className="relative h-96 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
          <svg className="absolute inset-0 w-full h-full">
            {relationships.map(rel => (
              <RelationshipLine key={rel.id} relationship={rel} tables={tables} />
            ))}
          </svg>
          
          {tables.map(table => (
            <TableNode
              key={table.id}
              table={table}
              onMove={(x, y) => {
                setTables(tables.map(t => 
                  t.id === table.id ? { ...t, x, y } : t
                ));
              }}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Schema Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Tables</span>
              <span className="font-medium">{tables.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Relationships</span>
              <span className="font-medium">{relationships.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Columns</span>
              <span className="font-medium">{tables.reduce((sum, table) => sum + table.columns.length, 0)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Normalization Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">1NF Compliance</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">✓ Passed</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">2NF Compliance</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">✓ Passed</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">3NF Compliance</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">⚠ Review</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
          <div className="space-y-2 text-sm">
            <div className="p-2 bg-blue-50 text-blue-800 rounded">
              Consider adding indexes to foreign key columns
            </div>
            <div className="p-2 bg-yellow-50 text-yellow-800 rounded">
              Review naming conventions for consistency
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}