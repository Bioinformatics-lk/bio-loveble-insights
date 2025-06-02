import React, { useState, useEffect } from 'react';
import { CourseCard } from './CourseCard';
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';
import { toast } from "@/components/ui/use-toast";

interface CourseListProps {
  user: User;
}

export const CourseList = ({ user }: CourseListProps) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  useEffect(() => {
    fetchCourses();
    fetchEnrolledCourses();
  }, []);

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*');

    if (data) {
      setCourses(data);
    }
  };

  const fetchEnrolledCourses = async () => {
    const { data, error } = await supabase
      .from('course_enrollments')
      .select('course_id')
      .eq('user_id', user.id);

    if (data) {
      setEnrolledCourses(data.map(enrollment => enrollment.course_id));
    }
  };

  const handleEnroll = async (courseId: string) => {
    // Simulate PayHere.lk payment
    const paymentSuccessful = true; // In reality, this would be handled by the payment gateway

    if (paymentSuccessful) {
      const { error } = await supabase
        .from('course_enrollments')
        .insert({
          user_id: user.id,
          course_id: courseId,
          payment_status: 'completed'
        });

      if (!error) {
        // Send enrollment confirmation email
        const course = courses.find(c => c.id === courseId);
        await supabase.functions.invoke('send-enrollment-email', {
          body: {
            email: user.email,
            courseName: course.title
          }
        });

        toast({
          title: "Enrollment Successful",
          description: "You have been enrolled in the course. Check your email for details.",
        });

        fetchEnrolledCourses();
      }
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map(course => (
        <CourseCard
          key={course.id}
          course={course}
          onEnroll={handleEnroll}
        />
      ))}
    </div>
  );
}; 