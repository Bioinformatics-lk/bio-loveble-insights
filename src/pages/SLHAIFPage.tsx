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
const TopicNode = ({ data }: { data: any }) => (
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
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">SLBAIS</h2>
      <p className="text-white/80 text-sm md:text-base">
        Sri Lanka's First Botanical Artificial Intelligence System
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
    const centerY = windowSize.height * (isMobile ? 0.5 : 0.45);
    const verticalSpacing = isMobile ? 80 : 160;
    const horizontalSpacing = isMobile ? 100 : 240;

    // Calculate brain dimensions
    const brainWidth = isMobile ? 32 : 96;
    const brainHeight = isMobile ? 32 : 96;

    // Brain node at the center
    const nodes: Node[] = [
      {
        id: 'brain',
        type: 'brain',
        position: { 
          x: centerX - brainWidth,
          y: centerY
        },
        data: { label: 'Brain' },
      },
      {
        id: 'slbais',
        type: 'slbais',
        position: {
          x: centerX - (isMobile ? 100 : 200),
          y: centerY + brainHeight + (isMobile ? 40 : 80)
        },
        data: { label: 'SLBAIS' },
      }
    ];

    // Calculate positions for different levels
    topics.forEach((topic) => {
      let x = centerX;
      let y = centerY;
      let offset = 0;
      
      // Level 1 - Top level (Molecular Docking and Molecular Dynamics)
      if (topic.id === 'docking') {
        offset = -horizontalSpacing * (isMobile ? 1.5 : 3);
        x = centerX + offset;
        y = centerY - verticalSpacing * (isMobile ? 2.8 : 3.2);
      }
      else if (topic.id === 'dynamics') {
        offset = horizontalSpacing * (isMobile ? 1.5 : 3);
        x = centerX + offset;
        y = centerY - verticalSpacing * (isMobile ? 2.4 : 2.8);
      }
      // Level 2 - Second level (Network Pharmacology and Manuscript Writing)
      else if (topic.id === 'network') {
        offset = -horizontalSpacing * (isMobile ? 2 : 4);
        x = centerX + offset;
        y = centerY - verticalSpacing * (isMobile ? 2 : 2.5);
      }
      else if (topic.id === 'manuscript') {
        offset = horizontalSpacing * (isMobile ? 2 : 4);
        x = centerX + offset;
        y = centerY - verticalSpacing * (isMobile ? 1.8 : 2.2);
      }
      // Middle Level - Fixed Position (Literature and Formulation)
      else if (topic.id === 'literature') {
        offset = -horizontalSpacing * (isMobile ? 1.5 : 3);
        x = centerX + offset;
        y = centerY - verticalSpacing * (isMobile ? 1.4 : 1.8);
      }
      else if (topic.id === 'formulation') {
        offset = horizontalSpacing * (isMobile ? 1.5 : 3);
        x = centerX + offset;
        y = centerY - verticalSpacing * (isMobile ? 1.2 : 1.5);
      }

      nodes.push({
        id: topic.id,
        type: 'topic',
        position: { 
          x: x - (isMobile ? 35 : 100),
          y 
        },
        data: { label: topic.title },
      });
    });

    return nodes;
  };

  // Calculate edges (connections)
  const calculateEdges = () => {
    const isMobile = windowSize.width < 768;
    const edges = topics.map((topic) => ({
      id: `brain-${topic.id}`,
      source: 'brain',
      target: topic.id,
      type: 'smoothstep',
      animated: true,
      style: { 
        stroke: 'rgba(255, 255, 255, 0.25)',
        strokeWidth: isMobile ? 1 : 2,
        strokeDasharray: isMobile ? '4,4' : '6,6',
      },
    }));

    // Vertical connection from Brain to SLBAIS
    edges.push({
      id: 'brain-slbais',
      source: 'brain',
      target: 'slbais',
      type: 'straight',
      animated: true,
      style: { 
        stroke: 'rgba(255, 255, 255, 0.6)',
        strokeWidth: isMobile ? 2.5 : 3.5,
        strokeDasharray: '10,10',
      },
    });

    return edges;
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

  // Remove the center-top node since we don't need it anymore
  useEffect(() => {
    const isMobile = windowSize.width < 768;
    const centerX = windowSize.width / 2;
    const topY = windowSize.height * (isMobile ? 0.85 : 0.8);

    // Add chat button node (invisible, just for connection)
    setNodes(prev => [
      ...prev,
      {
        id: 'chat-button',
        type: 'chat',
        position: { 
          x: centerX - (isMobile ? 35 : 100),
          y: topY + (isMobile ? 100 : 250)
        },
        data: { label: 'Chat' },
      }
    ]);
  }, [windowSize, setNodes]);

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

        {/* React Flow Container */}
        <div className="h-[calc(100vh-1rem)]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ 
              padding: 0.2,
              maxZoom: 0.9
            }}
            minZoom={0.5}
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