import React, { useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 250, y: 0 },
    data: { label: 'Introduction to Bioinformatics' },
    type: 'courseNode',
  },
  {
    id: '2',
    position: { x: 250, y: 100 },
    data: { label: 'Network Pharmacology' },
    type: 'courseNode',
  },
  {
    id: '3',
    position: { x: 250, y: 200 },
    data: { label: 'Molecular Docking' },
    type: 'courseNode',
  },
  {
    id: '4',
    position: { x: 250, y: 300 },
    data: { label: 'Molecular Dynamics' },
    type: 'courseNode',
  },
  {
    id: '5',
    position: { x: 250, y: 400 },
    data: { label: 'Introduction to Cheminformatics' },
    type: 'courseNode',
  },
  {
    id: '6',
    position: { x: 250, y: 500 },
    data: { label: 'AI and ML in Drug Discovery' },
    type: 'courseNode',
  },
  {
    id: '7',
    position: { x: 250, y: 600 },
    data: { label: 'Research Project' },
    type: 'courseNode',
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { strokeDasharray: '5,5' } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { strokeDasharray: '5,5' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { strokeDasharray: '5,5' } },
  { id: 'e4-5', source: '4', target: '5', animated: true, style: { strokeDasharray: '5,5' } },
  { id: 'e5-6', source: '5', target: '6', animated: true, style: { strokeDasharray: '5,5' } },
  { id: 'e6-7', source: '6', target: '7', animated: true, style: { strokeDasharray: '5,5' } },
];

const CourseNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-[#000A33] hover:border-sky-500 transition-colors duration-300">
      <div className="text-[#000A33] hover:text-sky-500 transition-colors duration-300 font-medium">
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
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}; 