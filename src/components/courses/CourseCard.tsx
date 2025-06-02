import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    full_description: string;
    price: number;
    duration: string;
    image_url: string;
  };
  onEnroll: (courseId: string) => void;
}

export const CourseCard = ({ course, onEnroll }: CourseCardProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <Card className="bg-white hover:shadow-lg transition-all">
      <div className="relative overflow-hidden">
        <img 
          src={course.image_url} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{course.title}</CardTitle>
        <CardDescription>
          Duration: {course.duration}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {showFullDescription ? (
            <>
              <div className="prose prose-sm">
                <div dangerouslySetInnerHTML={{ __html: course.full_description.replace(/\n/g, '<br />') }} />
              </div>
              <div className="flex justify-between items-center">
                <p className="font-semibold">Price: LKR {course.price.toLocaleString()}</p>
                <Button 
                  onClick={() => onEnroll(course.id)}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Enroll Now
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-600">{course.description}</p>
              <Button 
                onClick={() => setShowFullDescription(true)}
                variant="outline"
                className="w-full"
              >
                Explore More
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}; 