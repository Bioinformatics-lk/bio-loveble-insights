import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, MessageCircle } from "lucide-react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  NodeTypes,
  BackgroundVariant,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

interface TopicNodeData {
  label: string;
}

interface Topic {
  id: string;
  title: string;
  x: number;
  y: number;
  label: string;
}

// Custom Node Component for the Brain
const BrainNode = () => (
  <div className="relative w-32 h-32 md:w-48 md:h-48">
    {/* Multi-layered glowing effect */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1a0b2e] to-[#2d1b69] blur-xl transform-gpu animate-pulse" />
    <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#1a0b2e]/50 to-[#2d1b69]/50 blur-lg transform-gpu animate-pulse" style={{ animationDelay: '0.5s' }} />
    <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#1a0b2e]/30 to-[#2d1b69]/30 blur-md transform-gpu animate-pulse" style={{ animationDelay: '1s' }} />
    
    {/* Brain icon with floating animation */}
    <div className="relative z-10 w-full h-full flex items-center justify-center animate-float">
      <div style={{ transform: 'rotate(180deg) translateY(-10px)' }}>
        <Brain className="w-20 h-20 md:w-32 md:h-32 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] filter brightness-150" />
      </div>
    </div>
    
    {/* Enhanced connection handles */}
    <Handle type="source" position={Position.Top} className="w-5 h-2 md:w-3 md:h-3 bg-white/50 shadow-glow" />
    <Handle type="source" position={Position.Right} className="w-2 h-2 md:w-3 md:h-3 bg-white/50 shadow-glow" />
    <Handle type="source" position={Position.Bottom} className="w-2 h-2 md:w-3 md:h-3 bg-white/50 shadow-glow" />
    <Handle type="source" position={Position.Left} className="w-2 h-2 md:w-3 md:h-3 bg-white/50 shadow-glow" />
  </div>
);

// Custom Node Component for Topics
const TopicNode = ({ data }: { data: TopicNodeData }) => (
  <div className="group">
    <div className="relative bg-[#1a0b2e]/20 backdrop-blur-md px-4 md:px-6 py-3 md:py-4 rounded-2xl border border-[#2d1b69] hover:bg-[#2d1b69]/30 transition-all duration-300 text-center min-w-[140px] md:min-w-[180px] max-w-[160px] md:max-w-[220px] transform hover:scale-105">
      {/* Enhanced glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#1a0b2e]/20 via-[#2d1b69]/20 to-[#1a0b2e]/20 blur-sm animate-gradient-x" />
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500/20 via-green-400/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      
      {/* Content */}
      <div className="relative z-10">
        <p className="text-white font-medium text-sm md:text-base whitespace-normal leading-tight group-hover:text-blue-100 transition-colors">
          {data.label}
        </p>
      </div>
    </div>
    <Handle type="target" position={Position.Top} className="w-2 h-2 md:w-3 md:h-3 bg-white/50 shadow-glow" />
  </div>
);

// Add chat node type
const ChatNode = () => (
  <div className="w-2 h-2 opacity-0">
    <Handle type="target" position={Position.Top} className="w-2 h-2 bg-white/50" />
  </div>
);

// Custom Node Component for SLBAIS
const SLBAISNode = () => (
  <div className="relative bg-[#1a0b2e]/20 backdrop-blur-md px-6 py-4 rounded-2xl border border-[#2d1b69] text-center min-w-[200px] md:min-w-[300px] max-w-[300px] md:max-w-[400px]">
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#1a0b2e]/20 via-[#2d1b69]/20 to-[#1a0b2e]/20 blur-sm animate-gradient-x" />
    <div className="relative z-10">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-wider">S L B A I L</h2>
      <p className="text-white/80 text-sm md:text-base">
        Sri Lanka's First Bioinformatics and Artificial Intelligence Laboratory
      </p>
    </div>
    <Handle type="target" position={Position.Top} className="w-3 h-3 md:w-4 md:h-4 bg-white/50 shadow-glow" />
  </div>
);

const nodeTypes: NodeTypes = {
  brain: BrainNode,
  topic: TopicNode,
  chat: ChatNode,
  slbais: SLBAISNode,
};

const topics: Topic[] = [
  {
    id: 'docking',
    title: 'Molecular Docking',
    x: -3,
    y: -3.2,
    label: 'Molecular Docking'
  },
  {
    id: 'dynamics',
    title: 'Molecular Dynamics',
    x: 3,
    y: -2.8,
    label: 'Molecular Dynamics'
  },
  {
    id: 'network',
    title: 'Network Pharmacology',
    x: -4,
    y: -2.5,
    label: 'Network Pharmacology'
  },
  {
    id: 'manuscript',
    title: 'Manuscript Writing',
    x: 4,
    y: -2.2,
    label: 'Manuscript Writing'
  },
  {
    id: 'literature',
    title: 'Literature Review',
    x: -3,
    y: -1.8,
    label: 'Literature Review'
  },
  {
    id: 'formulation',
    title: 'Formulation',
    x: 3,
    y: -1.5,
    label: 'Formulation'
  }
];

export const SLBAISPage = () => {
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Calculate positions for nodes
  const calculateNodePositions = () => {
    const isMobile = dimensions.width < 768;
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height * (isMobile ? 0.5 : 0.45);
    const verticalSpacing = isMobile ? 100 : 200;
    const horizontalSpacing = isMobile ? 100 : 240;

    return topics.map((topic) => ({
      id: topic.id,
      type: 'topic',
      position: {
        x: centerX + topic.x * horizontalSpacing,
        y: centerY + topic.y * verticalSpacing,
      },
      data: { label: topic.label },
    }));
  };

  // Calculate edges (connections)
  const calculateEdges = () => {
    const isMobile = dimensions.width < 768;
    return topics.map((topic) => ({
      id: `brain-${topic.id}`,
      source: 'brain',
      target: topic.id,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#fff', strokeWidth: isMobile ? 1 : 2 },
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
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
  }, [dimensions]);

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

        {/* React Flow Container */}
        <div className="h-[calc(100vh-1rem)]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
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
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} color="rgba(255,255,255,0.05)" />
            <Controls className="bg-[#1a0b2e]/20 backdrop-blur-sm" />
          </ReactFlow>
        </div>

        {/* Enhanced Chat Button with Glow */}
        <div className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="relative chat-button-glow">
            <Button
              size="lg"
              className="relative bg-gradient-to-r from-[#1a0b2e] to-[#2d1b69] hover:from-[#2d1b69] hover:to-[#1a0b2e] text-white text-sm md:text-lg px-4 md:px-8 py-3 md:py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 transform-gpu hover:scale-105 border border-white/20 backdrop-blur-sm group"
            >
              <MessageCircle className="w-4 h-4 md:w-6 md:h-6 mr-2 group-hover:text-blue-300 transition-colors" />
              <span className="group-hover:text-blue-100 transition-colors">Chat with our AI system</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};