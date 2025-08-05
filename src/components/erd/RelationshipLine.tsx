import React from 'react';

interface Relationship {
  id: string;
  fromTable: string;
  toTable: string;
  fromColumn: string;
  toColumn: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
}

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

interface RelationshipLineProps {
  relationship: Relationship;
  tables: Table[];
}

export function RelationshipLine({ relationship, tables }: RelationshipLineProps) {
  const fromTable = tables.find(t => t.name === relationship.fromTable);
  const toTable = tables.find(t => t.name === relationship.toTable);

  if (!fromTable || !toTable) return null;

  const fromX = fromTable.x + 192; // table width
  const fromY = fromTable.y + 50;  // approximate center
  const toX = toTable.x;
  const toY = toTable.y + 50;

  const getRelationshipSymbol = () => {
    switch (relationship.type) {
      case 'one-to-one':
        return '1:1';
      case 'one-to-many':
        return '1:N';
      case 'many-to-many':
        return 'N:M';
      default:
        return '';
    }
  };

  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;

  return (
    <g>
      <line
        x1={fromX}
        y1={fromY}
        x2={toX}
        y2={toY}
        stroke="#3B82F6"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
      <rect
        x={midX - 15}
        y={midY - 8}
        width="30"
        height="16"
        fill="white"
        stroke="#3B82F6"
        strokeWidth="1"
        rx="2"
      />
      <text
        x={midX}
        y={midY + 3}
        textAnchor="middle"
        className="text-xs font-medium fill-blue-600"
      >
        {getRelationshipSymbol()}
      </text>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="#3B82F6"
          />
        </marker>
      </defs>
    </g>
  );
}