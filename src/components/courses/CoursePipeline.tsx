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
  const getGlowColor = (id: string) => {
    switch (id) {
      case '1': return 'from-purple-500 via-purple-400 to-purple-500'; // Introduction to Bioinformatics
      case '2': return 'from-blue-500 via-blue-400 to-blue-500'; // Network Pharmacology
      case '3': return 'from-sky-500 via-sky-400 to-sky-500'; // Molecular Docking
      case '4': return 'from-green-500 via-green-400 to-green-500'; // Molecular Dynamics
      case '5': return 'from-emerald-700 via-emerald-600 to-emerald-700'; // Introduction to Cheminformatics
      case '6': return 'from-fuchsia-500 via-fuchsia-400 to-fuchsia-500'; // AI and ML in Drug Discovery
      case '7': return 'from-orange-500 via-red-500 to-orange-500'; // Research Project
      default: return 'from-[#000A33] via-[#000A33] to-[#000A33]';
    }
  };

  return (
    <div className="group">
      <div className="relative bg-white px-6 py-4 rounded-2xl border-2 border-[#000A33] transition-all duration-300 text-center min-w-[200px] md:min-w-[300px] max-w-[300px] md:max-w-[400px]">
        {/* Outer glow effect */}
        <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${getGlowColor(data.id)} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md`} />
        
        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-[#000A33] font-semibold text-lg md:text-xl whitespace-normal leading-tight group-hover:text-sky-500 transition-colors">
            {data.label}
          </h3>
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-[#000A33]/50" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-[#000A33]/50" />
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
    const verticalSpacing = isMobile ? 120 : 150;

    return courses.map((course, index) => ({
      id: course.id,
      type: 'course',
      position: { 
        x: centerX - (isMobile ? 100 : 150),
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
        stroke: '#000A33',
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
    <div className="w-full h-[800px] bg-white rounded-xl shadow-lg p-8">
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
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} color="rgba(0,10,51,0.1)" />
        <Controls className="bg-white/20 backdrop-blur-sm" />
      </ReactFlow>
    </div>
  );
}; 