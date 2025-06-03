import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, MessageCircle } from "lucide-react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Custom Node Component for the Brain
const BrainNode = ({ data }: { data: any }) => (
  <div className="relative w-40 h-40">
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#54366B] to-[#363B6B] blur-xl transform-gpu" />
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#54366B]/50 to-[#363B6B]/50 animate-pulse transform-gpu" />
    <div className="relative z-10 w-full h-full flex items-center justify-center">
      <Brain className="w-24 h-24 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] filter brightness-150" />
    </div>
  </div>
);

// Custom Node Component for Topics
const TopicNode = ({ data }: { data: any }) => (
  <div className="bg-white/10 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-center min-w-[120px] max-w-[180px]">
    <p className="text-white font-medium text-xs md:text-base whitespace-normal">
      {data.label}
    </p>
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
    const radius = isMobile ? 200 : 300;

    const nodes: Node[] = [
      {
        id: 'brain',
        type: 'brain',
        position: { x: centerX - 80, y: centerY - 80 },
        data: { label: 'Brain' },
      },
    ];

    // Add topic nodes in a semi-circle
    topics.forEach((topic, index) => {
      const angle = (Math.PI / (topics.length - 1)) * index;
      const x = centerX + radius * Math.cos(angle) - 100;
      const y = centerY + radius * Math.sin(angle) - 50;

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
    return topics.map((topic) => ({
      id: `brain-${topic.id}`,
      source: 'brain',
      target: topic.id,
      type: 'smoothstep',
      animated: true,
      style: { stroke: 'rgba(255, 255, 255, 0.3)' },
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
    <div className="min-h-screen bg-gradient-to-br from-[#170056] via-[#410056] to-[#54366B] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#54366B]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#170056]/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="absolute top-4 left-4 text-white hover:bg-white/10 z-50"
        >
          ← Back
        </Button>

        {/* SLHAIF Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12 mt-8">
          SLHAIF
          <span className="block text-lg md:text-xl text-white/80 mt-2">
            Sri Lanka's First Herbal Artificial Intelligence Factory
          </span>
        </h1>

        {/* React Flow Container */}
        <div className="h-[600px] md:h-[800px] w-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-right"
            className="bg-transparent"
          >
            <Background variant="dots" gap={12} size={1} color="rgba(255,255,255,0.1)" />
            <Controls className="bg-white/10 backdrop-blur-sm" />
          </ReactFlow>
        </div>

        {/* Chat Button */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#363B6B] to-[#000A33] hover:from-[#000A33] hover:to-[#363B6B] text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all transform-gpu hover:scale-105"
          >
            <MessageCircle className="w-6 h-6 mr-2" />
            <span className="hidden md:inline">Chat with our AI system</span>
            <span className="md:hidden">Chat</span>
          </Button>
        </div>
      </div>
    </div>
  );
}; 