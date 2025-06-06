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
      <div className="bg-[#4d2884]/90 backdrop-blur-md px-6 py-4 rounded-xl border-2 border-white/30 text-center min-w-[200px] md:min-w-[250px] max-w-[250px] md:max-w-[300px] shadow-lg shadow-[#2e0669]/20">
        {/* Content */}
        <div>
          <h3 className="text-white font-semibold text-sm md:text-base whitespace-normal leading-tight">
            {data.label}
          </h3>
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-white/50" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-white/50" />
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
    const startY = 20;
    const verticalSpacing = isMobile ? 80 : 100;

    return courses.map((course, index) => ({
      id: course.id,
      type: 'course',
      position: { 
        x: centerX - (isMobile ? 100 : 125),
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
        strokeWidth: 1.5,
        strokeDasharray: '4,4',
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
    <div className="w-full h-[600px] bg-[#2e0669] rounded-xl shadow-lg p-4 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2e0669] via-[#2e0669]/95 to-[#2e0669]/90 backdrop-blur-sm" />
      
      {/* White border container */}
      <div className="absolute inset-0 border-2 border-white/20 rounded-xl pointer-events-none" />
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ 
          padding: 0.1,
          maxZoom: 0.9
        }}
        minZoom={0.4}
        maxZoom={0.9}
        defaultViewport={{ x: 0, y: 0, zoom: 0.9 }}
        attributionPosition="bottom-right"
        className="bg-transparent"
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={8} 
          size={0.5} 
          color="rgba(255,255,255,0.15)" 
        />
        <Controls className="bg-white/10 backdrop-blur-sm" />
      </ReactFlow>
    </div>
  );
}; 