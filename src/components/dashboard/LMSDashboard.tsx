
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, User, Home, BookOpen, Award, ArrowLeft, ExternalLink } from 'lucide-react';
import CourseDetails from './CourseDetails';
import PaymentModal from './PaymentModal';

interface Course {
  id: string;
  title: string;
  description: string;
  full_description: string;
  price: number;
  duration: string;
  image_url: string | null;
}

interface Enrollment {
  id: string;
  course_id: string;
  enrollment_date: string;
  payment_status: string;
  completed: boolean;
  courses: Course;
}

interface LMSDashboardProps {
  user: any;
  profile: any;
  onBack: () => void;
}

const LMSDashboard: React.FC<LMSDashboardProps> = ({ user, profile, onBack }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching courses:', error);
    } else {
      setCourses(data || []);
    }
  };

  const fetchEnrollments = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('course_enrollments')
      .select(`
        *,
        courses (*)
      `)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching enrollments:', error);
    } else {
      setEnrollments(data || []);
    }
  };

  const handleEnrollment = async (course: Course) => {
    if (!user) return;

    // Check if already enrolled
    const existingEnrollment = enrollments.find(e => e.course_id === course.id);
    if (existingEnrollment) {
      toast({
        title: "Already Enrolled",
        description: "You are already enrolled in this course",
        variant: "destructive"
      });
      return;
    }

    setSelectedCourse(course);
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (course: Course) => {
    const { error } = await supabase
      .from('course_enrollments')
      .insert({
        user_id: user.id,
        course_id: course.id,
        payment_status: 'completed'
      });

    if (error) {
      console.error('Error creating enrollment:', error);
      toast({
        title: "Error",
        description: "Failed to complete enrollment",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Enrollment Successful",
        description: "You have been successfully enrolled in the course!"
      });
      setShowPayment(false);
      setSelectedCourse(null);
      fetchEnrollments();
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSidebar = () => (
    <div className="w-64 bg-white shadow-lg h-screen overflow-y-auto">
      {/* Logo and Search */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 mb-4">
          <img 
            src="/lovable-uploads/76f3562a-0d90-4bbc-a1b8-640acc56da80.png" 
            alt="Logo" 
            className="w-8 h-8"
          />
          <span className="font-bold text-lg">ioinformatics.lk</span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="space-y-2">
          {/* User Profile */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">User Profile</h3>
            <div className="pl-4 space-y-1 text-sm text-gray-600">
              <p>Profile Picture</p>
              <p>User Name: {profile?.username || 'Not set'}</p>
              <p>Organization: {profile?.organization || 'Not set'}</p>
              <p>Description: {profile?.description || 'Not set'}</p>
            </div>
          </div>

          {/* Home Section */}
          <div className="mb-4">
            <button
              onClick={() => setActiveSection('home')}
              className={`flex items-center gap-2 w-full p-2 rounded ${
                activeSection === 'home' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </button>
            {activeSection === 'home' && (
              <div className="pl-6 mt-2">
                <button
                  onClick={() => setActiveSection('courses')}
                  className="text-sm text-gray-600 hover:text-gray-800 block w-full text-left p-1"
                >
                  Courses
                </button>
              </div>
            )}
          </div>

          {/* My Learning Section */}
          <div>
            <button
              onClick={() => setActiveSection('learning')}
              className={`flex items-center gap-2 w-full p-2 rounded ${
                activeSection === 'learning' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              My Learning
            </button>
            {activeSection === 'learning' && (
              <div className="pl-6 mt-2 space-y-1">
                <button
                  onClick={() => setActiveSection('enrolled')}
                  className="text-sm text-gray-600 hover:text-gray-800 block w-full text-left p-1"
                >
                  Courses Enrolled
                </button>
                <button
                  onClick={() => setActiveSection('completed')}
                  className="text-sm text-gray-600 hover:text-gray-800 block w-full text-left p-1"
                >
                  Courses Completed
                </button>
                <button
                  onClick={() => setActiveSection('achievements')}
                  className="text-sm text-gray-600 hover:text-gray-800 block w-full text-left p-1"
                >
                  Achievements
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );

  const renderMainContent = () => {
    switch (activeSection) {
      case 'courses':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Available Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                    {course.image_url ? (
                      <img
                        src={course.image_url}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-lg font-bold text-green-600">
                        LKR {course.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">{course.duration}</span>
                    </div>
                    <Button
                      onClick={() => setSelectedCourse(course)}
                      className="w-full"
                      variant="outline"
                    >
                      Explore More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'enrolled':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Enrolled Courses</h2>
            {enrollments.length === 0 ? (
              <p className="text-gray-600">No courses enrolled yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrollments.map((enrollment) => (
                  <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                      {enrollment.courses.image_url ? (
                        <img
                          src={enrollment.courses.image_url}
                          alt={enrollment.courses.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2">{enrollment.courses.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{enrollment.courses.description}</p>
                      <div className="flex justify-between items-center mb-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          enrollment.payment_status === 'completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {enrollment.payment_status}
                        </span>
                        <span className="text-sm text-gray-500">
                          Enrolled: {new Date(enrollment.enrollment_date).toLocaleDateString()}
                        </span>
                      </div>
                      <Button className="w-full" size="sm">
                        Continue Learning
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case 'completed':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Completed Courses</h2>
            <p className="text-gray-600">No courses completed yet.</p>
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Achievements</h2>
            <p className="text-gray-600">No achievements yet.</p>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Welcome to Your Learning Dashboard</h2>
            <p className="text-gray-600">Select a section from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {renderSidebar()}
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <Button onClick={onBack} variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl font-semibold">Learning Management System</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {renderMainContent()}
        </div>
      </div>

      {/* Course Details Modal */}
      {selectedCourse && !showPayment && (
        <CourseDetails
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onEnroll={handleEnrollment}
          isEnrolled={enrollments.some(e => e.course_id === selectedCourse.id)}
        />
      )}

      {/* Payment Modal */}
      {showPayment && selectedCourse && (
        <PaymentModal
          course={selectedCourse}
          onClose={() => {
            setShowPayment(false);
            setSelectedCourse(null);
          }}
          onSuccess={() => handlePaymentSuccess(selectedCourse)}
        />
      )}
    </div>
  );
};

export default LMSDashboard;
