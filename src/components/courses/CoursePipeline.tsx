import React, { useState, useEffect } from 'react';
import { Position, BackgroundVariant, Handle, NodeProps } from 'reactflow';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Define node data type
interface CourseNodeData {
  label: string;
  id: string;
  onClick?: () => void;
}

// Course details data
const courseDetails = {
  '1': {
    title: 'Core Foundations',
    description: 'Build a solid foundation in bioinformatics, including molecular biology, statistics, and programming basics. Prepare for advanced courses.',
    duration: '4 weeks',
    level: 'Beginner',
    topics: ['Molecular Biology Basics', 'Principles of Statistics', 'Python Programming', 'Database Fundamentals'],
    enrollmentLink: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform'
  },
  '2': {
    title: 'Bioinformatics',
    description: 'Deep dive into core bioinformatics concepts, including sequence analysis, genomics, and proteomics. Master essential skills for biological data analysis.',
    duration: '6 weeks',
    level: 'Intermediate',
    topics: ['Sequence Analysis', 'Genomics', 'Proteomics', 'Biological Databases'],
    enrollmentLink: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform'
  },
  '3': {
    title: 'Cheminformatics',
    description: 'Explore cheminformatics, learn about molecular descriptors, drug design, and chemical database analysis. Lay the foundation for drug discovery.',
    duration: '5 weeks',
    level: 'Intermediate',
    topics: ['Molecular Descriptors', 'Drug Design', 'Chemical Databases', 'QSAR Modeling'],
    enrollmentLink: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform'
  },
  '4': {
    title: 'Computational Biology',
    description: 'Combine computational methods and biological principles, learn systems biology, network analysis, and biological modeling techniques.',
    duration: '6 weeks',
    level: 'Advanced',
    topics: ['Systems Biology', 'Network Analysis', 'Biological Modeling', 'Machine Learning Basics'],
    enrollmentLink: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform'
  },
  '5': {
    title: 'AI in Life Sciences',
    description: 'Apply artificial intelligence in life sciences, learn deep learning, predictive modeling, and automated drug discovery.',
    duration: '8 weeks',
    level: 'Advanced',
    topics: ['Deep Learning', 'Predictive Modeling', 'Automated Drug Discovery', 'AI Ethics'],
    enrollmentLink: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform'
  }
};

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
    style: { stroke: '#4d2884', strokeWidth: 2, strokeDasharray: '5,5' },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#4d2884', strokeWidth: 2, strokeDasharray: '5,5' },
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#4d2884', strokeWidth: 2, strokeDasharray: '5,5' },
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#4d2884', strokeWidth: 2, strokeDasharray: '5,5' },
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
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  // Handle course click
  const handleCourseClick = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  // Handle enroll click
  const handleEnrollClick = (enrollmentLink: string) => {
    window.open(enrollmentLink, '_blank');
  };

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
      style: { 
        stroke: edge.style.stroke,
        strokeWidth: edge.style.strokeWidth,
        strokeDasharray: edge.style.strokeDasharray,
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
    <div className="w-full h-full bg-[#2e0669] rounded-xl shadow-lg relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2e0669] via-[#2e0669]/95 to-[#2e0669]/90 backdrop-blur-sm" />
      
      {/* White border container */}
      <div className="absolute inset-0 border-2 border-white/20 rounded-xl pointer-events-none" />
      
      <ReactFlow
        nodes={nodes.map(node => ({
          ...node,
          data: {
            ...node.data,
            onClick: () => handleCourseClick(node.data.id)
          }
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={12} 
          size={1} 
          color="rgba(255,255,255,0.15)" 
        />
        <Controls className="bg-white/10 backdrop-blur-sm" showInteractive={false} />
      </ReactFlow>

      {/* Course details popup */}
      <AnimatePresence>
        {selectedCourse && courseDetails[selectedCourse as keyof typeof courseDetails] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCourse(null)}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            
            {/* Popup content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative bg-gradient-to-br from-[#4d2884]/95 to-[#2e0669]/95 backdrop-blur-md border-2 border-white/30 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Popup content */}
              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {courseDetails[selectedCourse as keyof typeof courseDetails].title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {courseDetails[selectedCourse as keyof typeof courseDetails].description}
                  </p>
                </div>

                {/* Course info */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Duration:</span>
                    <span className="text-white font-semibold">
                      {courseDetails[selectedCourse as keyof typeof courseDetails].duration}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Level:</span>
                    <span className="text-white font-semibold">
                      {courseDetails[selectedCourse as keyof typeof courseDetails].level}
                    </span>
                  </div>
                </div>

                {/* Course topics */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Topics:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {courseDetails[selectedCourse as keyof typeof courseDetails].topics.map((topic, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                        <span className="text-white/90 text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enroll button */}
                <Button
                  onClick={() => handleEnrollClick(courseDetails[selectedCourse as keyof typeof courseDetails].enrollmentLink)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Enroll Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoursePipeline; 