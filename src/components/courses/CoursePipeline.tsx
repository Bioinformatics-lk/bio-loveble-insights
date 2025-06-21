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

// 定义节点数据类型
interface CourseNodeData {
  label: string;
  id: string;
  onClick?: () => void;
}

// 课程详细信息数据
const courseDetails = {
  '1': {
    title: 'Core Foundations',
    description: '建立生物信息学的基础知识体系，包括分子生物学、统计学和编程基础。为后续专业课程打下坚实基础。',
    duration: '4 周',
    level: '初级',
    topics: ['分子生物学基础', '统计学原理', 'Python编程', '数据库基础'],
    enrollmentLink: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform'
  },
  '2': {
    title: 'Bioinformatics',
    description: '深入学习生物信息学核心概念，包括序列分析、基因组学和蛋白质组学。掌握生物数据分析的关键技能。',
    duration: '6 周',
    level: '中级',
    topics: ['序列分析', '基因组学', '蛋白质组学', '生物数据库'],
    enrollmentLink: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform'
  },
  '3': {
    title: 'Cheminformatics',
    description: '探索化学信息学领域，学习分子描述符、药物设计和化学数据库分析。为药物发现奠定基础。',
    duration: '5 周',
    level: '中级',
    topics: ['分子描述符', '药物设计', '化学数据库', 'QSAR建模'],
    enrollmentLink: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform'
  },
  '4': {
    title: 'Computational Biology',
    description: '结合计算方法和生物学原理，学习系统生物学、网络分析和生物建模技术。',
    duration: '6 周',
    level: '高级',
    topics: ['系统生物学', '网络分析', '生物建模', '机器学习基础'],
    enrollmentLink: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform'
  },
  '5': {
    title: 'AI in Life Sciences',
    description: '将人工智能技术应用于生命科学，学习深度学习、预测建模和自动化药物发现。',
    duration: '8 周',
    level: '高级',
    topics: ['深度学习', '预测建模', '自动化药物发现', 'AI伦理'],
    enrollmentLink: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform'
  }
};

// 自定义节点组件
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
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  // 处理课程点击事件
  const handleCourseClick = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  // 处理注册点击事件
  const handleEnrollClick = (enrollmentLink: string) => {
    window.open(enrollmentLink, '_blank');
  };

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

      {/* 课程详情弹窗 */}
      <AnimatePresence>
        {selectedCourse && courseDetails[selectedCourse as keyof typeof courseDetails] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCourse(null)}
          >
            {/* 背景遮罩 */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            
            {/* 弹窗内容 */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative bg-gradient-to-br from-[#4d2884]/95 to-[#2e0669]/95 backdrop-blur-md border-2 border-white/30 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 关闭按钮 */}
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
              >
                <X className="h-6 w-6" />
              </button>

              {/* 弹窗内容 */}
              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {courseDetails[selectedCourse as keyof typeof courseDetails].title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {courseDetails[selectedCourse as keyof typeof courseDetails].description}
                  </p>
                </div>

                {/* 课程信息 */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">课程时长:</span>
                    <span className="text-white font-semibold">
                      {courseDetails[selectedCourse as keyof typeof courseDetails].duration}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">难度等级:</span>
                    <span className="text-white font-semibold">
                      {courseDetails[selectedCourse as keyof typeof courseDetails].level}
                    </span>
                  </div>
                </div>

                {/* 课程主题 */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">课程主题:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {courseDetails[selectedCourse as keyof typeof courseDetails].topics.map((topic, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                        <span className="text-white/90 text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 注册按钮 */}
                <Button
                  onClick={() => handleEnrollClick(courseDetails[selectedCourse as keyof typeof courseDetails].enrollmentLink)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  立即注册
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