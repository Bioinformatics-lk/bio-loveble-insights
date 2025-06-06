import React, { useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Position,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 400, y: 50 },
    data: { label: 'Introduction to Bioinformatics' },
    type: 'courseNode',
    draggable: false,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: '2',
    position: { x: 400, y: 150 },
    data: { label: 'Network Pharmacology' },
    type: 'courseNode',
    draggable: false,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: '3',
    position: { x: 400, y: 250 },
    data: { label: 'Molecular Docking' },
    type: 'courseNode',
    draggable: false,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: '4',
    position: { x: 400, y: 350 },
    data: { label: 'AI and ML in Drug Discovery' },
    type: 'courseNode',
    draggable: false,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: '5',
    position: { x: 400, y: 450 },
    data: { label: 'Introduction to Cheminformatics' },
    type: 'courseNode',
    draggable: false,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: '6',
    position: { x: 400, y: 550 },
    data: { label: 'Molecular Dynamics' },
    type: 'courseNode',
    draggable: false,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: '7',
    position: { x: 400, y: 650 },
    data: { label: 'Research Project' },
    type: 'courseNode',
    draggable: false,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
];

const initialEdges: Edge[] = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    animated: true,
    type: 'straight',
    style: { 
      strokeDasharray: '5,5',
      stroke: '#000000',
      strokeWidth: 3,
    },
    markerEnd: {
      type: MarkerType.Arrow,
      width: 20,
      height: 20,
      color: '#000000',
    }
  },
  { 
    id: 'e2-3', 
    source: '2', 
    target: '3', 
    animated: true,
    type: 'straight',
    style: { 
      strokeDasharray: '5,5',
      stroke: '#000000',
      strokeWidth: 3,
    },
    markerEnd: {
      type: MarkerType.Arrow,
      width: 20,
      height: 20,
      color: '#000000',
    }
  },
  { 
    id: 'e3-4', 
    source: '3', 
    target: '4', 
    animated: true,
    type: 'straight',
    style: { 
      strokeDasharray: '5,5',
      stroke: '#000000',
      strokeWidth: 3,
    },
    markerEnd: {
      type: MarkerType.Arrow,
      width: 20,
      height: 20,
      color: '#000000',
    }
  },
  { 
    id: 'e4-5', 
    source: '4', 
    target: '5', 
    animated: true,
    type: 'straight',
    style: { 
      strokeDasharray: '5,5',
      stroke: '#000000',
      strokeWidth: 3,
    },
    markerEnd: {
      type: MarkerType.Arrow,
      width: 20,
      height: 20,
      color: '#000000',
    }
  },
  { 
    id: 'e5-6', 
    source: '5', 
    target: '6', 
    animated: true,
    type: 'straight',
    style: { 
      strokeDasharray: '5,5',
      stroke: '#000000',
      strokeWidth: 3,
    },
    markerEnd: {
      type: MarkerType.Arrow,
      width: 20,
      height: 20,
      color: '#000000',
    }
  },
  { 
    id: 'e6-7', 
    source: '6', 
    target: '7', 
    animated: true,
    type: 'straight',
    style: { 
      strokeDasharray: '5,5',
      stroke: '#000000',
      strokeWidth: 3,
    },
    markerEnd: {
      type: MarkerType.Arrow,
      width: 20,
      height: 20,
      color: '#000000',
    }
  },
];

const CourseNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="px-6 py-3 shadow-md rounded-md bg-white border-2 border-[#000A33] hover:border-sky-500 transition-colors duration-300">
      <div className="text-[#000A33] hover:text-sky-500 transition-colors duration-300 font-medium text-center">
        {data.label}
      </div>
    </div>
  );
};

const nodeTypes = {
  courseNode: CourseNode,
};

export const CoursePipeline = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    console.log('Current edges:', edges);
  }, [edges]);

  return (
    <div className="w-full h-[800px] bg-white rounded-xl shadow-lg p-8">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
        minZoom={0.5}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        defaultEdgeOptions={{
          animated: true,
          type: 'straight',
          style: { stroke: '#000000', strokeWidth: 3 }
        }}
      >
        <Background color="#f0f0f0" gap={16} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}; 