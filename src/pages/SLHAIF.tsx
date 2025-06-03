import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls,
  MiniMap,
  Edge,
  Node,
  MarkerType,
  Position,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, BookOpen, Network, Atom, FlaskConical, FileText, Beaker, X } from 'lucide-react';

// Custom Node Components
const CentralNode = ({ data }: { data: any }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5, type: "spring" }}
    className="relative p-6 rounded-xl bg-gradient-to-r from-[#170056] to-[#410056] text-white shadow-lg min-w-[200px] border border-purple-400/30"
    style={{
      boxShadow: '0 0 30px rgba(65, 0, 86, 0.3)',
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl animate-pulse" />
    <div className="flex items-center justify-center gap-3">
      <Brain className="w-8 h-8" />
      <span className="font-bold text-xl">{data.label}</span>
    </div>
  </motion.div>
);

const AgentNode = ({ data }: { data: any }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, type: "spring", delay: data.delay }}
    className="p-4 rounded-xl bg-gradient-to-r from-[#363B6B] to-[#54366B] text-white shadow-lg min-w-[200px] border border-purple-400/30 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105"
    onClick={() => data.onClick && data.onClick()}
  >
    <div className="flex items-center gap-3">
      {data.icon}
      <span className="font-semibold text-lg">{data.label}</span>
    </div>
  </motion.div>
);

