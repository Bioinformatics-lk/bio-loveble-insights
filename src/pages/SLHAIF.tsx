import React, { useState } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Edge, 
  Node,
  MarkerType,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, BookOpen, Network, Atom, FlaskConical, FileText, Beaker } from 'lucide-react';

// Custom Node Components
const CentralNode = ({ data }: { data: any }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5, type: "spring" }}
    className="p-4 rounded-lg bg-gradient-to-r from-[#170056] to-[#410056] text-white shadow-lg min-w-[200px] border border-purple-400/30"
  >
    <div className="flex items-center justify-center gap-2">
      <Brain className="w-6 h-6" />
      <span className="font-bold text-lg">{data.label}</span>
    </div>
  </motion.div>
);

const AgentNode = ({ data }: { data: any }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5, type: "spring", delay: data.delay }}
    className="p-3 rounded-lg bg-gradient-to-r from-[#363B6B] to-[#54366B] text-white shadow-md min-w-[180px] border border-purple-400/30 cursor-pointer hover:shadow-xl transition-shadow"
    onClick={() => data.onClick && data.onClick()}
  >
    <div className="flex items-center gap-2">
      {data.icon}
      <span className="font-semibold">{data.label}</span>
    </div>
  </motion.div>
);

// Custom Edge with Animation
const AnimatedEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  markerEnd,
}: any) => {
  const [animated, setAnimated] = useState(true);

  const distance = Math.sqrt(
    Math.pow(targetX - sourceX, 2) + Math.pow(targetY - sourceY, 2)
  );

  return (
    <g>
      <path
        id={id}
        className="react-flow__edge-path"
        d={`M${sourceX},${sourceY} L${targetX},${targetY}`}
        style={{
          ...style,
          strokeDasharray: distance,
          strokeDashoffset: animated ? distance : 0,
          animation: animated ? 'flow 1s ease-out infinite' : 'none',
        }}
        markerEnd={markerEnd}
      />
      <style>
        {`
          @keyframes flow {
            from {
              stroke-dashoffset: ${distance};
            }
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </g>
  );
};

const SLHAIF = () => {
  const navigate = useNavigate();
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  // Node definitions
  const initialNodes: Node[] = [
    {
      id: 'slhaif',
      position: { x: 400, y: 300 },
      data: { label: 'SLHAIF' },
      type: 'central'
    },
    {
      id: 'literature',
      position: { x: 200, y: 150 },
      data: { 
        label: 'Literature Search Agent',
        icon: <BookOpen className="w-5 h-5" />,
        delay: 0.2,
        onClick: () => setSelectedAgent('literature')
      },
      type: 'agent'
    },
    {
      id: 'network',
      position: { x: 600, y: 150 },
      data: { 
        label: 'Network Pharmacology Agent',
        icon: <Network className="w-5 h-5" />,
        delay: 0.3,
        onClick: () => setSelectedAgent('network')
      },
      type: 'agent'
    },
    {
      id: 'docking',
      position: { x: 200, y: 450 },
      data: { 
        label: 'Molecular Docking Agent',
        icon: <Atom className="w-5 h-5" />,
        delay: 0.4,
        onClick: () => setSelectedAgent('docking')
      },
      type: 'agent'
    },
    {
      id: 'dynamics',
      position: { x: 600, y: 450 },
      data: { 
        label: 'Molecular Dynamics Agent',
        icon: <FlaskConical className="w-5 h-5" />,
        delay: 0.5,
        onClick: () => setSelectedAgent('dynamics')
      },
      type: 'agent'
    },
    {
      id: 'manuscript',
      position: { x: 300, y: 600 },
      data: { 
        label: 'Manuscript Writing Agent',
        icon: <FileText className="w-5 h-5" />,
        delay: 0.6,
        onClick: () => setSelectedAgent('manuscript')
      },
      type: 'agent'
    },
    {
      id: 'formulation',
      position: { x: 500, y: 600 },
      data: { 
        label: 'Formulation Development Agent',
        icon: <Beaker className="w-5 h-5" />,
        delay: 0.7,
        onClick: () => setSelectedAgent('formulation')
      },
      type: 'agent'
    }
  ];

  const edges: Edge[] = [
    { id: 'e1-2', source: 'slhaif', target: 'literature', type: 'smoothstep', animated: true, markerEnd: { type: MarkerType.Arrow } },
    { id: 'e1-3', source: 'slhaif', target: 'network', type: 'smoothstep', animated: true, markerEnd: { type: MarkerType.Arrow } },
    { id: 'e1-4', source: 'slhaif', target: 'docking', type: 'smoothstep', animated: true, markerEnd: { type: MarkerType.Arrow } },
    { id: 'e1-5', source: 'slhaif', target: 'dynamics', type: 'smoothstep', animated: true, markerEnd: { type: MarkerType.Arrow } },
    { id: 'e1-6', source: 'slhaif', target: 'manuscript', type: 'smoothstep', animated: true, markerEnd: { type: MarkerType.Arrow } },
    { id: 'e1-7', source: 'slhaif', target: 'formulation', type: 'smoothstep', animated: true, markerEnd: { type: MarkerType.Arrow } }
  ];

  const nodeTypes = {
    central: CentralNode,
    agent: AgentNode
  };

  const edgeTypes = {
    animated: AnimatedEdge
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000A33] to-[#363B6B]">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center gap-8 relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 rounded-lg bg-[#54366B] text-white shadow-lg"
          >
            Our Services
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-[#170056] to-[#410056] text-white font-bold shadow-lg translate-y-2 z-10 border border-purple-400/30 relative"
            style={{
              boxShadow: '0 0 20px rgba(65, 0, 86, 0.3)'
            }}
          >
            SLHAIF
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 rounded-lg bg-[#54366B] text-white shadow-lg"
          >
            Courses
          </motion.button>
        </div>
      </div>

      {/* Flow Diagram */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-[#170056]/20 backdrop-blur-sm rounded-xl border border-purple-400/20 shadow-xl h-[600px] relative">
          <ReactFlow
            nodes={initialNodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
          >
            <Background />
            <Controls />
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
          <span className="relative flex items-center gap-2">
            💡 Chat with our AI system
          </span>
        </motion.button>
      </div>

      {/* Agent Info Modal */}
      {selectedAgent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedAgent(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white rounded-xl p-6 max-w-md mx-4"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {initialNodes.find(node => node.id === selectedAgent)?.data.label}
            </h3>
            <p className="text-gray-600">
              {getAgentDescription(selectedAgent)}
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

const getAgentDescription = (agentId: string): string => {
  const descriptions: Record<string, string> = {
    literature: "The Literature Search Agent systematically analyzes scientific publications, patents, and databases to gather comprehensive information about medicinal plants, their compounds, and therapeutic applications.",
    network: "The Network Pharmacology Agent maps complex interactions between compounds and protein targets, revealing potential therapeutic pathways and drug-target relationships.",
    docking: "The Molecular Docking Agent simulates and evaluates the binding interactions between compounds and protein targets, predicting their potential effectiveness.",
    dynamics: "The Molecular Dynamics Agent performs detailed simulations of molecular movements and interactions over time, providing insights into compound behavior.",
    manuscript: "The Manuscript Writing Agent assists in organizing research findings and generating well-structured scientific documents.",
    formulation: "The Formulation Development Agent provides guidance on optimal drug delivery systems and formulation strategies for identified compounds."
  };

  return descriptions[agentId] || "Description not available.";
};

export default SLHAIF; 