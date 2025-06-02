
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Clock, DollarSign, BookOpen } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  full_description: string;
  price: number;
  duration: string;
  image_url: string | null;
}

interface CourseDetailsProps {
  course: Course;
  onClose: () => void;
  onEnroll: (course: Course) => void;
  isEnrolled: boolean;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course, onClose, onEnroll, isEnrolled }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                {course.image_url ? (
                  <img
                    src={course.image_url}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl mb-4">{course.title}</CardTitle>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                  <span className="text-2xl font-bold text-green-600">
                    LKR {course.price.toLocaleString()}
                  </span>
                </div>
              </div>
              <Button
                onClick={() => onEnroll(course)}
                className="w-full"
                disabled={isEnrolled}
              >
                {isEnrolled ? 'Already Enrolled' : 'Enroll Now'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <h3 className="text-xl font-bold mb-4">Course Details</h3>
            <div className="whitespace-pre-line text-gray-700">
              {course.full_description}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDetails;
