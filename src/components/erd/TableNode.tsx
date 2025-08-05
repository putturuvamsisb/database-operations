import React, { useState } from 'react';
import { Key, Link, Edit3 } from 'lucide-react';

interface Column {
  id: string;
  name: string;
  type: string;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  isRequired: boolean;
}

interface Table {
  id: string;
  name: string;
  x: number;
  y: number;
  columns: Column[];
}

interface TableNodeProps {
  table: Table;
  onMove: (x: number, y: number) => void;
}

export function TableNode({ table, onMove }: TableNodeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - table.x,
      y: e.clientY - table.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      onMove(e.clientX - dragStart.x, e.clientY - dragStart.y);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`absolute bg-white border-2 border-gray-300 rounded-lg shadow-lg min-w-48 ${
        isDragging ? 'cursor-grabbing shadow-xl border-blue-400' : 'cursor-grab'
      }`}
      style={{ left: table.x, top: table.y }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg flex items-center justify-between">
        <h4 className="font-semibold text-sm">{table.name}</h4>
        <Edit3 className="h-3 w-3 opacity-70" />
      </div>
      
      <div className="p-2">
        {table.columns.map(column => (
          <div key={column.id} className="flex items-center space-x-2 py-1 text-xs">
            <div className="flex items-center space-x-1">
              {column.isPrimaryKey && <Key className="h-3 w-3 text-yellow-600" />}
              {column.isForeignKey && <Link className="h-3 w-3 text-blue-600" />}
            </div>
            <span className={`font-medium ${column.isPrimaryKey ? 'text-yellow-700' : column.isForeignKey ? 'text-blue-700' : 'text-gray-800'}`}>
              {column.name}
            </span>
            <span className="text-gray-500 text-xs">{column.type}</span>
            {column.isRequired && !column.isPrimaryKey && (
              <span className="text-red-500 text-xs">*</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}