const SLHAIF = () => {
  const navigate = useNavigate();
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  // Node definitions with improved positioning
  const initialNodes: Node[] = [
    {
      id: 'slhaif',
      position: { x: 400, y: 250 },
      data: { label: 'SLHAIF' },
      type: 'central'
    },
    {
      id: 'literature',
      position: { x: 100, y: 100 },
      data: { 
        label: 'Literature Search Agent',
        icon: <BookOpen className="w-6 h-6" />,
        delay: 0.2,
        onClick: () => setSelectedAgent('literature')
      },
      type: 'agent'
    },
    {
      id: 'network',
      position: { x: 700, y: 100 },
      data: { 
        label: 'Network Pharmacology Agent',
        icon: <Network className="w-6 h-6" />,
        delay: 0.3,
        onClick: () => setSelectedAgent('network')
      },
      type: 'agent'
    },
    {
      id: 'docking',
      position: { x: 100, y: 400 },
      data: { 
        label: 'Molecular Docking Agent',
        icon: <Atom className="w-6 h-6" />,
        delay: 0.4,
        onClick: () => setSelectedAgent('docking')
      },
      type: 'agent'
    },
    {
      id: 'dynamics',
      position: { x: 700, y: 400 },
      data: { 
        label: 'Molecular Dynamics Agent',
        icon: <FlaskConical className="w-6 h-6" />,
        delay: 0.5,
        onClick: () => setSelectedAgent('dynamics')
      },
      type: 'agent'
    },
    {
      id: 'manuscript',
      position: { x: 250, y: 500 },
      data: { 
        label: 'Manuscript Writing Agent',
        icon: <FileText className="w-6 h-6" />,
        delay: 0.6,
        onClick: () => setSelectedAgent('manuscript')
      },
      type: 'agent'
    },
    {
      id: 'formulation',
      position: { x: 550, y: 500 },
      data: { 
        label: 'Formulation Development Agent',
        icon: <Beaker className="w-6 h-6" />,
        delay: 0.7,
        onClick: () => setSelectedAgent('formulation')
      },
      type: 'agent'
    }
  ];

  const edges: Edge[] = [
    { 
      id: 'e1-2', 
      source: 'slhaif', 
      target: 'literature', 
      type: 'smoothstep', 
      animated: true,
      style: { stroke: '#9333ea', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#9333ea' }
    },
    { 
      id: 'e1-3', 
      source: 'slhaif', 
      target: 'network', 
      type: 'smoothstep', 
      animated: true,
      style: { stroke: '#9333ea', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#9333ea' }
    },
    { 
      id: 'e1-4', 
      source: 'slhaif', 
      target: 'docking', 
      type: 'smoothstep', 
      animated: true,
      style: { stroke: '#9333ea', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#9333ea' }
    },
    { 
      id: 'e1-5', 
      source: 'slhaif', 
      target: 'dynamics', 
      type: 'smoothstep', 
      animated: true,
      style: { stroke: '#9333ea', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#9333ea' }
    },
    { 
      id: 'e1-6', 
      source: 'slhaif', 
      target: 'manuscript', 
      type: 'smoothstep', 
      animated: true,
      style: { stroke: '#9333ea', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#9333ea' }
    },
    { 
      id: 'e1-7', 
      source: 'slhaif', 
      target: 'formulation', 
      type: 'smoothstep', 
      animated: true,
      style: { stroke: '#9333ea', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#9333ea' }
    }
  ];

  const nodeTypes = {
    central: CentralNode,
    agent: AgentNode
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000A33] to-[#363B6B]">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center gap-8 relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg bg-[#54366B] text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Our Services
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-[#170056] to-[#410056] text-white font-bold shadow-lg translate-y-2 z-10 border border-purple-400/30 relative"
            style={{
              boxShadow: '0 0 20px rgba(65, 0, 86, 0.3)'
            }}
          >
            SLHAIF
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg bg-[#54366B] text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Courses
          </motion.button>
        </div>
      </div>

      {/* Flow Diagram */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-[#170056]/20 backdrop-blur-sm rounded-xl border border-purple-400/20 shadow-xl h-[600px] relative overflow-hidden">
          <ReactFlow
            nodes={initialNodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.5}
            maxZoom={1.5}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          >
            <Background color="#54366B" gap={16} />
            <Controls className="bg-[#170056]/50 border-purple-400/20" />
            <MiniMap 
              nodeColor="#54366B"
              maskColor="#000A33"
              className="bg-[#170056]/50 border-purple-400/20"
            />
          </ReactFlow>
        </div>
      </div>

      {/* AI Chat Button */}
      <div className="container mx-auto px-4 py-8 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/slhaif-chat')}
          className="px-8 py-4 rounded-lg bg-gradient-to-r from-[#363B6B] to-[#54366B] text-white font-bold shadow-lg group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          <span className="relative flex items-center justify-center gap-2 text-lg">
            💡 Chat with our AI system
          </span>
        </motion.button>
      </div>

      {/* Agent Info Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedAgent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-[#170056] to-[#363B6B] rounded-xl p-6 max-w-md mx-4 border border-purple-400/30 shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedAgent(null)}
                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
              
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                {initialNodes.find(node => node.id === selectedAgent)?.data.icon}
                {initialNodes.find(node => node.id === selectedAgent)?.data.label}
              </h3>
              
              <p className="text-white/80 leading-relaxed">
                {getAgentDescription(selectedAgent)}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const getAgentDescription = (agentId: string): string => {
  const descriptions: Record<string, string> = {
    literature: "The Literature Search Agent systematically analyzes scientific publications, patents, and databases to gather comprehensive information about medicinal plants, their compounds, and therapeutic applications. It uses advanced NLP to extract relevant data from research papers and traditional knowledge sources.",
    network: "The Network Pharmacology Agent maps complex interactions between compounds and protein targets, revealing potential therapeutic pathways and drug-target relationships. It employs graph theory and machine learning to predict compound-protein interactions and biological pathways.",
    docking: "The Molecular Docking Agent simulates and evaluates the binding interactions between compounds and protein targets, predicting their potential effectiveness. It uses advanced algorithms to calculate binding energies and identify optimal molecular conformations.",
    dynamics: "The Molecular Dynamics Agent performs detailed simulations of molecular movements and interactions over time, providing insights into compound behavior. It analyzes atomic-level interactions and conformational changes in biological systems.",
    manuscript: "The Manuscript Writing Agent assists in organizing research findings and generating well-structured scientific documents. It helps compile data, format references, and suggest improvements for clarity and scientific accuracy.",
    formulation: "The Formulation Development Agent provides guidance on optimal drug delivery systems and formulation strategies for identified compounds. It considers physicochemical properties, bioavailability, and stability factors to suggest suitable formulation approaches."
  };

  return descriptions[agentId] || "Description not available.";
};

export default SLHAIF; 