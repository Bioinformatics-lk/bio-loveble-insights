import React, { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, BookOpen, Briefcase, LogOut } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { initializePayment, generateHash } from '@/lib/payhere';
import { useRouter } from 'next/router';

interface UserDashboardProps {
  user: User;
}

interface UserProfile {
  username: string;
  organization: string;
  description: string;
  profile_picture_url: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  full_description: string;
  duration: string;
  price: number;
  image_url: string;
}

export const UserDashboard = ({ user }: UserDashboardProps) => {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>({
    username: '',
    organization: '',
    description: '',
    profile_picture_url: ''
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [showCourses, setShowCourses] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUserProfile();
    fetchCourses();
    fetchEnrolledCourses();
  }, [user.id]);

  const fetchUserProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (data) {
      setProfile(data);
    }
  };

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
      .from('enrollments')
      .select('courses(*)')
      .eq('user_id', user.id);

    if (data) {
      setEnrolledCourses(data.map(enrollment => enrollment.courses));
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push('/auth/signin');
    }
  };

  const updateProfile = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          username: profile.username,
          organization: profile.organization,
          description: profile.description,
          profile_picture_url: profile.profile_picture_url,
          updated_at: new Date().toISOString()
        });

      if (!error) {
        setIsEditingProfile(false);
        alert('Profile updated successfully!');
      } else {
        alert('Error updating profile: ' + error.message);
      }
    } catch (error) {
      alert('Error updating profile');
    }
  };

  const handleProfilePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${Math.random()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('profile-pictures')
        .upload(filePath, file);

      if (data) {
        const { data: { publicUrl } } = supabase.storage
          .from('profile-pictures')
          .getPublicUrl(filePath);

        setProfile({ ...profile, profile_picture_url: publicUrl });
      }
    }
  };

  const handleEnrollment = async (courseId: string) => {
    const course = selectedCourse;
    if (!course) return;

    // Initialize PayHere payment
    const paymentParams = {
      merchant_id: process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID || '',
      return_url: `${window.location.origin}/payment/success`,
      cancel_url: `${window.location.origin}/payment/cancel`,
      notify_url: `${window.location.origin}/api/payment/notify`,
      first_name: profile.username.split(' ')[0] || '',
      last_name: profile.username.split(' ')[1] || '',
      email: user.email || '',
      phone: '',
      address: '',
      city: '',
      country: 'Sri Lanka',
      order_id: `${user.id}_${courseId}_${Date.now()}`,
      items: course.title,
      currency: 'LKR',
      amount: course.price,
      hash: generateHash({
        merchant_id: process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID || '',
        order_id: `${user.id}_${courseId}_${Date.now()}`,
        amount: course.price,
        currency: 'LKR'
      }, process.env.PAYHERE_MERCHANT_SECRET || '')
    };

    // Create pending enrollment
    const { error: enrollmentError } = await supabase
      .from('enrollments')
      .insert({
        user_id: user.id,
        course_id: courseId,
        status: 'pending',
        payment_status: 'pending'
      });

    if (!enrollmentError) {
      // Redirect to PayHere
      initializePayment(paymentParams);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* DNA/RNA Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <img
          src="/dna-pattern.png"
          alt="DNA Pattern"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header with Logo and Search */}
      <header className="bg-white shadow-sm relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <h1 className="text-2xl font-bold text-blue-600">Bioinformatics.lk</h1>
              <div className="relative ml-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Profile Picture */}
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                      {profile.profile_picture_url ? (
                        <img
                          src={profile.profile_picture_url}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      className="mt-2"
                      onChange={handleProfilePictureUpload}
                    />
                  </div>

                  {/* Profile Fields */}
                  <div className="space-y-2">
                    <Input
                      placeholder="Username"
                      value={profile.username}
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                      disabled={!isEditingProfile}
                    />
                    <Input
                      placeholder="Organization"
                      value={profile.organization}
                      onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                      disabled={!isEditingProfile}
                    />
                    <Textarea
                      placeholder="Description"
                      value={profile.description}
                      onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                      disabled={!isEditingProfile}
                    />
                    <Button
                      onClick={() => {
                        if (isEditingProfile) {
                          updateProfile();
                        } else {
                          setIsEditingProfile(true);
                        }
                      }}
                    >
                      {isEditingProfile ? 'Save Profile' : 'Edit Profile'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            {!showCourses ? (
              <div className="grid grid-cols-2 gap-8">
                <Card className="bg-white hover:shadow-lg transition-all cursor-pointer" onClick={() => setShowCourses(true)}>
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-center mt-4">Our Courses</CardTitle>
                  </CardHeader>
                </Card>

                <Card className="bg-white hover:shadow-lg transition-all cursor-pointer">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                      <Briefcase className="w-8 h-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-center mt-4">Our Services</CardTitle>
                  </CardHeader>
                </Card>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  {courses
                    .filter(course => 
                      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      course.description.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(course => (
                      <Card key={course.id} className="bg-white hover:shadow-lg transition-all">
                        <CardHeader>
                          <CardTitle>{course.title}</CardTitle>
                          <CardDescription>{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button onClick={() => setSelectedCourse(course)}>
                            Explore More
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>

                {enrolledCourses.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Enrolled Courses</h2>
                    <div className="grid grid-cols-2 gap-8">
                      {enrolledCourses.map(course => (
                        <Card key={course.id} className="bg-white">
                          <CardHeader>
                            <CardTitle>{course.title}</CardTitle>
                            <CardDescription>{course.description}</CardDescription>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Details Dialog */}
      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedCourse?.title}</DialogTitle>
            <DialogDescription>
              <div className="prose max-w-none">
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-bold text-lg mb-2">Course Details</h3>
                      <ul className="list-disc pl-4 space-y-2">
                        <li><strong>Duration:</strong> {selectedCourse?.duration}</li>
                        <li><strong>Price:</strong> LKR {selectedCourse?.price.toLocaleString()}</li>
                      </ul>
                    </div>
                    <div>
                      <img
                        src="/course-illustration.png"
                        alt="Course Illustration"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Course Description</h3>
                    <div className="prose" dangerouslySetInnerHTML={{ __html: selectedCourse?.full_description || '' }} />
                  </div>
                  <Button 
                    className="w-full mt-4"
                    onClick={() => selectedCourse && handleEnrollment(selectedCourse.id)}
                  >
                    Enroll Now
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
