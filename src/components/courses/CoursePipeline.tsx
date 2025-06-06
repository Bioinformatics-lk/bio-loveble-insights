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
  const getBackgroundColor = (id: string) => {
    switch (id) {
      case '1': return 'bg-purple-500'; // Introduction to Bioinformatics
      case '2': return 'bg-blue-500'; // Network Pharmacology
      case '3': return 'bg-sky-500'; // Molecular Docking
      case '4': return 'bg-green-500'; // Molecular Dynamics
      case '5': return 'bg-emerald-700'; // Introduction to Cheminformatics
      case '6': return 'bg-fuchsia-500'; // AI and ML in Drug Discovery
      case '7': return 'bg-gradient-to-r from-orange-500 to-red-500'; // Research Project
      default: return 'bg-[#000A33]';
    }
  };

  return (
    <div className="group">
      <div className={`relative ${getBackgroundColor(data.id)} px-6 py-4 rounded-2xl text-center min-w-[200px] md:min-w-[300px] max-w-[300px] md:max-w-[400px]`}>
        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-black font-semibold text-lg md:text-xl whitespace-normal leading-tight">
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
    <div className="w-full h-[800px] bg-gray-50 rounded-xl shadow-lg p-8">
      {/* Section Title */}
      <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
          Our Courses
        </h2>
        <p className="text-lg md:text-xl text-black max-w-3xl">
          Explore our comprehensive curriculum designed to equip you with the latest skills in bioinformatics and drug discovery.
        </p>
      </div>

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
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} color="rgba(0,0,0,0.1)" />
        <Controls className="bg-white/20" />
      </ReactFlow>
    </div>
  );
}; 