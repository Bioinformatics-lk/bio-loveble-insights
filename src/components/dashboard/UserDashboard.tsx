import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Search, Briefcase } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';
import { SearchBar } from "@/components/search/SearchBar";
import { CourseList } from "@/components/courses/CourseList";

interface UserDashboardProps {
  user: User;
}

interface UserProfile {
  username: string;
  organization: string;
  description: string;
  profile_picture_url: string;
}

export const UserDashboard = ({ user }: UserDashboardProps) => {
  const [showLMS, setShowLMS] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    username: '',
    organization: '',
    description: '',
    profile_picture_url: ''
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (data) {
      setProfile(data as UserProfile);
    }
  };

  const updateProfile = async () => {
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        ...profile,
        updated_at: new Date()
      });

    if (!error) {
      setIsEditingProfile(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
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
      updateProfile();
    }
  };

  if (showLMS) {
    return (
      <div className="flex h-screen bg-gray-100">
        {/* Left Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-4">
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/76f3562a-0d90-4bbc-a1b8-640acc56da80.png"
                alt="Logo"
                className="w-8 h-8"
              />
              <SearchBar />
            </div>
            
            {/* User Profile Section */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">User Profile</h3>
              <div className="space-y-2">
                <div className="relative">
                  <img 
                    src={profile.profile_picture_url || '/default-avatar.png'} 
                    alt="Profile"
                    className="w-20 h-20 rounded-full mx-auto mb-2"
                  />
                  <label className="cursor-pointer absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-1">
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                    <span>Edit</span>
                  </label>
                </div>
                <Input 
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  placeholder="Username"
                  className="mb-2"
                />
                <Input 
                  value={profile.organization}
                  onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                  placeholder="Organization"
                  className="mb-2"
                />
                <Textarea 
                  value={profile.description}
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                  placeholder="Description"
                  className="mb-2"
                />
                <Button onClick={updateProfile} className="w-full">
                  Save Profile
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                Home
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Courses
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                My Learning
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
          <CourseList user={user} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Courses Card */}
          <Card className="bg-white hover:shadow-lg transition-all transform hover:scale-105">
            <CardHeader className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl">
                Our Courses
              </CardTitle>
              <CardDescription>
                Access our comprehensive bioinformatics courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                size="lg"
                onClick={() => setShowLMS(true)}
              >
                View Courses
              </Button>
            </CardContent>
          </Card>

          {/* Services Card */}
          <Card className="bg-white hover:shadow-lg transition-all transform hover:scale-105">
            <CardHeader className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <Briefcase className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl">
                Our Services
              </CardTitle>
              <CardDescription>
                Professional bioinformatics and computational biology services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                size="lg"
              >
                View Services
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
