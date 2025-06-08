import React from 'react';
import Spline from '@splinetool/react-spline';

interface SplineContainerProps {
  scene: string;
}

export const SplineContainer: React.FC<SplineContainerProps> = ({ scene }) => {
  return (
    <div className="w-full h-[600px]">
      <Spline scene={scene} />
    </div>
  );
}; 