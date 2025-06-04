import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, MessageCircle } from "lucide-react";
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  NodeTypes,
  BackgroundVariant,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Custom Node Component for the Brain
const BrainNode = ({ data }: { data: any }) => (
  <div className="relative w-32 h-32 md:w-48 md:h-48">
    {/* Glowing circle effect */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1a0b2e] to-[#2d1b69] blur-lg transform-gpu" />
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1a0b2e]/50 to-[#2d1b69]/50 transform-gpu" />
    {/* Pulsing ring */}
    <div className="absolute -inset-2 md:-inset-4 rounded-full bg-gradient-to-r from-[#1a0b2e]/30 to-[#2d1b69]/30" />
    {/* Brain icon */}
    <div className="relative z-10 w-full h-full flex items-center justify-center">
      <div style={{ transform: 'rotate(180deg) translateY(-10px)' }}>
        <Brain className="w-20 h-20 md:w-32 md:h-32 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] filter brightness-125" />
      </div>
    </div>
    {/* Connection handles */}
    <Handle type="source" position={Position.Top} className="w-2 h-2 md:w-3 md:h-3 bg-white/50" />
    <Handle type="source" position={Position.Right} className="w-2 h-2 md:w-3 md:h-3 bg-white/50" />
    <Handle type="source" position={Position.Bottom} className="w-2 h-2 md:w-3 md:h-3 bg-white/50" />
    <Handle type="source" position={Position.Left} className="w-2 h-2 md:w-3 md:h-3 bg-white/50" />
  </div>
);

// Custom Node Component for Topics
const TopicNode = ({ data }: { data: any }) => (
  <div className="group">
    <div className="relative bg-[#1a0b2e]/20 backdrop-blur-md px-4 md:px-6 py-3 md:py-4 rounded-2xl border border-[#2d1b69] hover:bg-[#2d1b69]/30 transition-all duration-300 text-center min-w-[140px] md:min-w-[180px] max-w-[160px] md:max-w-[220px] transform hover:scale-105">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#1a0b2e]/20 to-[#2d1b69]/20 blur-sm" />
      {/* Content */}
      <div className="relative z-10">
        <p className="text-white font-medium text-sm md:text-base whitespace-normal leading-tight">
          {data.label}
        </p>
      </div>
    </div>
    <Handle type="target" position={Position.Top} className="w-2 h-2 md:w-3 md:h-3 bg-white/50" />
  </div>
);

const nodeTypes: NodeTypes = {
  brain: BrainNode,
  topic: TopicNode,
};

const topics = [
  { id: "literature", title: "Literature Search Agent" },
  { id: "network", title: "Network Pharmacology Agent" },
  { id: "docking", title: "Molecular Docking Agent" },
  { id: "dynamics", title: "Molecular Dynamics Agent" },
  { id: "manuscript", title: "Manuscript Writing Agent" },
  { id: "formulation", title: "Formulation Development Agent" },
];

export const SLHAIFPage = () => {
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Calculate positions for nodes
  const calculateNodePositions = () => {
    const isMobile = windowSize.width < 768;
    const centerX = windowSize.width / 2;
    const centerY = windowSize.height / 2;
    const radius = isMobile ? 180 : 400; // Increased radius for better horizontal spread

    const nodes: Node[] = [
      {
        id: 'brain',
        type: 'brain',
        position: { 
          x: centerX - (isMobile ? 64 : 96), 
          y: isMobile ? centerY - 120 : centerY - 200 // Moved brain higher up
        },
        data: { label: 'Brain' },
      },
    ];

    // Add topic nodes in a semi-circle
    topics.forEach((topic, index) => {
      const angle = (Math.PI / (topics.length - 1)) * index;
      const x = centerX + radius * Math.cos(angle) - (isMobile ? 70 : 100);
      const y = isMobile 
        ? centerY + radius * Math.sin(angle) - (isMobile ? 25 : 50)
        : centerY + radius * 0.2 + radius * Math.sin(angle) * 0.3;

      nodes.push({
        id: topic.id,
        type: 'topic',
        position: { x, y },
        data: { label: topic.title },
      });
    });

    return nodes;
  };

  // Calculate edges (connections)
  const calculateEdges = () => {
    const isMobile = windowSize.width < 768;
    return topics.map((topic) => ({
      id: `brain-${topic.id}`,
      source: 'brain',
      target: topic.id,
      type: 'smoothstep',
      animated: true,
      style: { 
        stroke: 'rgba(255, 255, 255, 0.4)',
        strokeWidth: isMobile ? 2 : 3,
        strokeDasharray: '8,8',
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

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0612] via-[#1a0b2e] to-[#2d1b69] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#1a0b2e]/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#2d1b69]/30 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-4 md:py-8">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="absolute top-2 md:top-4 left-2 md:left-4 text-white hover:bg-white/10 z-50 text-sm md:text-base"
        >
          ← Back
        </Button>

        {/* SLHAIF Title */}
        <h1 className="text-3xl md:text-6xl font-bold text-center text-white mb-8 md:mb-16 mt-12 md:mt-8">
          SLHAIF
          <span className="block text-base md:text-2xl text-white/80 mt-2 md:mt-4">
            Sri Lanka's First Herbal Artificial Intelligence Factory
          </span>
        </h1>

        {/* React Flow Container */}
        <div className="h-[600px] md:h-[900px] w-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.3 }}
            attributionPosition="bottom-right"
            className="bg-transparent"
            minZoom={0.3}
            maxZoom={1.2}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          >
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} color="rgba(255,255,255,0.05)" />
            <Controls className="bg-[#1a0b2e]/20 backdrop-blur-sm" />
          </ReactFlow>
        </div>

        {/* Enhanced Chat Button */}
        <div className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="relative">
            {/* Subtle glow effect for button */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a0b2e] to-[#2d1b69] blur-lg rounded-full" />
            {/* Button */}
            <Button
              size="lg"
              className="relative bg-gradient-to-r from-[#1a0b2e] to-[#2d1b69] hover:from-[#2d1b69] hover:to-[#1a0b2e] text-white text-sm md:text-lg px-4 md:px-8 py-3 md:py-6 rounded-full shadow-lg hover:shadow-xl transition-all transform-gpu hover:scale-105 border border-white/20 backdrop-blur-sm"
            >
              <MessageCircle className="w-4 h-4 md:w-6 md:h-6 mr-2" />
              <span>Chat with our AI system</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 