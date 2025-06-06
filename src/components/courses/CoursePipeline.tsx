import React from 'react';

const courses = [
  {
    id: 1,
    title: 'Introduction to Bioinformatics',
    description: 'Learn the fundamentals of bioinformatics and computational biology.',
  },
  {
    id: 2,
    title: 'Network Pharmacology',
    description: 'Explore the complex interactions between drugs and biological systems.',
  },
  {
    id: 3,
    title: 'Molecular Docking',
    description: 'Master the techniques of molecular docking and drug-target interactions.',
  },
  {
    id: 4,
    title: 'AI and ML in Drug Discovery',
    description: 'Discover how artificial intelligence is revolutionizing drug discovery.',
  },
  {
    id: 5,
    title: 'Introduction to Cheminformatics',
    description: 'Learn the computational methods for chemical data analysis.',
  },
  {
    id: 6,
    title: 'Molecular Dynamics',
    description: 'Study the physical movements of atoms and molecules in biological systems.',
  },
  {
    id: 7,
    title: 'Research Project',
    description: 'Apply your knowledge in a comprehensive research project.',
  },
];

export const CoursePipeline = () => {
  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-8">
      <div className="space-y-8">
        {courses.map((course, index) => (
          <div key={course.id} className="relative">
            {/* Vertical line connecting courses */}
            {index < courses.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-16 bg-[#000A33]"></div>
            )}
            
            {/* Course card */}
            <div className="relative flex items-start space-x-4">
              {/* Number circle */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#000A33] text-white flex items-center justify-center font-semibold">
                {course.id}
              </div>
              
              {/* Course content */}
              <div className="flex-1 bg-white p-6 rounded-lg border-2 border-[#000A33] hover:border-sky-500 transition-colors duration-300">
                <h3 className="text-xl font-semibold text-[#000A33] hover:text-sky-500 transition-colors duration-300">
                  {course.title}
                </h3>
                <p className="mt-2 text-gray-600">
                  {course.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 