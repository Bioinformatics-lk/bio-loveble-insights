import React, { useState, useEffect } from 'react';
import { Position, BackgroundVariant, Handle, NodeProps } from 'reactflow';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Define node data type
interface CourseNodeData {
  label: string;
  id: string;
  onClick?: () => void;
}

// Custom node component
const CourseNode = ({ data }: NodeProps<CourseNodeData>) => {
  return (
    <div>
      <div 
        className="bg-[#4d2884]/90 backdrop-blur-md px-8 py-6 rounded-xl border-2 border-white/30 text-center min-w-[300px] md:min-w-[400px] max-w-[400px] md:max-w-[500px] shadow-lg shadow-[#2e0669]/20 cursor-pointer hover:bg-[#4d2884]/95 hover:border-white/50 transition-all duration-300 transform hover:scale-105"
        onClick={data.onClick}
      >
        <div>
          <h3 className="text-white font-semibold text-xl md:text-2xl whitespace-normal leading-tight">
            {data.label}
          </h3>
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-white/50" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-white/50" />
    </div>
  );
};

// Node types
const nodeTypes = {
  course: CourseNode,
};

// Initial node data
const initialNodes = [
  {
    id: '1',
    position: { x: 250, y: 50 },
    data: { label: 'Core Foundations', id: '1' },
    draggable: false,
  },
  {
    id: '2',
    position: { x: 250, y: 150 },
    data: { label: 'Bioinformatics', id: '2' },
    draggable: false,
  },
  {
    id: '3',
    position: { x: 250, y: 250 },
    data: { label: 'Cheminformatics', id: '3' },
    draggable: false,
  },
  {
    id: '4',
    position: { x: 250, y: 350 },
    data: { label: 'Computational Biology', id: '4' },
    draggable: false,
  },
  {
    id: '5',
    position: { x: 250, y: 450 },
    data: { label: 'AI in Life Sciences', id: '5' },
    draggable: false,
  }
];

// Initial edge data
const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#fff', strokeWidth: 2, strokeDasharray: '5,5' },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#fff', strokeWidth: 2, strokeDasharray: '5,5' },
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#fff', strokeWidth: 2, strokeDasharray: '5,5' },
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#fff', strokeWidth: 2, strokeDasharray: '5,5' },
  }
];

// Window size type
interface WindowSize {
  width: number;
  height: number;
}

const CoursePipeline: React.FC = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Calculate node positions
  const calculateNodePositions = () => {
    const isMobile = windowSize.width < 768;
    const centerX = windowSize.width / 2;
    const startY = 20;
    const verticalSpacing = isMobile ? 120 : 150;

    return initialNodes.map((node) => ({
      id: node.id,
      type: 'course',
      position: { 
        x: centerX - (isMobile ? 150 : 200),
        y: startY + (Number(node.id) * verticalSpacing)
      },
      data: { label: node.data.label, id: node.id },
      draggable: false,
      selectable: false,
    }));
  };

  // Calculate edges
  const calculateEdges = () => {
    return initialEdges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: edge.type,
      animated: edge.animated,
      style: edge.style,
    }));
  };

  const [nodes, setNodes] = useNodesState(calculateNodePositions());
  const [edges, setEdges] = useEdgesState(calculateEdges());

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
    <div className="w-full h-full bg-[#2e0669] rounded-xl shadow-lg relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2e0669] via-[#2e0669]/95 to-[#2e0669]/90 backdrop-blur-sm" />
      
      {/* White border container */}
      <div className="absolute inset-0 border-2 border-white/20 rounded-xl pointer-events-none" />
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={() => {}}
        onEdgesChange={() => {}}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2, maxZoom: 0.9 }}
        minZoom={0.5}
        maxZoom={0.9}
        defaultViewport={{ x: 0, y: 0, zoom: 0.9 }}
        attributionPosition="bottom-right"
        className="bg-transparent"
        panOnDrag={false}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        draggable={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        selectionOnDrag={false}
        preventScrolling={false}
        selectionKeyCode={null}
        multiSelectionKeyCode={null}
        selectNodesOnDrag={false}
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={12} 
          size={1} 
          color="rgba(255,255,255,0.15)" 
        />
      </ReactFlow>
    </div>
  );
};

export default CoursePipeline; 