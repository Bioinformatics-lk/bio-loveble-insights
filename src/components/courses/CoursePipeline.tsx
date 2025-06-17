import React, { useState, useEffect } from 'react';
import { Node, Edge, Position, BackgroundVariant, Handle } from 'reactflow';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

// 定义节点数据类型
interface CourseNodeData {
  label: string;
  id: string;
}

// 自定义节点组件
const CourseNode = ({ data }: { data: CourseNodeData }) => {
  return (
    <div>
      <div className="bg-[#4d2884]/90 backdrop-blur-md px-8 py-6 rounded-xl border-2 border-white/30 text-center min-w-[300px] md:min-w-[400px] max-w-[400px] md:max-w-[500px] shadow-lg shadow-[#2e0669]/20">
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

// 定义节点类型
const nodeTypes = {
  course: CourseNode,
};

// 初始节点数据
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

// 初始边数据
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

// 窗口尺寸类型
interface WindowSize {
  width: number;
  height: number;
}

const CoursePipeline: React.FC = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // 计算节点位置
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

  // 计算边连接
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
    </div>
  );
};

export default CoursePipeline; 