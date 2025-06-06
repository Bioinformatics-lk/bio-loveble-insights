import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Position,
  BackgroundVariant,
  Handle,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom Node Component for Course Topics
const CourseNode = ({ data }: { data: any }) => {
  return (
    <div>
      <div className="bg-[#27318d] px-12 py-8 rounded-2xl border-2 border-white text-center min-w-[600px] md:min-w-[900px] max-w-[900px] md:max-w-[1200px]">
        {/* Content */}
        <div>
          <h3 className="text-white font-semibold text-3xl md:text-4xl whitespace-normal leading-tight">
            {data.label}
          </h3>
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-white" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-white" />
    </div>
  );
};

const nodeTypes = {
  course: CourseNode,
};

const courses = [
  {
    id: '1',
    title: 'Introduction to Bioinformatics',
  },
  {
    id: '2',
    title: 'Network Pharmacology',
  },
  {
    id: '3',
    title: 'Molecular Docking',
  },
  {
    id: '4',
    title: 'Molecular Dynamics',
  },
  {
    id: '5',
    title: 'Introduction to Cheminformatics',
  },
  {
    id: '6',
    title: 'AI and ML in Drug Discovery',
  },
  {
    id: '7',
    title: 'Research Project',
  },
];

export const CoursePipeline = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Calculate positions for nodes
  const calculateNodePositions = () => {
    const isMobile = windowSize.width < 768;
    const centerX = windowSize.width / 2;
    const startY = 50;
    const verticalSpacing = isMobile ? 200 : 250;

    return courses.map((course, index) => ({
      id: course.id,
      type: 'course',
      position: { 
        x: centerX - (isMobile ? 300 : 450),
        y: startY + (index * verticalSpacing)
      },
      data: { label: course.title, id: course.id },
    }));
  };

  // Calculate edges (connections)
  const calculateEdges = () => {
    return courses.slice(0, -1).map((course, index) => ({
      id: `e${course.id}-${courses[index + 1].id}`,
      source: course.id,
      target: courses[index + 1].id,
      type: 'straight',
      animated: true,
      style: { 
        stroke: 'rgba(255, 255, 255, 0.8)',
        strokeWidth: 2,
        strokeDasharray: '5,5',
      },
    }));
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(calculateNodePositions());
  const [edges, setEdges, onEdgesChange] = useEdgesState(calculateEdges());

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setNodes(calculateNodePositions());
    setEdges(calculateEdges());
  }, [windowSize]);

  return (
    <div className="w-full h-[1200px] bg-[#201e60] rounded-xl shadow-lg p-8 border-2 border-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ 
          padding: 0.2,
          maxZoom: 0.9
        }}
        minZoom={0.4}
        maxZoom={0.9}
        defaultViewport={{ x: 0, y: 0, zoom: 0.9 }}
        attributionPosition="bottom-right"
        className="bg-transparent"
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} color="rgba(255,255,255,0.2)" />
        <Controls className="bg-white/20" />
      </ReactFlow>
    </div>
  );
}; 